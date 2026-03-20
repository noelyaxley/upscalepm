#!/usr/bin/env node
/**
 * LinkedIn OAuth2 flow — run once to get an access token.
 * Usage: node scripts/linkedin-auth.mjs
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL, fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (match) env[match[1]] = match[2];
}

const CLIENT_ID = env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3456/callback";
const SCOPES = "openid profile w_member_social w_organization_social r_organization_social";

// Step 1: Open browser to LinkedIn auth page
const authUrl = new URL("https://www.linkedin.com/oauth/v2/authorization");
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("scope", SCOPES);
authUrl.searchParams.set("state", "upscalepm-linkedin");

console.log("\n🔗 Opening LinkedIn authorization page in your browser...\n");
console.log(`If it doesn't open, visit:\n${authUrl.toString()}\n`);
execSync(`open "${authUrl.toString()}"`);

// Step 2: Local server to catch the callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:3456`);

  if (url.pathname !== "/callback") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    console.error(`\n❌ Auth error: ${error} — ${url.searchParams.get("error_description")}`);
    res.writeHead(400);
    res.end("Authorization failed. Check terminal.");
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400);
    res.end("No code received");
    return;
  }

  console.log("✅ Authorization code received. Exchanging for token...\n");

  // Step 3: Exchange code for access token
  try {
    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error("❌ Token exchange failed:", tokenData);
      res.writeHead(500);
      res.end("Token exchange failed. Check terminal.");
      server.close();
      process.exit(1);
    }

    console.log("✅ Access token obtained!\n");
    console.log(`Access Token: ${tokenData.access_token}`);
    console.log(`Expires in: ${tokenData.expires_in} seconds (${Math.round(tokenData.expires_in / 86400)} days)`);
    if (tokenData.id_token) {
      // Decode JWT to extract sub (member ID)
      const payload = JSON.parse(Buffer.from(tokenData.id_token.split(".")[1], "base64url").toString());
      console.log(`\nMember sub (person ID): ${payload.sub}`);
      console.log(`Name: ${payload.name || "N/A"}`);
      console.log(`\nPerson URN: urn:li:person:${payload.sub}`);
    }
    if (tokenData.refresh_token) {
      console.log(`Refresh Token: ${tokenData.refresh_token}`);
    }
    console.log("\nAdd this to your .env.local:\n");
    console.log(`LINKEDIN_ACCESS_TOKEN=${tokenData.access_token}`);
    if (tokenData.refresh_token) {
      console.log(`LINKEDIN_REFRESH_TOKEN=${tokenData.refresh_token}`);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:60px;">
        <h1>✅ LinkedIn authorized!</h1>
        <p>You can close this tab and go back to the terminal.</p>
      </body></html>
    `);
  } catch (err) {
    console.error("❌ Error:", err);
    res.writeHead(500);
    res.end("Error exchanging token");
  }

  server.close();
});

server.listen(3456, () => {
  console.log("⏳ Waiting for LinkedIn callback on http://localhost:3456/callback ...\n");
});

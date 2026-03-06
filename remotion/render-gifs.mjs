import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compositions = [
  'RadioSilence',
  'ConfusedDoc',
  'BlindMoney',
  'Mismatch',
  'SubscribeBrief',
  'ManageBuild',
  'StayControl',
]

const outputDir = path.resolve(__dirname, '../public/images/landing/icons')

async function main() {
  console.log('Bundling Remotion project...')
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, 'index.tsx'),
    webpackOverride: (config) => config,
  })

  for (const id of compositions) {
    console.log(`Rendering ${id}...`)
    const composition = await selectComposition({
      serveUrl: bundled,
      id,
    })

    const outputPath = path.join(outputDir, `${id}.gif`)

    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: 'gif',
      outputLocation: outputPath,
      everyNthFrame: 2, // reduce file size — 15fps effective
    })

    console.log(`  -> ${outputPath}`)
  }

  console.log('Done! All GIFs rendered.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

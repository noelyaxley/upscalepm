# King Kong Agency Landing Page - Comprehensive Section-by-Section Analysis

**URL:** https://kingkong.co/au/
**Date Analyzed:** 1 March 2026
**Page Last Updated:** 27 February 2026
**Platform:** WordPress (Yoast SEO, custom theme "kingkong")

---

## TABLE OF CONTENTS

1. [Page-Level Overview](#page-level-overview)
2. [Header / Navigation](#header--navigation)
3. [Section 1: Hero](#section-1-hero)
4. [Section 2: Awards Marquee](#section-2-awards-marquee)
5. [Section 3: Long-Form Sales Letter](#section-3-long-form-sales-letter)
6. [Section 4: Our Offering (Choose Your Adventure)](#section-4-our-offering)
7. [Section 5: Stats / Globe](#section-5-stats--globe)
8. [Section 6: Featured In (Media Logos)](#section-6-featured-in)
9. [Section 7: Case Studies](#section-7-case-studies)
10. [Section 8: Built For Scale (Platform Proof)](#section-8-built-for-scale)
11. [Section 9: Brand Experience (Client Logos)](#section-9-brand-experience)
12. [Section 10: Power In The Platform](#section-10-power-in-the-platform)
13. [Section 11: Sell Like Crazy Book](#section-11-sell-like-crazy-book)
14. [Section 12: Video Testimonials Slider](#section-12-video-testimonials-slider)
15. [Section 13: FAQ / Accordion](#section-13-faq--accordion)
16. [Section 14: Final CTA (Hit The Damn Button)](#section-14-final-cta)
17. [Footer](#footer)
18. [Aggregate Metrics & Analysis](#aggregate-metrics--analysis)

---

## PAGE-LEVEL OVERVIEW

| Metric | Value |
|--------|-------|
| Total `<section>` elements in HTML | 14 (9 from initial HTML + 5 from truncated portion) |
| Total visible sections (inc. header/footer) | 16 distinct content blocks |
| Estimated total page word count (visible text) | ~2,200-2,500 words |
| Number of CTAs | 8+ explicit CTA buttons |
| Number of testimonials | 17 video testimonials |
| Number of case study tiles | 21 |
| Schema types used | LocalBusiness, Book, AggregateRating, FAQ (Question/Answer) |
| Fonts | FuturaLT CondensedExtraBold (headings), Inter (Light, Regular, Black) for body |
| Primary brand color | #A8D507 / #a2de00 (lime green) |
| Accent | #cff128 (bright yellow-green) |
| Dark backgrounds | #0a0404 (near-black), #373737 (charcoal), #0a0a0a |
| Light backgrounds | #ffffff, #f3f3f3, #f0f9e5 (pale green) |

---

## HEADER / NAVIGATION

**Purpose:** Primary site navigation with phone number and hamburger menu.

| Element | Detail |
|---------|--------|
| Logo | SVG "KINGKONG" wordmark in lime green (#A8D507) |
| Phone Number | 1300 858 250 (linked as tel:) |
| Menu Type | Hamburger (elastic/squeeze style) with "menu" label on desktop |
| Text Color | Light (class: `text-light`) |

**Navigation Items (8 items):**
1. Agency - "Hire Us To Do It For You" -> /au/agency/
2. Courses - "Learn How To Do It Yourself" -> /quantum-growth/
3. SEO - "Strengthen Your Organic Presence" -> /au/seo-agency/
4. CRO - "Boost Your Conversions" -> /au/conversion-rate-optimisation-agency/
5. Google Ads - "Paid Search" -> /au/ppc-management-agency/
6. Landing Pages - "High Converting Sales Machine" -> /au/landing-page-agency/
7. Facebook Ads - "Explode Sales With Facebook Ads" -> /au/facebook-advertising-agency/
8. Careers -> /au/careers/

**Word count:** ~30 words (nav item labels + descriptions)

---

## SECTION 1: HERO

**Section Name:** Hero / Above The Fold
**Purpose:** Immediate hook, email capture, and establish authority with review social proof.
**CSS Classes:** `text-light content-wysiwyg content-textarea content-code next-has-stripes has-stripes`

### Heading
- **Text:** "Like Steroids* For Business"
- **Word Count:** 4 words (excluding asterisk symbol)
- **HTML:** `<p class="h1">` (styled as h1 but semantically a paragraph)

### Subheading / Body
- **Text:** "Growing a business is hard. We make it a whole lot easier, more predictable, less stressful, and more fun."
- **Word Count:** 19 words

### CTA
- **Form Type:** Multi-step email capture (Infusionsoft)
  - Step 1: "Enter your email..." (email input)
  - Step 2: "Please also enter your name..." (name input)
- **Button Text:** "Do it"
- **Button Link:** Form submits to Infusionsoft (https://wg216.infusionsoft.com/app/form/process/...)
- **Mobile prompt:** "Enter your email here and we'll send you some 'magic'"

### Social Proof
- **Asterisk disclaimer:** "*But it's 100% legal (pinky promise)"
- **Star Rating:** 4.8 stars out of 7,344 reviews (SVG star icons with 96% fill)
- **Links to:** /reviews

### Visual Elements
- **Background:** Solid dark color (#0a0404) with video overlay
- **Video Background:** `hero-bg-video-2021.mp4` - autoplay, loop, muted, 15% opacity
- **Stripe overlay:** 7-stripe diagonal pattern (signature King Kong effect)
- **Lottie animation:** Arrow animation on submit button (`arrow.json`)
- **Hero Video:** Wistia embed (18loeu0yft) with autoplay preview and play button
- **Wistia video overlay:** Dark overlay div

### Layout
- **Container:** Bootstrap container, centered row
- **Heading column:** col-12 / col-md-10 / col-lg-10 (centered)
- **Body text column:** col-12 / col-md-10 / col-lg-9 / col-xl-8 (centered, with margin-bottom)
- **Form:** col-12 full width with round-form styling

### Color Scheme
- **Background:** #0a0404 (almost black) with video at 15% opacity
- **Text:** Light (white)
- **CTA Button:** Primary green (brand color)
- **Stars:** Filled gold/yellow

### Total Section Word Count: ~49 words

---

## SECTION 2: AWARDS MARQUEE

**Section Name:** Awards / Social Proof Strip
**Purpose:** Display industry awards as infinite scrolling marquee for credibility.
**CSS Classes:** `text-dark content-global awards next-has-stripes has-stripes`

### Heading
- **Text:** None
- **Word Count:** 0

### Visual Elements
- **Marquee Type:** `image-marquee image-marquee--double`
- **Image:** `awards-row.svg` (2109x121px) - repeated 6 times for seamless scroll
- **Gradient edges:** Left and right gradient fades from #ffffff to transparent

### Layout
- **Full-width** marquee with gradient masks on edges
- **Double-row** marquee variant

### Color Scheme
- **Background:** #ffffff (white)
- **Text:** Dark

### Total Section Word Count: 0 words (purely visual)

---

## SECTION 3: LONG-FORM SALES LETTER

**Section Name:** Sales Letter / "Dear Business Builder"
**Purpose:** Empathy-driven long-form copy addressing pain points, building rapport, then directing to the "choose your adventure" CTA below.
**CSS Classes:** `text-dark content-wysiwyg next-has-stripes has-stripes`

### Heading
- **Text:** None (no heading - opens with "Updated: 27th of February, 2026")
- **Word Count:** 0 (no formal heading)

### Body Text (Full Copy)
**Opening:**
"Updated: 27th of February, 2026

Dear business builder,

We get it.

Growing a business is hard. Really f*cking hard."

**Pain Points (middle section):**
"You're probably worried about where your next customer will come from. Stressed and sleeping like a teething two-year-old. As your hair goes fifty shades of grey from all the uncertainty. And to top it all off. You're being pulled in a bazillion different directions. Ohmygawd! Should I blog? Start a podcast? Build a personal brand? Document my whole flippin' life on Instagram? What about chatbots? Errrrrrrbody's talkin' bout chatbots. Should I run some ads? Drop $3k on a logo? Post on LinkedIn five times per day? *somebody please pull out my eyelashes* Look, most entrepreneurs have a bad case of 'shiny object syndrome'... Mixed with a scoop of ADD... and a sprinkle of 'I can do everything'. And they end up doing a little bit of this... a little bit of that. Soon, they're screaming at their Macbook with all the things they 'have to' do. We call this shit show a rats nest. Also known as hell. It's hot and muggy there. And we'd rather rub scorpion chillies in our eyes than operate a business that way."

**Transition:**
"But this isn't about us... It's about you."

**Desire building:**
"You're reading this right now because, in some way shape or form, your business isn't where you want it to be. Or maybe you're flying... and you simply want more. More security. More money. **More freedom.** More memories. **More time with your family.** More business-class flights with your spouse to places that result in more sand between your toes."

**Close:**
"Whatever it is for you... It all starts by 'choosing your own adventure' below... **\*cue angels singing\***"

### CTA
- **None** (directs attention to Section 4 below)

### Visual Elements
- **Stripe overlay:** 7-stripe diagonal pattern
- **Text formatting:** Bold, italic, and underline used for emphasis
- **"Updated" date:** Bold/styled as class `date-updated`

### Layout
- **Container:** Bootstrap container, centered
- **Column:** col-xxl-7 / col-xl-8 / col-md-9 (narrow reading width)
- **Pattern:** Single-column long-form text, letter format

### Color Scheme
- **Background:** #f3f3f3 (light grey)
- **Text:** Dark

### Total Section Word Count: ~282 words

---

## SECTION 4: OUR OFFERING (CHOOSE YOUR ADVENTURE)

**Section Name:** Our Offering / Choose Your Path
**Purpose:** Fork visitors into two pathways: done-for-you agency services OR self-serve courses.
**CSS Classes:** `text-light content-global our-offering has-stripes`

### Eyebrow
- **Text:** "Our Offering"
- **Word Count:** 2

### Card 1: Agency
- **Subtitle:** "Hire us to do it for you" (color: #cff128)
- **Heading:** "Agency" (h2 class)
- **Body:** "Managed and 'done-for-you' digital marketing services for mid-to-large companies looking to accelerate 'hyper-growth'. And yes, we guarantee results and smell fantastic *wink*."
- **CTA Button:** "Get Started" -> /au/agency/
- **Social Proof:** 4.5 stars out of 704 reviews (90% fill)
- **Logo Icon:** KK logomark in green gradient (#8bb600 to #a2de00)

### Card 2: Courses
- **Subtitle:** "Learn how to do it yourself" (color: #cff128)
- **Heading:** "Courses" (h2 class)
- **Body:** "Business growth training programs for companies serious about scaling their coaching, consulting or service business to seven and eight figures FAST (in months, not years)."
- **CTA Button:** "Get Started" -> /quantum-growth/
- **Social Proof:** 4.8 stars out of 6,640 reviews (96% fill)
- **Logo Icon:** KK logomark in purple gradient (#5e35ab to #6f4abd)

### Additional Visual Elements
- **As Seen In marquee** (at bottom of section): Two rows of scrolling logo images
  - Row 1: `as-seen-in-row-1.svg` (1092x35px)
  - Row 2: `as-seen-in-row-2.svg` (825x44px)
- **Gradient edges** on marquee matching #373737 background

### Layout
- **Two-column grid:** col-12 / col-md-6 per card
- **Cards:** class `gradient-box` with `round-black-bg` for logo
- **Center-aligned** text within cards

### Color Scheme
- **Background:** #373737 (charcoal)
- **Text:** Light (white)
- **Accent text:** #cff128 (bright yellow-green)
- **CTA Buttons:** Primary green
- **Card 1 icon:** Green gradient
- **Card 2 icon:** Purple gradient

### Total Section Word Count: ~80 words

---

## SECTION 5: STATS / GLOBE

**Section Name:** Grow 10X / Stats with 3D Globe
**Purpose:** Quantify King Kong's scale and credibility with big statistics and an interactive 3D globe visualization.
**CSS Classes:** `text-dark section-globe content-text content-textarea content-globe`

### Heading
- **Text:** "Grow 10X Faster, Better, Smarter."
- **Word Count:** 6 words

### Body Text
- **Text:** "Skip the guesswork, trial-and-error and never-ending shit show of trying to figure everything out yourself -- for the very first time. And instead, grow your business with proven client-getting-funnels, frameworks and scientific customer acquisition (not hopes and prayers)."
- **Word Count:** ~42 words
- **Formatting:** "client-getting-funnels" is underlined, "scientific customer acquisition" is bold

### Stats Cards (4 cards in a row)

| Card | Label | Number | Description |
|------|-------|--------|-------------|
| 1 | Revenue Generated | $7.8B | "We let our numbers do the talking. $7.8 Billion in reported client revenue and counting." |
| 2 | Size Of Our Platform | 200K | "200,000 customers and counting make up our diverse and ever growing platform." |
| 3 | Our Reach | 136 | "Serving customers in over 136 different countries." |
| 4 | Battle Tested | 1067 | "Our strategies have been battle tested in over 1067 different industries and niches." |

### CTA
- **None** in this section

### Visual Elements
- **3D Globe:** `<div id="globeHolder">` - interactive/animated 3D globe (JavaScript rendered)
- **Count-up animations:** Numbers use `data-countup` attribute for animated counting effect
- **Animate-in delays:** Cards use staggered `delay-1` through `delay-4` classes
- **No stripe overlay** on this section

### Layout
- **Heading:** Full 12-column centered
- **Body text:** col-lg-8 centered
- **Stats cards:** 4-column grid (col-md-6 / col-lg-3 each), inside a `globe-wrapper`

### Color Scheme
- **Background:** #f0f9e5 (pale mint green)
- **Text:** Dark
- **Cards:** White with shadow (card class)

### Total Section Word Count: ~104 words

---

## SECTION 6: FEATURED IN (MEDIA LOGOS)

**Section Name:** Featured In / Press Logos
**Purpose:** Display media and press logos where King Kong has been featured, building third-party credibility.
**CSS Classes:** `text-dark content-global featured-in next-has-stripes`

### Heading
- **Text:** None
- **Word Count:** 0

### Visual Elements
- **Three-row scrolling marquee:**
  - Row 1: `featured-in-row-1.svg` (1443x53px) x6
  - Row 2: `featured-in-row-2.svg` (1490x55px) x6
  - Row 3: `featured-in-row-3.svg` (1448x53px) x6
- **Gradient edges** fading from #ffffff

### Layout
- **Full-width** three-row horizontal scrolling marquee

### Color Scheme
- **Background:** #ffffff (white)

### Total Section Word Count: 0 words (purely visual)

---

## SECTION 7: CASE STUDIES

**Section Name:** Case Studies Slider
**Purpose:** Showcase specific client success stories as browsable tiles in a Swiper slider, driving clicks to individual case study pages.
**CSS Classes:** `text-light dark-gradient content-global case-studies-section next-has-stripes has-stripes`

### Pill Label
- **Text:** "CASE STUDIES"
- **Word Count:** 2

### Heading
- **Text:** "Become our next success story"
- **Word Count:** 5 words
- **HTML:** `<h3 class="h2">` (h3 tag styled as h2)

### Case Study Tiles (21 total)
| # | Company Name | Link |
|---|-------------|------|
| 1 | Nimble Transformation | /case-studies/nimble/ |
| 2 | Scotland Titles | /case-studies/scotland-titles/ |
| 3 | My Muscle Chef | /case-studies/my-muscle-chef/ |
| 4 | Rent Buy It | /case-studies/rent-buy-it/ |
| 5 | Original UGG Australia Classic | /case-studies/original-ugg-australia-classic/ |
| 6 | Aussie Environmental | /case-studies/aussie-environmental/ |
| 7 | Electrolux Professional | /case-studies/electrolux-professional/ |
| 8 | Moxie Pest Control | /case-studies/moxie-pest-control/ |
| 9 | AIV Australian | /case-studies/australian-industrial-vacuum/ |
| 10 | Koala E-Commerce | /case-studies/koala/ |
| 11 | Aquatic Performance | /case-studies/aquatic-performance-training/ |
| 12 | Purple Bricks | /case-studies/purple-bricks/ |
| 13 | Green Goo | /case-studies/green-goo/ |
| 14 | Koikas Acoustics | /case-studies/koikas-acoustics/ |
| 15 | Pure Public Relations | /case-studies/pure-public-relations/ |
| 16 | Marshall White | /case-studies/marshall-white/ |
| 17 | Hurdleys Office Furniture | /case-studies/hurdleys-office-furniture/ |
| 18 | Clearance Solutions Australia | /case-studies/clearance-solutions/ |
| 19 | Masseuse Massage | /case-studies/masseuse-massage/ |
| 20 | Let's Get Care | /case-studies/lets-get-care/ |
| 21 | Glenvill Homes | /case-studies/glenvill-homes/ |

### CTA
- **Button Text:** "Hit the damn button"
- **Button Link:** /30-minute-strategy-session/
- **Button Style:** `btn btn-doublelayer btn-green`

### Visual Elements
- **Swiper slider:** Horizontal scrollable carousel of case study tiles
- **Tile images:** Custom tile images per brand (tile-nimble.png, tile-scotland.png, etc.)
- **WebP support:** Some tiles use `<picture>` with WebP source
- **Stripe overlay:** 8 stripes
- **Dark gradient background**

### Layout
- **Slider:** Full-width Swiper carousel
- **CTA button:** col-sm-9 / col-md-7 / col-lg-6 / col-xl-6 centered

### Color Scheme
- **Background:** Dark gradient (class `dark-gradient`, no explicit color set)
- **Text:** Light (white)
- **CTA:** Green double-layer button

### Total Section Word Count: ~62 words

---

## SECTION 8: BUILT FOR SCALE (PLATFORM PROOF)

**Section Name:** Built For Scale
**Purpose:** Reinforce platform credibility with authority headline, body copy, and social proof.
**CSS Classes:** `text-dark content-text content-wysiwyg content-image content-textarea next-has-stripes has-stripes`

### Pill Label
- **Text:** "Built For Scale"
- **Word Count:** 3

### Heading
- **Text:** "The Most Ruthlessly Effective Platform For Rapidly Scaling Businesses On Planet Earth"
- **Word Count:** 13 words

### Body Text
- **Text:** "There are a lot of so-called 'agencies' and 'gurus' roaming around the wild wild west that is the web, today. Most of these people are all bark, no bite. All waffle, no syrup. 'Cause marketers lie, but numbers don't. And we've generated $7.8 billion (with a B) for our clients, in 1067 different industries and niches."
- **Word Count:** ~55 words
- **Formatting:** "$7.8 billion" underlined, "(with a B)" bold

### CTA
- **Button Text:** "Hit The Damn Button"
- **Button Link:** /30-minute-strategy-session/
- **Button Style:** `btn btn-doublelayer btn-green`
- **Social Proof below CTA:** 4.8 stars out of 7,344 reviews

### Visual Elements
- **Hero image:** `quantum-growth-scaled-1200x525.jpg` (1200x525px, responsive srcset up to 2048w)
- **Stripe overlay:** 7 stripes
- **Star ratings:** SVG stars with 96% fill

### Layout
- **Pill:** col-12 centered
- **Heading:** col-12 centered
- **Body:** col-lg-8 centered
- **Image:** Full-width with mb-4 spacing, `animate-in` class
- **CTA:** col-lg-6 centered

### Color Scheme
- **Background:** #f3f3f3 (light grey)
- **Text:** Dark

### Total Section Word Count: ~81 words

---

## SECTION 9: BRAND EXPERIENCE (CLIENT LOGOS)

**Section Name:** Brand Experience
**Purpose:** Display client/partner brand logos as scrolling marquee to demonstrate breadth of client portfolio.
**CSS Classes:** `text-dark content-global brand-experience has-stripes`

### Eyebrow
- **Text:** "Brand Experience"
- **Word Count:** 2

### Visual Elements
- **Two-row scrolling marquee:**
  - Row 1: `brand-experience-row-1.svg` (2653x111px) x6
  - Row 2: `brand-experience-row-2.svg` (2551x89px) x6
- **Double marquee variant** (`image-marquee--double`)
- **Gradient edges** from #ffffff
- **Stripe overlay:** 7 stripes

### Layout
- **Full-width** double-row horizontal scrolling marquee

### Color Scheme
- **Background:** #ffffff (white)

### Total Section Word Count: 2 words

---

## SECTION 10: POWER IN THE PLATFORM

**Section Name:** The Power Is In The Platform
**Purpose:** Overcome the "trying to do it yourself" objection by emphasizing King Kong's tested expertise ($100M+ in ad spend) and providing a video walkthrough.
**CSS Classes:** `text-light power-in-platform content-wysiwyg content-textarea`

### Subtitle
- **Text:** "No more 'hoping-and-praying'" (color: #cff128)
- **Word Count:** 4

### Heading
- **Text:** "The Power Is In The Platform"
- **Word Count:** 7

### Body Text
- **Paragraph 1:** "Most entrepreneurs try growing their business through trial and error, by 'hoping-and-praying'... by stumbling and trying to figure it all out by themselves. We call this 'guesswork'. It's unreliable, extremely-stressful and often results in failure (or a psychiatrist)."
- **Paragraph 2:** "We've spent over $100 million dollars on traffic perfecting what works... this isn't our first rodeo. And our hope is to shrink the amount of time it takes, for you to go from first-time solo business operator... To fire-breathing, market-terrorising entrepreneur..."
- **Word Count:** ~82 words
- **Text color:** #a1a1a1 (muted grey)

### CTA
- **Button Text:** "Hit The Damn Button"
- **Button Link:** /30-minute-strategy-session/
- **Button Style:** `btn btn-doublelayer btn-green`
- **Social Proof below CTA:** 4.8 stars out of 7,344 reviews

### Visual Elements
- **Wistia video embed** (18loeu0yft) with thumbnail image (`wistia-thumb.jpg`, also in WebP)
- **Play button** overlay on video
- **No stripe overlay** on this section

### Layout
- **Subtitle + Heading:** col-md-10 / col-lg-9 centered
- **Body:** col-md-9 / col-lg-7 centered (narrow reading width)
- **Video:** col-lg-10 with mb-5
- **CTA:** col-lg-6 centered, mt-4

### Color Scheme
- **Background:** #373737 (charcoal)
- **Text:** Light (white for headings, #a1a1a1 for body)
- **Accent:** #cff128 (subtitle)

### Total Section Word Count: ~93 words

---

## SECTION 11: SELL LIKE CRAZY BOOK

**Section Name:** Sell Like Crazy Book Promotion
**Purpose:** Promote Sabri Suby's #1 bestselling book "Sell Like Crazy" as additional credibility and lead gen.
**CSS Classes:** `text-dark content-global sell-like-crazy-book`

### Eyebrow
- **Text:** "We Literally Wrote The Book On..."
- **Word Count:** 7

### Heading
- **Text:** "How To Get As Many Clients, Customers And Sales As You Can Possibly Handle"
- **Word Count:** 14

### Body Text
- **Text:** "Sell Like Crazy shot up from being ranked 90,000 on the day of release, to a #1 international Amazon bestseller in its first day. **This book is easy to read and wastes no time in going straight for the jugular.** You get actionable strategies you can use RIGHT AWAY to dramatically grow sales for your business... in most cases, without spending a cent more on advertising."
- **Word Count:** ~62 words
- **Formatting:** Bold for jugular sentence, underline on "You get actionable strategies you can use RIGHT AWAY"

### CTA
- **Button Text:** "Buy The Book"
- **Button Link:** https://selllikecrazybook.com/free/
- **Button Style:** `btn btn-doublelayer mb-0`
- **Social Proof:** Amazon #1 Best Seller badge (SVG), 4.8 stars out of 6,640 reviews

### Visual Elements
- **Book image:** `sell-like-crazy.png` (1132x1300px, responsive up to 1132w)
- **Amazon badge:** Inline SVG with "#1 Best Seller" text and Amazon arrow logo (yellow/orange)

### Layout
- **Heading:** col-md-10 centered
- **Book image:** col-lg-6 centered
- **Body + CTA:** col-md-9 / col-lg-6

### Color Scheme
- **Background:** None set (defaults/transparent)
- **Text:** Dark

### Total Section Word Count: ~83 words

---

## SECTION 12: VIDEO TESTIMONIALS SLIDER

**Section Name:** Video Testimonial Gallery
**Purpose:** Massive social proof through 17 video testimonials from real clients, each with a quote, company logo, and video overlay.
**CSS Classes:** `text-dark content-global testimonial-video-slider`

### Heading
- **Text:** None (no section heading)

### Testimonials (17 total)

| # | Company | Quote | Person & Title |
|---|---------|-------|----------------|
| 1 | Metricon | "Since partnering with King Kong the results have been nothing short of outstanding. There are three simple words here and that is: Leads! Leads! Leads!" | Domenic Varese, Marketing Manager |
| 2 | Little Big Dairy | "From Cold-calling To 200 New Customers In 12 Months" | Emma & Jim Elliott, Owners |
| 3 | Let's Get Care | "From $4 Million To $25,000,000+ In 18 Months" | Michael Argent, Managing Director |
| 4 | Project Everest | "Our Pipeline Got Completely Flooded Overnight" | Wade Tink, Managing Director |
| 5 | New Sensation Homes | "From $0 To $18 Million In 18 Months (During A Recession)" | Danny Coyne |
| 6 | NSR Australia & NZ | "Working With King Kong Has Transformed Our Whole Lives. The Growth That We've Experienced Has Been Astronomical." | Marco Maisano, CEO & Founder |
| 7 | Ged's Mobile Car Cleaning | "Initially I was worried about where my first job was coming from. After using King Kong I was more worried about how I was going to manage the job. My business has increased 200%, so I got my return on investment 10-20 times over." | Ged, Owner |
| 8 | Breathe Education | "Since starting work with King Kong 9 months ago our sales have tripled and we've expanded into 3 other states. These guys are amazing!" | Raphael Bender, Founder |
| 9 | Discover Stradbroke | "We've Increased Our Revenue By 35-40% By Working With King Kong" | Colin Battersby, Principal |
| 10 | Aged Care Financial Services | "After 18 Months, We've Got A 49% Increase In Leads. I'd Never Go Back To Not Using King Kong." | Beth Hourigan, Director |
| 11 | Gold Key Homes | "From $3 Million To $50 Million In 12 Months With King Kong" | Dylan Trickey, Marketing Coordinator |
| 12 | Enso Homes | "The goal was to get 8 sales in the first year. It's been 11 months now and we've had 23 sales. Which is $7 million in revenue. The money I spent with King Kong I've seen a return on investment of five to six times." | Lee Selkrig, Founder |
| 13 | Original UGG Australia Classic | "We've Doubled In Staff Numbers" | Selma Christofi |
| 14 | Hurdleys Office Furniture | "We've Increased Our Revenue By 50 Percent" | Adam Hurdley, Managing Director |
| 15 | Ultimate Windows | "From 3 Weeks Of Jobs To 6 Months Booked In Advance" | Tye Spierings, Owner & Director |
| 16 | Fisher Roofing | "Generated 95 to 100 Closed Jobs" | Rohan Fisher, Director |
| 17 | Polaron | "Since We've Started Working With King Kong We've Generated Over 2 Million Dollars" | Eva Hussein, Founder & Director |

### CTA
- **None** (each testimonial has a "Play" button for the Wistia video)

### Visual Elements
- **Swiper slider** with main slides and thumbnail control bar
- **Each slide:** Company logo image, blockquote text, cite attribution, Wistia video embed trigger, full background overlay image
- **Thumbnail bar:** Mini logo + overlay thumbnail + person name for each testimonial
- **Play button:** Pulsing play animation (`play-pulse` class)
- **Container:** Full-width (`container-fluid`)

### Layout
- **Main slider:** Full-viewport-width Swiper carousel
- **Control bar:** Separate Swiper with thumbnail navigation

### Color Scheme
- **Background:** None set (transparent/default)
- **Text:** Dark

### Total Section Word Count: ~400 words (all testimonial quotes + attributions)

---

## SECTION 13: FAQ / ACCORDION

**Section Name:** FAQ Section
**Purpose:** Address common objections and questions. Also serves SEO purposes with H1/H2 tags embedded in FAQ questions.
**CSS Classes:** `text-dark content-text content-accordion`

### Heading
- **Text:** "YOU'VE GOT QUESTIONS, WE'VE GOT ANSWERS."
- **Word Count:** 7 words

### FAQ Items (6 questions)

| # | Question | Approx Answer Word Count |
|---|----------|-------------------------|
| 1 | "What does a Digital Marketing Agency actually do?" (contains `<h1>`) | ~80 words |
| 2 | "How do I know that I will get a return on my investment?" | ~30 words |
| 3 | "Do you work with big or small companies?" | ~100 words |
| 4 | "Why is King Kong the best digital marketing agency?" (contains `<h2>`) | ~150 words |
| 5 | "Can you guarantee results?" | ~40 words |
| 6 | "What's involved with digital marketing?" (contains `<h2>`) | ~160 words |

**Notable SEO details:**
- Q1 wraps "Digital Marketing Agency" in an `<h1>` tag
- Q4 wraps the question in an `<h2>` tag
- Q6 wraps "digital marketing" in an `<h2>` tag
- All use Schema.org FAQ markup (Question/Answer)

### Key stats mentioned in FAQ:
- $7.8 billion in sales generated
- 1067 different industries and niches
- 4,952 reviews (average 4.7 stars)
- 38 millionaires created
- 6x 8-figure clients created
- #17 fastest growing company in Australia (AFR)
- #1 fastest growing agency (3 years in a row)

### CTA
- **Within answers:** Links to /ppc-management-agency/, /facebook-advertising-agency/, /seo-agency/, /reviews/

### Layout
- **Heading:** col-12 centered
- **Accordion:** col-lg-10 centered, `<dl>` with accordion classes

### Color Scheme
- **Background:** None set
- **Text:** Dark

### Total Section Word Count: ~620 words (heading + all Q&A)

---

## SECTION 14: FINAL CTA (HIT THE DAMN BUTTON)

**Section Name:** Final Call-to-Action
**Purpose:** Last-chance conversion CTA before the footer. Playful, low-pressure tone.
**CSS Classes:** `text-light content-global hit-the-damn-button`

### Heading
- **Text:** "I guess what we're trying to say is that you should hit the damn button"
- **Word Count:** 15 words

### CTA
- **Button Text:** "Hit the damn button"
- **Button Link:** /30-minute-strategy-session/
- **Button Style:** `btn btn-doublelayer btn-green`

### Visual Elements
- **Floating icons:** 10 platform/tool icons floating around the CTA:
  - Facebook, AdWords, SEO, Instagram, ActiveCampaign, WordPress, Shopify, YouTube, Analytics, KK
- **No stripe overlay**

### Layout
- **Heading:** col-sm-10 / col-md-9 / col-lg-8 / col-xl-7 centered
- **CTA:** col-sm-9 / col-md-7 / col-lg-6 / col-xl-6 centered

### Color Scheme
- **Background:** #0a0a0a (near black)
- **Text:** Light (white)
- **Button:** Green

### Total Section Word Count: ~19 words

---

## FOOTER

**Purpose:** Site-wide footer with navigation, address, social links, newsletter signup, and extensive SEO location links.

### Content Columns (5 columns)

**Column 1: Brand**
- KK logo (full SVG wordmark)
- Tagline: "The most ruthlessly effective platform for rapidly scaling businesses on planet earth."
- Address: Level 1, 12 River Street, South Yarra, VIC 3141, Australia
- Phone: 1300 858 250
- Social links: Facebook, Instagram, LinkedIn, YouTube, Spotify
- Country switcher: Australia (with modal for US, UK, CA, NZ, IE, AE)

**Column 2: Company**
- About Us, Contact Us, Blog, Reviews, Careers, Case Studies

**Column 3: Services**
- SEO, Conversion Rate Optimisation, Google Ads, Facebook Ads, Landing Pages, Web Design

**Column 4: Solutions**
- Agency, Courses, Books, Blog

**Column 5: Newsletter**
- **Heading:** "Want some free money?"
- **Body:** "Get million dollar marketing strategies sent straight to your inbox every week. Just enter your email below."
- **Form:** Email + Name multi-step (Infusionsoft)
- **Button:** "Let's Go"

### SEO Footer Section
- Extensive expandable location-based SEO links organized by state for each service
- Example: "Canberra SEO Agency", "Sydney SEO Agency", "Melbourne SEO Agency", etc.

### Total Footer Word Count: ~80 words (visible, excluding SEO links)

---

## AGGREGATE METRICS & ANALYSIS

### Section Counts
| Metric | Count |
|--------|-------|
| Total distinct content sections | 14 (plus header + footer = 16 blocks) |
| Sections with headings | 10 |
| Sections with body copy | 9 |
| Sections that are purely visual (logos/awards) | 3 (Awards, Featured In, Brand Experience) |
| Sections with CTAs | 7 |
| Sections with social proof (reviews/stars) | 5 |

### Word Counts by Section

| Section | Words |
|---------|-------|
| 1. Hero | 49 |
| 2. Awards Marquee | 0 |
| 3. Sales Letter | 282 |
| 4. Our Offering | 80 |
| 5. Stats / Globe | 104 |
| 6. Featured In | 0 |
| 7. Case Studies | 62 |
| 8. Built For Scale | 81 |
| 9. Brand Experience | 2 |
| 10. Power In The Platform | 93 |
| 11. Sell Like Crazy | 83 |
| 12. Video Testimonials | ~400 |
| 13. FAQ | ~620 |
| 14. Final CTA | 19 |
| Header/Nav | ~30 |
| Footer | ~80 |
| **TOTAL** | **~1,985** |

### Heading Analysis

| Section | Heading Text | Words |
|---------|-------------|-------|
| Hero | "Like Steroids* For Business" | 4 |
| Stats | "Grow 10X Faster, Better, Smarter." | 6 |
| Case Studies | "Become our next success story" | 5 |
| Built For Scale | "The Most Ruthlessly Effective Platform For Rapidly Scaling Businesses On Planet Earth" | 13 |
| Power | "The Power Is In The Platform" | 7 |
| Book | "How To Get As Many Clients, Customers And Sales As You Can Possibly Handle" | 14 |
| FAQ | "YOU'VE GOT QUESTIONS, WE'VE GOT ANSWERS." | 7 |
| Final CTA | "I guess what we're trying to say is that you should hit the damn button" | 15 |

- **Average words per heading:** 8.9 words
- **Shortest heading:** 4 words (Hero)
- **Longest heading:** 15 words (Final CTA)

### Average Words Per Section
- **All sections:** ~142 words/section (1,985 / 14)
- **Content sections only (excluding 3 visual-only):** ~180 words/section

### CTA Frequency

| # | CTA Text | Link | Location |
|---|----------|------|----------|
| 1 | "Do it" (email form) | Infusionsoft form | Hero |
| 2 | "Get Started" | /au/agency/ | Our Offering - Agency |
| 3 | "Get Started" | /quantum-growth/ | Our Offering - Courses |
| 4 | "Hit the damn button" | /30-minute-strategy-session/ | Case Studies |
| 5 | "Hit The Damn Button" | /30-minute-strategy-session/ | Built For Scale |
| 6 | "Hit The Damn Button" | /30-minute-strategy-session/ | Power In The Platform |
| 7 | "Buy The Book" | https://selllikecrazybook.com/free/ | Book Section |
| 8 | "Hit the damn button" | /30-minute-strategy-session/ | Final CTA |
| 9 | "Let's Go" (email form) | Infusionsoft form | Footer |

- **CTA frequency:** One CTA approximately every 1.6 sections
- **Primary CTA destination:** /30-minute-strategy-session/ (appears 4 times)
- **Secondary CTA:** Email capture (appears 2 times)
- **Tertiary CTAs:** /au/agency/, /quantum-growth/, book site

### Social Proof Density

| Type | Count | Details |
|------|-------|---------|
| Star ratings with review count | 5 instances | Hero (4.8/7,344), Agency (4.5/704), Courses (4.8/6,640), Built For Scale (4.8/7,344), Power (4.8/7,344) |
| Video testimonials | 17 | Full video testimonials with quotes and attributions |
| Case study tiles | 21 | Clickable tiles linking to full case studies |
| Awards marquee | 1 | Scrolling awards logos |
| Featured In marquee | 1 | 3 rows of media logos |
| Brand Experience marquee | 1 | 2 rows of client brand logos |
| Stats cards | 4 | $7.8B revenue, 200K customers, 136 countries, 1067 industries |
| Amazon bestseller badge | 1 | #1 Best Seller badge |
| FAQ stats | 7 | Inline statistics (38 millionaires, #17 fastest growing, etc.) |

**Total social proof elements: ~58 distinct proof points**

---

### OVERALL COPYWRITING STYLE ANALYSIS

#### Tone & Voice
- **Extremely casual and irreverent.** Uses profanity ("f*cking hard"), slang ("Ohmygawd!", "Errrrrrrbody"), and humor throughout
- **Conversational and direct.** Reads like a personal letter, not corporate marketing
- **Confident bordering on cocky.** "The Most Ruthlessly Effective Platform For Rapidly Scaling Businesses On Planet Earth"
- **Self-deprecating humor used as a trust signal.** "And yes, we guarantee results and smell fantastic *wink*"

#### Person/Perspective
- **Mixed first-person plural (we/our) and second-person (you/your).**
- The sales letter section uses "Dear business builder" (second person direct address)
- Stats sections use first person plural ("We've generated", "Our platform")
- CTAs use imperative ("Hit the damn button", "Do it")

#### Sentence Structure
- **Very short sentences and fragments.** Many one-line paragraphs
- **Heavy use of ellipses** (...) for dramatic pause
- **Rhetorical questions** to engage the reader
- **Pattern interrupts** throughout ("*somebody please pull out my eyelashes*")

#### Key Copywriting Techniques Used
1. **Pain-Agitate-Solve (PAS):** Sales letter section identifies pain, agitates it, then offers the solution
2. **Social proof stacking:** Reviews, testimonials, stats, logos, awards layered repeatedly
3. **Specificity:** "$7.8 billion", "1067 industries", "136 countries" - not round numbers
4. **Urgency via freshness:** "Updated: 27th of February, 2026" at top of sales letter
5. **Choice architecture:** "Choose your own adventure" with only 2 options (Agency vs Courses)
6. **Repeated CTA:** "Hit the damn button" appears 4 times with identical styling
7. **Objection handling:** FAQ section directly addresses ROI, guarantee, and size concerns
8. **Authority via book:** Promoting a #1 Amazon bestseller adds author authority
9. **Results-focused testimonials:** Every testimonial includes specific numbers ($4M to $25M, 200% increase, etc.)

#### Formatting Patterns
- Bold for emphasis on key phrases
- Underline for important claims
- Italics for sarcasm or emphasis
- Short paragraphs (often 1 sentence)
- Asterisks for disclaimers and asides

#### Overall Structure Pattern
The page follows a classic direct-response long-form sales page structure:
1. **Hook** (Hero: provocative headline + video)
2. **Credibility flash** (Awards marquee)
3. **Empathy + pain identification** (Sales letter)
4. **Solution introduction** (Our Offering fork)
5. **Proof of scale** (Stats + globe)
6. **Third-party credibility** (Featured In logos)
7. **Client results** (Case studies)
8. **Platform proof** (Built For Scale)
9. **More client proof** (Brand logos)
10. **Deeper explanation** (Power In The Platform + video)
11. **Additional authority** (Book)
12. **Testimonial avalanche** (17 video testimonials)
13. **Objection handling** (FAQ)
14. **Final CTA** (Hit the damn button)

This is a **long-scroll, single-page funnel** that alternates between proof and persuasion, building cumulative trust before each CTA. The primary conversion goal is getting visitors to the /30-minute-strategy-session/ page (strategy call booking).

---

### TECHNICAL NOTES

- **WordPress** with Yoast SEO
- **Custom theme** ("kingkong")
- **A/B testing:** Convert Experiences script loaded (ID: 10046555-10047243)
- **Click fraud protection:** ClickCease tracking
- **CRM/Email:** Infusionsoft (Keap)
- **Video hosting:** Wistia
- **Slider library:** Swiper.js
- **3D Globe:** Custom JavaScript (rendered in `#globeHolder`)
- **Animations:** Lottie Player, CSS animate-in classes
- **Multi-region:** 7 country variants (AU, US, UK, CA, NZ, IE, AE) via hreflang
- **Monitoring:** Uptrends RUM monitoring
- **Schema markup:** LocalBusiness, Book, AggregateRating, BreadcrumbList, FAQ (Question/Answer)

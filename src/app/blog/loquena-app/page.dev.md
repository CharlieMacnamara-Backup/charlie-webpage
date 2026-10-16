import { ArticleLayout } from '@/components/ArticleLayout'
import { ArticleJsonLd } from '@/components/ArticleJsonLd'
import { SingleImage } from '@/components/BlogImages'
import { ImageSlideshow } from '@/components/ImageSlideshow'
import { AppStoreButton } from '@/components/AppStoreButton'
import TableOfContents from '@/components/CollapsibleToc'
import Diagram from '@/components/Diagram'

export const article = {
  author: 'Charlie Macnamara',
  date: '2026-09-08',
  title: 'Loquena: Speak, Regulate, Grow',
  description:
    ‘Offline first app giving non-verbal users a voice + games that build communication, regulation, and early literacy.',
  slug: 'loquena-app',
}

export default ({ children }) => (
  <>
    <ArticleJsonLd article={article} />
    <ArticleLayout article={article}>{children}</ArticleLayout>
  </>
)

Neurodivergent diagnosis are at an all time high. For many, speech/regulation software is their only reliable expression - yet it’s some of the most expensive. I built Loquena to fix that.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/appstore-intro.jpeg"
  alt="Loquena on the App Store"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

Loquena's an offline first toolkit for neurodivergent users to develop.

<TableOfContents />

## What are AACs?

**Augmentative and Alternative Communication** assists speech. Tap picture boards for synthesized speech.

AAC users are varied: cerebral palsy, adults after a stroke, autistic people with unreliable speech.

Then the cost. Dedicated devices run into thousands — forget those. Look at  apps:

<div className="overflow-x-auto">

| App                      | Price                     |
| ------------------------ | ------------------------- |
| Avaz AAC                 | £7.99/month (£90.99/year) |
| LAMP Words For Life      | £299.99                   |
| TouchChat with WordPower | £299.99                   |

</div>

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/aac-competitor.jpeg"
  alt="Loquena competitor pricing comparison"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

For a tool families need, these prices are for institutions.

Loquena's core is free — no ads, no subscription, no trial timer.

Games sit alongside, each aimed at teaching: reading faces, steadying the breath, hearing the sounds inside words, taking turns. All offline, no scores, or pressure.

## It's 2026, AI?

Initially, I leaned on AI <Term term="api">APIs</Term>. Worked right until Wi-Fi dropped or prices changed. For a tool someone relies on, not acceptable.

On-device AI is promising. [Gemma 4](https://ai.google.dev/gemma/docs/core) ships E2B and E4B for mobile, but the 4-bit builds still want between 3 and 4.5GB of RAM. Hand-me-down iPhones and iPads often have under 2GB. 

The project runs [PowerSync](https://powersync.com) throughout. Data lives in a local [SQLite](https://sqlite.org/) database and syncs to [supabase](https://supabase.com/) whenever a connection returns.

## The Hub

Every design started with neurodivergent users. The home screen opens on a <Term>haptic</Term> spin menu, built on the same radial motion as a fidget spinner — move between pages, or unwind.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/home-iphone.png"
  alt="Loquena home screen with radial hub"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

## The Board

I drew from other AAC apps, then stripped back and seperated.

Tap tiles to build a sentence, and your device speaks aloud. Vocabulary sorts across categories - the board grows with the user.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/aac-iphone.png"
  alt="AAC soundboard with vocabulary grid and sentence bar"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

## Config & Tiles

Most AACs cram settings onto one screen. Loquena seperates, keeping design clean.

Adjust:
- tile size
- icon style
- vocabulary level
- language
- voice
- positions

<ImageSlideshow
  images={[
    {
      src: '/blog/loquena-app/iphone-config-intro.png',
      alt: 'Config page with Move/Edit Tiles button and custom words section',
      caption: 'Move and edit tiles from the config page.',
    },
    {
      src: '/blog/loquena-app/iphone-config-voices.png',
      alt: 'Config page with voice setup guide and sound effects toggle',
      caption:
        'Voice setup guide walks users through downloading premium voices.',
    },
    {
      src: '/blog/loquena-app/iphone-config-options.png',
      alt: 'Config page with vocabulary level, language, tile size, and icon type options',
      caption: 'Vocabulary level, language, tile size, and icon type.',
    },
  ]}
/>

### Move Tiles

Moving tiles gets its own page: drag-and-drop to arrange per profile.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/iphone-move-tiles.png"
  alt="Tiles being rearranged in move mode with drag-and-drop"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

### Custom Words

Vocabulary fringes leading AAC lists. User lists are personal, append whenever.

<ImageSlideshow
  images={[
    {
      src: '/blog/loquena-app/iphone-custom-word.png',
      alt: 'Config page showing empty custom words state with Add first word button',
      caption: 'Build a unique word list for each profile.',
    },
    {
      src: '/blog/loquena-app/iphone-aac-custom-word.png',
      alt: 'AAC page showing rendered custom word',
      caption: 'Access added words.',
    },
  ]}
/>

### Voices

The app ships no voices of its own — it speaks through the <Term>TTS</Term> models already on your device.

Apple ships TTS across dozens of languages and accents, improving with OS updates, and [Personal Voice](https://support.apple.com/en-mn/104993) - supported here - creates unique synthesised voices.

Enhanced and Premium variants sound noticeably natural. Download under iOS Accessibility settings:

<ImageSlideshow
  images={[
    {
      src: '/blog/loquena-app/voice-setup-1-accessibility.png',
      alt: 'iOS Settings Accessibility page',
      caption: 'Open Settings, tap **Accessibility**.',
    },
    {
      src: '/blog/loquena-app/voice-setup-2-spoken-content.png',
      alt: 'Spoken Content settings with Voices option',
      caption: 'Tap **Spoken Content**, then **Voices**.',
    },
    {
      src: '/blog/loquena-app/voice-setup-3-voices-list.png',
      alt: 'List of available languages for voice download',
      caption: 'Select your **language**.',
    },
    {
      src: '/blog/loquena-app/voice-setup-4-voice-settings.png',
      alt: 'Voice settings with rate, pitch, and speech volume controls',
      caption: 'Adjust **rate, pitch, and volume** to suit your child.',
    },
    {
      src: '/blog/loquena-app/voice-setup-5-voice-options.png',
      alt: 'Voice options with Enhanced and Premium variants available for download',
      caption: 'Tap the **cloud icon** to download Enhanced or Premium voices.',
    },
  ]}
/>

## Games and Growth

### Emotion Cards

Naming an emotion tends to take the sting out of it, and a common language helps a child tell an adult what's wrong.

Google's [ML Kit](https://developers.google.com/ml-kit) turns practice, into a game. Face detection runs entirely on-device: the camera reads facial landmarks and the model's smiling and eye-open probabilities, and a heuristic matches those against the deck's theme. The camera never uploads a frame, and the match errs soft — ML Kit measures expressions, not feelings.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/emotion-cards-iphone.png"
  alt="Emotion Cards with face detection"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

### Breathing

Pull your body out of stress. Finding self-regulation hard, a visual guide does the counting.

Three blurred circles scaled with `flutter_animate`, paced to each phase so the inhale, hold, and exhale stay in step. Audio tracks play underneath, and <Term>haptic</Term> pulses carry the same cue. Sessions ends when the user decides.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/breathing-iphone.png"
  alt="Breathing focus mode with liquid bubble animation"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

### Syllables

Clapping out the beats in a word is one of the first exercises a speech and language therapist sets, and for apraxia, repeating sounds is core practice.

Type a word and a custom TeX hyphenation engine splits it into syllables on-device — no dictionary lookup. Tap each syllable to hear it, record your attempt, then play it back. Every session ties to a profile. Pattern hyphenation captures the rhythm of most words, but where English is awkward it's a close approximation, corrected by a common dictionary.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/syllables-iphone.png"
  alt="Syllable Library with search and audio playback"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

### Tic Tac Toe

Turn-taking — you go, then I go. Tic Tac Toe strips back.

Play passes between two people on the same device, or against a local CPU opponent, entirely offline.

<div className="max-w-xs mx-auto">

<SingleImage
  src="/blog/loquena-app/ttt-iphone.png"
  alt="Tic Tac Toe grid mid-game"
  orientation="vertical"
  blogSlug="loquena-app"
/>

</div>

## Proving It Works

Every push runs the same pipeline, building on [Codemagic's](http://codemagic.io/) fresh device instance: static analysis, integration tests, then [Maestro](https://maestro.mobile.dev) drives end-to-end flows against a simulator. In production, [Sentry](https://sentry.io) watches for crashes.

## What's Next

Android next — payoff of building in [Flutter](https://flutter.dev/): testing and store work, not a rewrite. Localisations and features follow.

<div className="mt-6">
  <AppStoreButton href="https://apps.apple.com/gb/app/loquena-aac-communication/id6754030254" />
</div>

Everything about the app lives at [loquena.com](https://loquena.com).

Thanks for reading. Reach out at [mail@charliemacnamara.uk](mailto:mail@charliemacnamara.uk)

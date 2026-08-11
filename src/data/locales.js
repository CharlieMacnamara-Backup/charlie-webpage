export const messages = {
  layout: {
    title: {
      template: '%s | Charlie Macnamara',
      default: 'Charlie Macnamara (also McNamara) - Technical Writer',
    },
    description:
      'Charlie Macnamara (also Charlie McNamara) — Technical writer making systems and concepts clear and accessible.',
    ogDescription:
      'Charlie Macnamara — Technical writer making systems and concepts clear and accessible.',
    siteName: 'Charlie Macnamara',
    twitterTitle: 'Charlie Macnamara',
  },
  home: {
    heading: 'Technical Writer, Web Enthusiast, Amateur Baker',
    tagline: '',
    blogTitle: 'Personal Blog',
    blogSubtitle: 'Beyond work',
    subtitle: 'Vanity/Portfolio site',
    githubAriaLabel: 'Follow on GitHub',
    linkedinAriaLabel: 'Follow on LinkedIn',
    experience: 'Experience',
    resume: [
      {
        company: 'Freelance',
        title: 'Freelance Technical Writer & Full-Stack Developer',
        start: 'Sep 2023',
        end: 'Present',
        startDateTime: '2023-09',
      },
      {
        company: 'EVORA Global',
        title: 'Technical Writer',
        start: 'Aug 2022',
        end: 'Sep 2023',
        startDateTime: '2022-08',
        endDateTime: '2023-09',
      },
      {
        company: 'Transloadit',
        title: 'Technical Writer & Support Engineer',
        start: 'Sep 2019',
        end: 'Apr 2022',
        startDateTime: '2019-09',
        endDateTime: '2022-04',
      },
    ],
    downloadCv: 'Download CV',
    downloadCvAriaLabel: 'Download CV',
    srCompany: 'Company',
    srRole: 'Role',
    srDate: 'Date',
    dateAriaLabel: '{start} until {end}',
    readArticle: 'Read article',
    companyLogoAlt: '{company} company logo',
  },
  about: {
    title: 'About',
    description: 'Technical writer in Edinburgh. Clear, usable docs.',
    heading: 'Charlie Macnamara — Edinburgh, Scotland.',
    paragraphs: [
      'APIs, migrations, developer tools — things that actually get read.',
      'Years of releases, migrations, and changes taught me where users stumble — and how to guide them.',
    ],
    followGitHub: 'Follow on GitHub',
    followLinkedIn: 'Follow on LinkedIn',
    email: 'mail@charliemacnamara.uk',
    phone: '',
    alt: 'Professional headshot of Charlie Macnamara, technical writer and developer',
  },
  portfolio: {
    title: 'Portfolio',
    description: 'Selected Technical Writing.',
    pageTitle: 'Selected Works',
    intro: "Here's some varied work. For more examples, drop me a line.",
    introLinkText: 'drop me a line',
    activeSites: {
      heading: 'Websites I Maintain',
      description:
        'Alongside Technical Writing, I also build and actively maintain full-stack web applications (like this one).',
      sites: [
        {
          name: 'Sicamon',
          description:
            'Stripe as CMS — inventory and pricing managed through the Stripe dashboard. Cloudflare Workers propagate changes automatically.',
        },
        {
          name: 'QualityKilts.com',
          description:
            '4 Cloudflare Workers (frontend, calendar, reviews, admin dashboard).',
          readMore: 'read the full story',
        },
      ],
    },
    sections: [
      {
        title: 'Blog Posts',
        projects: [
          {
            title: 'Implementing AI Face Detection in Smart CDN',
            description:
              'Guide on integrating AI face detection using CDN infrastructure.',
            cta: 'View',
          },
          {
            title: 'ConfigCat Public Management API',
            description: 'Public Management API Demo.',
            cta: 'View',
          },
          {
            title:
              'How to dockerize a Django, Preact, and PostgreSQL Application',
            description:
              'Dockerization guide for Django, Preact, and PostgreSQL.',
            cta: 'View',
          },
          {
            title: 'Enhanced Graphics in Wisej.NET: Beyond LibGDIPlus',
            description:
              'Introducing consistent cross-platform graphics for Windows apps.',
            cta: 'View',
          },
        ],
      },
      {
        title: 'Documentation',
        projects: [
          {
            title: 'SIERA API Reference: Consumption Metrics',
            description: 'ESG API documentation.',
            cta: 'View',
          },
          {
            title: "What's new in Wisej.NET 3.1",
            description: 'Version release documentation.',
            cta: 'View',
          },
          {
            title: 'Document Convert Specification',
            description:
              'Convert documents into different formats; parameters, usage, and examples.',
            cta: 'View',
          },
          {
            title: 'Image Face Detection Specification',
            description:
              'Detect faces in images; parameters, usage, and examples.',
            cta: 'View',
          },
          {
            title: 'Transloadit Plans: Priority Job Slots',
            description: 'Reserved capacity and job slot claims explained.',
            cta: 'View',
          },
          {
            title: 'DigitalOcean Import Specification',
            description:
              'Import files from DigitalOcean; parameters, usage, and examples.',
            cta: 'View',
          },
          {
            title: 'Template Credentials',
            description: 'Managing credentials in Templates securely.',
            cta: 'View',
          },
        ],
      },
      {
        title: 'Case Studies',
        projects: [
          {
            title: 'Sonepar: Wisej.NET-based Pricing Solution',
            description:
              'High-scale pricing conditions solution integrated with SAP.',
            cta: 'View',
          },
          {
            title: 'FIUKA: Streamlining Metal Processing',
            description: 'Manufacturing processes modernized with Wisej.NET.',
            cta: 'View',
          },
          {
            title: 'Overjoyed: Accessibility Gaming App',
            description:
              'Input solutions using mouse or eye gaze with Wisej.NET.',
            cta: 'View',
          },
        ],
      },
      {
        title: 'ESG Technical Content',
        projects: [
          {
            title: 'Data Gap Analysis',
            description:
              'Guide on identifying and addressing environmental metric gaps.',
            cta: 'View',
          },
          {
            title: 'Net Zero Carbon Guide',
            description:
              "Overview of SIERA's Net Zero Carbon dashboards, pathways, and modelling.",
            cta: 'View',
          },
          {
            title: 'Unit Conversion Guide',
            description: 'Product overview - conversion methodologies.',
            cta: 'View',
          },
        ],
      },
      {
        title: 'Technical Showcases',
        projects: [
          {
            title: 'Wisej.NET Visual Studio Integration Guide',
            description:
              'Youtube tutorial on using Wisej.NET with Visual Studio.',
            cta: 'Watch',
          },
          {
            title: 'Computer Vision with FFmpeg',
            description:
              'Integrating computer vision with FFmpeg video processing.',
            cta: 'View',
          },
        ],
      },
    ],
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    message: "Sorry, we couldn't find the page you're looking for.",
    goHome: 'Go back home',
  },
  blog: {
    title: 'Non-work Blog',
    description:
      'Thoughts beyond my professional work. Dives into movies, tech, and personal projects.',
    pageTitle: 'Beyond Work',
    pageIntro: 'Movies, tech, personal projects.',
    readArticle: 'Read article',
    loading: 'Loading articles...',
    loadingMore: 'Loading more articles...',
    noArticles: 'No articles found.',
    noMore: 'No more articles to load',
  },
  nav: {
    about: 'About',
    blog: 'Blog',
    portfolio: 'Portfolio',
    contact: 'Contact',
    menu: 'Menu',
    siteNavigation: 'Site Navigation',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    desktopNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    returnHome: 'Return to homepage',
    avatarAlt: 'Charlie Macnamara - Technical Writer and Developer',
    switchTheme: 'Switch to {theme} theme',
    toggleTheme: 'Toggle theme',
  },
  footer: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
    phone: '',
    privacy: 'Privacy',
    contact: 'Contact',
    copyright: '© {year} Charlie Macnamara. All rights reserved.',
    builtOn: 'Built on:',
    tech: ['Next.js', 'React', 'TailwindCSS', 'AWS'],
  },
  seo: {
    defaultTitle: 'Charlie Macnamara',
    defaultDescription:
      'Charlie Macnamara — Technical writer making complex systems and concepts accessible through clear documentation.',
    siteUrl: 'https://charliemacnamara.uk',
    siteName: 'Charlie Macnamara',
    locale: 'en_GB',
    twitterHandle: '@charliemacnamara',
    keywords: [
      'Charlie Macnamara',
      'Charlie McNamara',
      'charlie macnamara',
      'charlie mcnamara',
      'Charliemacnamara',
      'Charliemcnamara',
      'Technical Writing',
      'Technical Documentation',
      'Developer Experience',
      'Documentation',
      'Web Development',
      'Technical Content',
      'Developer Tools',
      'System Documentation',
    ],
    articleImageAlt: 'Article featured image',
  },
  card: {
    readMoreAbout: 'Read more about {title}',
    clickTo: 'Click to ',
  },
  photos: {
    clickToView: 'Click to view larger image',
    dotLabel: 'Go to image {number}',
    captions: [
      'Red Arrows over Edinburgh Castle during the Tattoo.',
      'Frozen waterfall in the Highlands.',
      'Kayaking on Loch Lomond.',
      'Fresh sourdough cooling on a rack.',
    ],
  },
  imageModal: {
    close: 'Close dialog',
  },
  errorMessage: {
    title: 'Error',
    message: 'Please try again or refresh the page.',
    retryAriaLabel: 'Retry the failed operation',
    retryText: 'Retry Operation',
  },
  skipToMain: 'Skip to main content',
  videoPlayer: {
    fallback: "Your browser doesn't support HTML5 video.",
  },
  simpleVideo: {
    unableToLoad: 'Unable to load video',
    openInNewTab: 'Open video in new tab',
    browserNotSupported: 'Your browser does not support the video tag.',
    download: 'Download the video',
    instead: ' instead.',
  },
  staticPlayer: {
    videoLabel: 'Video player',
    audioLabel: 'Audio player',
    mediaLabel: 'Media player',
    videoFallback: 'Your browser does not support the video tag.',
    audioFallback: 'Your browser does not support the audio tag.',
  },
  imageSlideshow: {
    previous: 'Previous slide',
    next: 'Next slide',
    goToSlide: 'Go to slide {number}',
  },
  collapsibleToc: {
    defaultTitle: 'On this page',
  },
  loading: {
    defaultText: 'Loading...',
    defaultDescription: 'Please wait.',
  },
  errorBoundary: {
    heading: 'Something went wrong',
    defaultMessage: 'An unexpected error occurred',
    reload: 'Reload page',
  },
  blogWarning: {
    note: 'Note',
    warning: 'Warning',
    workInProgress: 'Work in Progress',
  },
  articleLayout: {
    returnToBlog: 'Return to blog',
    readingProgress: 'Reading progress',
  },
  diagram: {
    failedToRender: 'Diagram failed to render',
  },
  blogImages: {
    failedToLoad: 'Failed to load image',
  },
  schema: {
    personName: 'Charlie Macnamara',
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    jobTitle: 'Technical Writer',
    personDescription:
      'Technical writer making systems and concepts clear and accessible.',
    websiteName: 'Charlie Macnamara',
    websiteDescription:
      'Technical writer making systems and concepts clear and accessible.',
    blogName: 'Charlie Macnamara - Blog',
    blogDescription:
      'Articles about technical writing, documentation, and software development.',
  },
  getAllArticles: {
    defaultAuthor: 'Charlie Macnamara',
  },
  contact: {
    metaTitle: 'Get a Fixed-Price Website',
    metaDescription:
      'Fixed-price websites for local businesses: online booking, Stripe payments, Google visibility. One fee, no subscriptions.',
    heading: 'Get a Fixed-Price Website',
    intro:
      'One fee. No subscriptions. I design, build, and maintain the whole site — you just run your business.',
    features: [
      {
        title: 'Online booking',
        body: 'no missed calls or double-bookings',
      },
      {
        title: 'Stripe payments',
        body: 'sell around the clock',
      },
      {
        title: 'Google visibility',
        body: 'local customers find you',
      },
      {
        title: 'Reviews on your site',
        body: 'fresh proof, zero effort',
      },
    ],
    testimonial:
      '<link>Davison Menswear</link>, a Bruntsfield kilt shop, runs bookings, reviews, and orders from one page.',
    ctaPrompt: 'Tell me about your business. Fixed price, up front.',
    form: {
      formAria: 'Contact form',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      submit: 'Request Quote',
      success: "Message received. I'll get back to you within 24 hours.",
      errorRequired: 'Please fill in all fields.',
      errorEmail: 'Please enter a valid email address.',
      errorSubmit:
        'Something went wrong sending your message. Please try again, or email mail@charliemacnamara.uk.',
    },
  },
  privacy: {
    metaTitle: 'Privacy Policy',
    metaDescription: 'Privacy policy for Charlie Macnamara',
    heading: 'Privacy Policy',
    intro:
      'This site collects no personal data beyond standard server logs. No cookies are used for tracking or analytics.',
    dataCollectionHeading: 'Data Collection',
    dataCollectionBody:
      'This is a static site hosted on Cloudflare Pages. Cloudflare may log standard HTTP request data (IP address, user agent, requested URL) as part of normal operations. These logs are not used for profiling or advertising.',
    cookiesHeading: 'Cookies',
    cookiesBody:
      'This site does not set any cookies. No analytics, tracking, or advertising cookies are used.',
    contactHeading: 'Contact',
    contactLead: 'If you have questions about this policy, contact ',
    contactEmail: 'mail@charliemacnamara.uk',
    lastUpdated: 'Last updated: July 2026',
  },
}

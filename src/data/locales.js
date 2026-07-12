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
    githubAriaLabel: 'Follow on GitHub',
    linkedinAriaLabel: 'Follow on LinkedIn',
    experience: 'Experience',
    resume: [
      { company: 'Freelance', title: '', start: '2023', end: 'Present' },
      {
        company: 'EVORA Global',
        title: 'Technical Writer',
        start: '2022',
        end: '2023',
      },
      {
        company: 'Transloadit',
        title: 'Technical Writer & Support Engineer',
        start: '2019',
        end: '2022',
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
      'Years of releases, migrations, and API changes taught me where users stumble — and how to fix it.',
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
  },
  blogImages: {
    failedToLoad: 'Failed to load image',
  },
  schema: {
    personName: 'Charlie Macnamara',
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
}

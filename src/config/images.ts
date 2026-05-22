export const IMAGE_SIZES = {
  heroHome:      { width: 1440, height: 810,  ratio: '16/9'   },
  heroPillar:    { width: 1440, height: 617,  ratio: '21/9'   },
  heroArticle:   { width: 1200, height: 514,  ratio: '21/9'   },
  cardGrid:      { width: 640,  height: 360,  ratio: '16/9'   },
  cardFeatured:  { width: 800,  height: 533,  ratio: '3/2'    },
  thumbList:     { width: 320,  height: 240,  ratio: '4/3'    },
  avatarAuthor:  { width: 160,  height: 160,  ratio: '1/1'    },
  inlineArticle: { width: 800,  height: 450,  ratio: '16/9'   },
  adSide:        { width: 300,  height: 250,  ratio: '6/5'    },
  adLeaderboard: { width: 728,  height: 90,   ratio: '728/90' },
  ogImage:       { width: 1200, height: 630,  ratio: '1.91/1' },
  logoHeader:    { width: 232,  height: 80,   ratio: 'auto'   },
} as const;

export type ImageSize = keyof typeof IMAGE_SIZES;

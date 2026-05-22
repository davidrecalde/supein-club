export type AdPhase = 'interlink' | 'adsense' | 'direct';

export type AdPosition =
  | 'art-mid'
  | 'art-side'
  | 'art-bottom'
  | 'pillar-mid'
  | 'home-mid'
  | 'footer-all';

export const ADS_CONFIG = {
  phase: 'interlink' as AdPhase,
  adsenseId: '',
  slots: {
    'art-mid':    { desktop: '728x90',  mobile: '300x250' },
    'art-side':   { desktop: '300x250', mobile: 'hidden'  },
    'art-bottom': { desktop: '728x90',  mobile: '300x100' },
    'pillar-mid': { desktop: '728x90',  mobile: '300x250' },
    'home-mid':   { desktop: '970x90',  mobile: '300x250' },
    'footer-all': { desktop: '728x90',  mobile: '300x100' },
  }
} as const;

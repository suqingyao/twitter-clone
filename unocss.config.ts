import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        mono: ['IBM Plex Mono:400,700']
      }
    })
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      dim: {
        50: '#5F99F7',
        100: '#5F99F7',
        200: '#38444d',
        300: '#202e3a',
        400: '#253341',
        500: '#5F99F7',
        600: '#5F99F7',
        700: '#192734',
        800: '#162d40',
        900: '#15202b'
      }
    },
    breakpoints: {
      xs: '614px',
      sm: '1002px',
      md: '1022px',
      lg: '1092px',
      xl: '1280px'
    }
  },
  safelist: [
    'group-hover:text-red-100',
    'group-hover:text-red-400',
    'group-hover:text-blue-100',
    'group-hover:text-blue-400',
    'group-hover:text-green-100',
    'group-hover:text-green-400',
    'group-hover:bg-red-100',
    'group-hover:bg-red-400',
    'group-hover:bg-blue-100',
    'group-hover:bg-blue-400',
    'group-hover:bg-green-100',
    'group-hover:bg-green-400'
  ],
  shortcuts: {
    'default-transition': 'transition ease-in-out duration-350',
    'twitter-border-color': 'border-gray-200 dark:border-white'
  }
})

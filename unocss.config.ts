import {
  defineConfig,
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'DM Sans'
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
    }
  },
  shortcuts: {
    'default-transition': 'transition ease-in-out duration-350',
    'twitter-border-color': 'border-white-200 dark:border-gray-700'
  }
})

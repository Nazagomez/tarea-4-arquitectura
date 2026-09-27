import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function getTrackDetailRoutes(): string[] {
  const csvPath = resolve('content/top50-spotify-2019.csv')
  const csvText = readFileSync(csvPath, 'utf8')
  const rowCount = csvText.trim().split('\n').length - 1
  return Array.from({ length: rowCount }, (_, index) => `/tracks/${index + 1}`)
}

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/tracks', '/favoritos', ...getTrackDetailRoutes()]
    }
  },
  app: {
    head: {
      title: 'Top 50 Spotify 2019',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Las 50 canciones más populares de Spotify en 2019, cargadas desde un dataset CSV con Nuxt Content y Pinia.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600;700&display=swap'
        },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css' },
        { rel: 'stylesheet', href: '/css/site.css' }
      ]
    }
  }
})

<script setup lang="ts">
const tracksStore = useTracksStore()
await useAsyncData('home-tracks', () => tracksStore.loadTracks())
const { tracks, averagePopularity } = storeToRefs(tracksStore)

useSeoMeta({
  title: 'Inicio | Top 50 Spotify 2019',
  description: 'Listado de las 50 canciones más populares de Spotify en 2019, cargado desde un CSV con Nuxt Content y Pinia.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <h2 style="margin-top: 15px">Top 50 Spotify Songs 2019</h2>
    <p>
      Sitio construido con el dataset
      <em>Top 50 Spotify Songs - 2019</em>
      de Kaggle. El archivo CSV se declara como una colección de tipo
      <code>data</code>
      y las páginas leen los registros desde un store de Pinia.
    </p>
    <div class="row">
      <div class="six columns stat-box">
        <h5>Explorar el ranking</h5>
        <p>
          {{ tracks.length }} canciones con enlaces a cada registro individual,
          promedio de popularidad {{ formatTrackAverage(averagePopularity) }}.
        </p>
        <p><NuxtLink class="button button-primary" to="/tracks">Ver listado</NuxtLink></p>
      </div>
      <div class="six columns stat-box">
        <h5>Favoritos persistentes</h5>
        <p>
          La lista de favoritos se conserva al recargar la página con
          <code>pinia-plugin-persistedstate</code>.
        </p>
        <p><NuxtLink class="button" to="/favoritos">Ir a favoritos</NuxtLink></p>
      </div>
    </div>
    <FooterView />
  </div>
</template>

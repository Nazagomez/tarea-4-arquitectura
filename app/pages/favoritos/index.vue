<script setup lang="ts">
const tracksStore = useTracksStore()
await useAsyncData('favorites-tracks', () => tracksStore.loadTracks())
const { favoriteTracks } = storeToRefs(tracksStore)

useSeoMeta({
  title: 'Favoritos | Top 50 Spotify 2019',
  description: 'Canciones marcadas como favoritas. La lista se conserva al recargar la página.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Favoritos
    </p>
    <h3 style="margin-top: 15px">Lista de favoritos</h3>
    <p>
      Los identificadores se guardan en el store y se conservan al recargar
      gracias a <code>pinia-plugin-persistedstate</code>.
    </p>
    <p v-if="favoriteTracks.length === 0" class="synopsis">
      Todavía no hay favoritos. Abra una canción y márquela, o use el botón del listado.
    </p>
    <ul v-else class="book-list">
      <TrackListItem v-for="track in favoriteTracks" :key="track.num" :track="track" />
    </ul>
    <FooterView />
  </div>
</template>

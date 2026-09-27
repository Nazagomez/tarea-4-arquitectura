<script setup lang="ts">
const tracksStore = useTracksStore()
const { favoriteNums } = storeToRefs(tracksStore)
</script>

<template>
  <div class="site-header">
    <h1 class="site-brand">
      <NuxtLink to="/">Top 50 Spotify 2019</NuxtLink>
    </h1>
    <p class="site-tagline">Dataset de Kaggle consultado desde un store de Pinia</p>
    <div class="row">
      <NuxtLink class="button" to="/">Inicio</NuxtLink>
      <NuxtLink class="button" to="/tracks">Canciones</NuxtLink>
      <NuxtLink class="button" to="/favoritos">
        Favoritos
        <span v-if="favoriteNums.length > 0">({{ favoriteNums.length }})</span>
      </NuxtLink>
    </div>
  </div>
</template>

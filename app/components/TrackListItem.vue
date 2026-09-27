<script setup lang="ts">
import type { Track } from '../types/track'

const props = defineProps<{
  track: Track
}>()

const tracksStore = useTracksStore()

function executeToggleFavorite(): void {
  tracksStore.executeToggleFavorite(props.track.num)
}
</script>

<template>
  <li class="book-card">
    <div class="book-card-fallback" aria-hidden="true">#{{ track.num }}</div>
    <div>
      <NuxtLink class="book-card-title" :to="`/tracks/${track.num}`">{{ track.name }}</NuxtLink>
      <p class="book-card-meta">
        {{ track.artist }} — {{ track.genre }} — Popularidad: {{ track.popularity }}
      </p>
      <button class="button favorite-button" type="button" @click="executeToggleFavorite">
        {{ tracksStore.hasFavorite(track.num) ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
      </button>
    </div>
  </li>
</template>

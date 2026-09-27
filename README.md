# Tarea 4 — Top 50 Spotify 2019

**Estudiante:** Nazareth Gómez Gómez  
**Carné:** 504430491  
**Curso:** EIF-511 Arquitectura de Información

Sitio Nuxt que declara el dataset *Top 50 Spotify Songs - 2019* de Kaggle como una colección de tipo `data` y lo consulta desde un store de Pinia, siguiendo el Tutorial 5.

## URL de Netlify

https://tarea-4-arquitectura.netlify.app/

## Requisitos cubiertos

1. **Dataset CSV de Kaggle:** `content/top50-spotify-2019.csv`. Encabezados en minúscula, sin espacios ni acentos, con la columna identificadora `num`.
2. **Store de Pinia:** acciones `loadTracks` y `loadTrack`. El listado y el detalle leen los datos desde el store.
3. **Detalle de cada registro:** todos los campos del CSV, más enlaces al registro anterior y al siguiente.
4. **Getter de promedio:** `averagePopularity` se muestra en la página de listado.
5. **Favoritos persistentes:** la lista se conserva al recargar con `pinia-plugin-persistedstate`.
6. **Publicación:** Netlify con `npm run generate` y directorio `dist`.

## Cómo ejecutar

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:3000`.

## Publicación en Netlify

1. Suba el proyecto a GitHub **sin** `node_modules`.
2. En Netlify use *Import from Git*, comando `npm run generate` y directorio `.output/public`.
3. Use Node 22. El archivo `netlify.toml` ya trae esa configuración.

## Fuente de datos

- [Top 50 Spotify Songs - 2019 (Kaggle)](https://www.kaggle.com/datasets/leonardopena/top50spotify2019)
- Encabezados originales renombrados según el Tutorial 5 (`Track.Name` → `name`, `Beats.Per.Minute` → `bpm`, etc.)

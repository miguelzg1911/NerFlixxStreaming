<template>
  <RouterView />
</template>

<style>
/* Estilo Global para que sea Nerflixx */
:root {
  --nerflixx-red: #E50914;
  --nerflixx-black: #141414;
}

body {
  margin: 0;
  background-color: var(--nerflixx-black);
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>
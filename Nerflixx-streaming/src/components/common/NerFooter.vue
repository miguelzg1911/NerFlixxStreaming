<template>
  <footer :class="['ner-footer', { 'footer-dark': isDark }]">
    <div class="footer-content">
      <p class="footer-top">¿Preguntas? Llama al 01-800-917-1564</p>
      <ul class="footer-links">
        <li><a href="#">Preguntas frecuentes</a></li>
        <li><a href="#">Centro de ayuda</a></li>
        <li><a href="#">Cuenta</a></li>
        <li><a href="#">Prensa</a></li>
        <li><a href="#">Relaciones con inversionistas</a></li>
        <li><a href="#">Empleo</a></li>
        <li><a href="#">Formas de ver</a></li>
        <li><a href="#">Términos de uso</a></li>
        <li><a href="#">Privacidad</a></li>
        <li><a href="#">Preferencias de cookies</a></li>
        <li><a href="#">Información corporativa</a></li>
        <li><a href="#">Contáctanos</a></li>
      </ul>
      <div class="footer-country">Nerflixx Colombia</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isDark = computed(() => {
  return route.path === '/' || route.path === '/login' || route.path.includes('watch');
});
</script>

<style scoped>
.ner-footer {
  background: #f3f3f3;
  padding: 50px 0 30px;
  color: #737373;
  font-size: 0.85rem;
  border-top: 1px solid #e6e6e6;
  width: 100%;
}

.footer-dark {
  background: #141414 !important;
  border-top: 1px solid #333;
  color: #737373;
}

.footer-dark .footer-links a {
  color: #737373;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 4%;
}

.footer-top {
  margin-bottom: 30px;
}

.footer-top:hover {
  text-decoration: underline;
  cursor: pointer;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
}

.footer-links a {
  color: #737373;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-country {
  font-size: 0.75rem;
}

@media (max-width: 740px) {
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
<template>
  <nav :class="['ner-main-nav', { 'nav-black': isScrolled }]">
    <div class="nav-content-wrapper">
      <div class="nav-left-section">
        <h1 class="nav-logo" @click="$router.push('/')">NERFLIXX</h1>
        <ul class="nav-menu-links">
          <li @click="$router.push('/')">Inicio</li>
          <li>Series</li>
          <li>Películas</li>
          <li>Novedades populares</li>
          <li>Mi lista</li>
        </ul>
      </div>

      <div class="nav-right-section">
        <button v-if="!hasToken" class="nav-login-btn" @click="$router.push('/login')">
          Iniciar sesión
        </button>

        <template v-else>
          <div class="nav-profile-wrapper">
            <img :src="profileAvatar" class="nav-avatar-img" />
            <div class="nav-dropdown-menu">
              <div class="dropdown-user">{{ profileName }}</div>
              <hr />
              <div class="dropdown-action" @click="handleLogout">Cerrar sesión</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isScrolled = ref(false);
const hasToken = computed(() => !!localStorage.getItem('token'));
const profileName = ref(localStorage.getItem('selectedProfileName') || 'Usuario');
const profileAvatar = ref('https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png');

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};

const handleScroll = () => { isScrolled.value = window.scrollY > 0; };
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.ner-main-nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 68px;
  z-index: 2000;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
  transition: background 0.4s;
  padding: 0 4%;
  box-sizing: border-box;
}

.nav-black { background: #141414 !important; }

.nav-content-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left-section {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-logo {
  color: #e50914;
  font-size: 1.8rem;
  margin: 0;
  cursor: pointer;
  font-weight: bold;
}

.nav-menu-links {
  display: flex;
  list-style: none;
  gap: 20px;
  padding: 0;
  margin: 0;
  color: #e5e5e5;
  font-size: 0.85rem;
}

.nav-menu-links li { cursor: pointer; transition: 0.3s; }
.nav-menu-links li:hover { color: #b3b3b3; }

.nav-login-btn {
  background: #e50914;
  color: white;
  border: none;
  padding: 7px 17px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
}

.nav-profile-wrapper {
  position: relative;
  padding: 10px 0;
}

.nav-avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0,0,0,0.9);
  border: 1px solid #333;
  width: 180px;
  display: none;
  flex-direction: column;
  padding: 10px 0;
}

.nav-profile-wrapper:hover .nav-dropdown-menu { display: flex; }

.dropdown-user { padding: 10px; color: white; font-size: 0.8rem; }
.dropdown-action { padding: 10px; color: white; font-size: 0.8rem; cursor: pointer; }
.dropdown-action:hover { text-decoration: underline; }
</style>
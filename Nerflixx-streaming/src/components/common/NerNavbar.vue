<template>
  <nav :class="['main-nav', { 'nav-black': isScrolled, 'minimal-mode': minimal }]">
    <div class="nav-left">
      <h1 class="logo" @click="$router.push('/')">NERFLIXX</h1>
      
      <ul v-if="!minimal" class="nav-links">
        <li class="active" @click="$router.push('/')">Inicio</li>
        <li>Series</li>
        <li>Películas</li>
        <li>Novedades populares</li>
        <li>Mi lista</li>
      </ul>
    </div>

    <div class="nav-right">
      <template v-if="!minimal">
        <div :class="['search-container', { 'active': isSearchActive }]">
          <i class="fas fa-search search-icon" @click="isSearchActive = !isSearchActive"></i>
          <input 
            v-if="isSearchActive"
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            placeholder="Títulos, personas, géneros" 
            class="search-input"
            ref="searchInput"
          />
        </div>
        
        <span class="nav-item">Niños</span>
        <i class="fas fa-bell nav-item"></i>
        
        <div class="profile-menu">
          <img :src="profileAvatar" alt="Profile" class="nav-avatar" />
          <i class="fas fa-caret-down"></i>
          
          <div class="dropdown">
            <div class="dropdown-item">
              <img :src="profileAvatar" alt="user" />
              <span>{{ profileName }}</span>
            </div>
            <hr />
            <div class="dropdown-item" @click="handleLogout">
              Cerrar sesión en Nerflixx
            </div>
          </div>
        </div>
      </template>

      <slot name="right" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  minimal?: boolean; // Si es true, oculta la navegación y cambia a estilo blanco
}>();

const router = useRouter();
const searchQuery = ref('');
const isScrolled = ref(false);
const isSearchActive = ref(false);

// Datos de sesión
const profileName = ref(localStorage.getItem('profileName') || 'Usuario');
const profileAvatar = ref('https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
  }
};

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  if (!props.minimal) {
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.main-nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4%;
  z-index: 1000;
  transition: background-color 0.4s;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent);
}

.nav-black {
  background-color: var(--nerflixx-black) !important;
}

.logo {
  color: var(--nerflixx-red);
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 25px;
}

.minimal-mode {
  position: sticky;
  background: white !important;
  border-bottom: 1px solid #e6e6e6;
  height: 90px;
}

.minimal-mode .logo {
  font-size: 2.2rem;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
  color: #e5e5e5;
  font-size: 0.85rem;
  padding: 0;
}

.nav-links li {
  cursor: pointer;
  transition: color 0.3s;
}

.nav-links li:hover { color: #b3b3b3; }
.nav-links li.active { font-weight: bold; color: white; }

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.search-input {
  background: rgba(0,0,0,0.7);
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  outline: none;
  width: 200px;
}

.nav-item {
  margin-left: 20px;
  cursor: pointer;
  color: white;
}

.nav-avatar {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 20px;
}

.profile-menu {
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  cursor: pointer;
  color: white;
}

.dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: rgba(0,0,0,0.9);
  border: 1px solid #333;
  width: 180px;
  display: none;
  flex-direction: column;
  padding: 10px 0;
}

.profile-menu:hover .dropdown { display: flex; }

.dropdown-item {
  padding: 10px 15px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.dropdown-item:hover { background: rgba(255,255,255,0.1); }

hr { border: 0; border-top: 1px solid #333; margin: 5px 0; }
</style>
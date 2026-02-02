<template>
  <nav :class="['main-nav', { 'nav-black': isScrolled }]">
    <div class="nav-left">
      <h1 class="logo">NERFLIXX</h1>
      <ul class="nav-links">
        <li class="active">Inicio</li>
        <li>Series</li>
        <li>Películas</li>
        <li>Novedades populares</li>
        <li>Mi lista</li>
      </ul>
    </div>

    <div class="nav-right">
      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
      </div>
      <span class="nav-item">Niños</span>
      <i class="fas fa-bell nav-item"></i>
      
      <div class="profile-menu">
        <img :src="profileAvatar" alt="Profile" class="nav-avatar" />
        <i class="fas fa-caret-down"></i>
        
        <div class="dropdown">
          <div class="dropdown-item">
            <img :src="profileAvatar" alt="p" />
            <span>{{ profileName }}</span>
          </div>
          <hr />
          <div class="dropdown-item" @click="handleLogout">
            Cerrar sesión en Nerflixx
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } });
  }
};
</script>

<template>
  <div class="search-box">
    <input 
      v-model="searchQuery" 
      @keyup.enter="handleSearch"
      placeholder="Títulos, personas, géneros" 
    />
    <i class="fas fa-search" @click="handleSearch"></i>
  </div>
</template>

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
    background-color: var(--nerflixx-black);
}

.nav-left, .nav-right {
    display: flex;
    align-items: center;
}

.logo {
    color: var(--nerflixx-red);
    font-size: 1.8rem;
    margin-right: 25px;
    cursor: pointer;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
    color: #e5e5e5;
    font-size: 0.85rem;
}

.nav-links li {
    cursor: pointer;
    transition: color 0.3s;
}

.nav-links li:hover { 
    color: #b3b3b3; 
}

.nav-links li.active { 
    font-weight: bold; 
    color: white; 
}

.nav-right { 
    gap: 20px; 
    color: white; 
}

.nav-item { 
    cursor: pointer; 
    font-size: 0.9rem; 
}

.nav-avatar {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
}

.profile-menu {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    cursor: pointer;
}

/* Dropdown Logic */
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

.profile-menu:hover .dropdown {
    display: flex;
}

.dropdown-item {
    padding: 10px 15px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.dropdown-item img { 
    width: 25px; 
    border-radius: 4px; 
}

.dropdown-item:hover { 
    background-color: rgba(255,255,255,0.1); 
}

hr { 
    border: 0; 
    border-top: 1px solid #333; 
    margin: 10px 0; 
}
</style>
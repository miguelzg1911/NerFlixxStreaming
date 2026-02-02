<template>
  <div class="profiles-gate">
    <div class="list-profiles">
      <h1 class="profile-title">¿Quién está viendo ahora?</h1>
      
      <div class="profile-cards">
        <div 
          v-for="profile in profiles" 
          :key="profile.id" 
          class="profile-card"
          @click="selectProfile(profile)"
        >
          <div class="avatar-box">
            <img :src="profile.avatarUrl || defaultAvatar" alt="avatar" />
          </div>
          <span class="profile-name">{{ profile.name }}</span>
        </div>

        <div class="profile-card add-profile">
          <div class="avatar-box plus-icon">
            <span>+</span>
          </div>
          <span class="profile-name">Añadir perfil</span>
        </div>
      </div>

      <button class="manage-profiles">ADMINISTRAR PERFILES</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { profileService } from '@/services/profilesService';
import type { Profile } from '@/types/types';

const router = useRouter();
const profiles = ref<Profile[]>([]);
const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

onMounted(async () => {
  try {
    profiles.value = await profileService.getUserProfiles();
  } catch (err) {
    console.error("Error cargando perfiles:", err);
    // Si el token expiró o no hay, de vuelta al login
    router.push('/login');
  }
});

const selectProfile = (profile: Profile) => {
  localStorage.setItem('selectedProfileId', profile.id);
  localStorage.setItem('selectedProfileName', profile.name);
  router.push('/'); // Vamos al Home (Catálogo)
};
</script>

<style scoped>
.profiles-gate {
  background: var(--nerflixx-black);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.list-profiles { 
  text-align: center; 
  max-width: 80%; 
}

.profile-title {
  font-size: 3.5vw;
  font-weight: 500;
  margin-bottom: 30px;
}

.profile-cards {
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin-bottom: 50px;
}

.profile-card {
  width: 10vw;
  min-width: 120px;
  cursor: pointer;
}

.avatar-box {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  border: 3px solid transparent;
  transition: border 0.2s, transform 0.2s;
  background-color: #333;
}

.profile-card:hover .avatar-box {
  border-color: white;
  transform: scale(1.05);
}

.profile-card:hover .profile-name {
  color: white;
}

img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
}

.profile-name {
  display: block;
  margin-top: 15px;
  color: grey;
  font-size: 1.3vw;
  transition: color 0.2s;
}

.plus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: grey;
}

.manage-profiles {
  background: transparent;
  border: 1px solid grey;
  color: grey;
  padding: 10px 30px;
  letter-spacing: 2px;
  cursor: pointer;
  font-size: 1.1rem;
}

.manage-profiles:hover {
  border-color: white;
  color: white;
}
</style>
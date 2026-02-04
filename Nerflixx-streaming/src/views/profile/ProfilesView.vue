<template>
  <div class="profiles-gate">
    <div v-if="!isCreating" class="list-profiles">
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

        <div class="profile-card add-profile" @click="isCreating = true">
          <div class="avatar-box plus-icon">
            <span>+</span>
          </div>
          <span class="profile-name">Añadir perfil</span>
        </div>
      </div>

      <div class="actions-container">
        <button class="manage-profiles">ADMINISTRAR PERFILES</button>
      </div>
    </div>

    <div v-else class="create-profile-container">
      <h1 class="form-title">Añadir perfil</h1>
      <p class="form-subtitle">Añade un perfil para otra persona que ve Nerflixx.</p>
      
      <div class="form-body">
        <div class="form-avatar-wrapper">
          <img :src="defaultAvatar" class="form-avatar" alt="avatar" />
        </div>
        
        <div class="inputs-group">
          <input 
            v-model="newProfileName" 
            type="text" 
            placeholder="Nombre" 
            class="profile-input"
          />
          <label class="kids-checkbox">
            <input type="checkbox" v-model="isKids" />
            <span>¿Es un perfil de niños?</span>
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn-continue" @click="handleCreate">CONTINUAR</button>
        <button class="btn-cancel" @click="cancelCreation">CANCELAR</button>
      </div>
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

const isCreating = ref(false);
const newProfileName = ref('');
const isKids = ref(false);

onMounted(async () => {
  await loadProfiles();
});

const loadProfiles = async () => {
  try {
    profiles.value = await profileService.getUserProfiles();
  } catch (err) {
    console.error("Error cargando perfiles:", err);
    router.push('/login');
  }
};

const handleCreate = async () => {
  if (!newProfileName.value) return;
  try {
    await profileService.createProfile(newProfileName.value, isKids.value);
    cancelCreation();
    await loadProfiles();
  } catch (err) {
    alert("Error al crear el perfil.");
  }
};

const cancelCreation = () => {
  isCreating.value = false;
  newProfileName.value = '';
  isKids.value = false;
};

const selectProfile = (profile: Profile) => {
  localStorage.setItem('selectedProfileId', profile.id);
  localStorage.setItem('selectedProfileName', profile.name);
  localStorage.setItem('selectedProfileIsKids', String(profile.isKids));
  router.push('/');
};
</script>

<style scoped>
.profiles-gate {
  background: #141414;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.list-profiles {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.profile-title {
  font-size: 3.5vw;
  margin-bottom: 2rem;
  font-weight: 500;
}

.profile-cards {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2vw;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.profile-card {
  width: 10vw;
  min-width: 120px;
  max-width: 200px;
  text-align: center;
  cursor: pointer;
}

.avatar-box {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  border: 3px solid transparent;
  transition: border 0.3s, transform 0.3s;
  background: #333;
}

.profile-card:hover .avatar-box {
  border-color: white;
  transform: scale(1.05);
}

.profile-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name {
  display: block;
  margin-top: 15px;
  color: #808080;
  font-size: 1.2vw;
  transition: color 0.3s;
}

.profile-card:hover .profile-name {
  color: white;
}

.plus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5vw;
  color: #808080;
}

.actions-container {
  margin-top: 2rem;
}

.manage-profiles {
  background: transparent;
  border: 1px solid #808080;
  color: #808080;
  padding: 0.5em 1.5em;
  font-size: 1.2vw;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.manage-profiles:hover {
  border-color: white;
  color: white;
}

.create-profile-container {
  max-width: 600px;
  width: 90%;
}

.form-title { font-size: 4rem; margin-bottom: 0.5rem; }
.form-subtitle { color: #666; margin-bottom: 2rem; }

.form-body {
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  margin-bottom: 2rem;
}

.form-avatar { width: 120px; height: 120px; border-radius: 4px; }

.inputs-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-input {
  background: #666;
  border: none;
  padding: 10px;
  color: white;
  font-size: 1.2rem;
}

.btn-continue {
  background: white;
  color: black;
  padding: 10px 25px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #666;
  color: #666;
  padding: 10px 25px;
  cursor: pointer;
}
</style>
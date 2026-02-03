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

      <button class="manage-profiles">ADMINISTRAR PERFILES</button>
    </div>

    <div v-else class="create-profile-container">
      <h1 class="form-title">Añadir perfil</h1>
      <p class="form-subtitle">Añade un perfil para otra persona que ve Nerflixx.</p>
      
      <div class="form-body">
        <div class="avatar-box form-avatar">
          <img :src="defaultAvatar" alt="avatar" />
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

// Variables para la creación
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
    // Usamos el servicio pasándole el nombre y si es niño
    await profileService.createProfile(newProfileName.value, isKids.value);
    cancelCreation(); // Limpia y vuelve a la lista
    await loadProfiles(); // Recarga los perfiles para ver el nuevo
  } catch (err) {
    alert("Error al crear el perfil. Revisa la consola.");
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
  router.push('/');
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

.create-profile-container {
  text-align: left;
  width: 100%;
  max-width: 600px;
  animation: fadeIn 0.3s ease;
}

.form-title { font-size: 4rem; margin-bottom: 10px; }
.form-subtitle { color: #666; font-size: 1.2rem; margin-bottom: 20px; }

.form-body {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 30px 0;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  margin-bottom: 30px;
}

.form-avatar { width: 120px; height: 120px; }

.inputs-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
}

.profile-input {
  background: #666;
  border: none;
  padding: 12px;
  color: white;
  font-size: 1.1rem;
  border-radius: 2px;
}

.kids-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1.1rem;
}

.form-actions { display: flex; gap: 20px; }

.btn-continue {
  background: white;
  color: black;
  border: none;
  padding: 12px 30px;
  font-weight: bold;
  cursor: pointer;
}

.btn-continue:hover { background: #e50914; color: white; }

.btn-cancel {
  background: transparent;
  border: 1px solid #666;
  color: #666;
  padding: 12px 30px;
  cursor: pointer;
}

.btn-cancel:hover { border-color: white; color: white; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
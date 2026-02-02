<template>
  <div class="input-group">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :class="['ner-input', theme]"
      required
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder: string;
  type?: string;
  theme?: 'dark' | 'light';
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-group { width: 100%; margin-bottom: 15px; }

.ner-input {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

/* Para el Login (Oscuro) */
.dark { background: #333; border: none; color: white; }

/* Para el Registro (Claro) */
.light { background: white; border: 1px solid #8c8c8c; color: #333; }

.ner-input:focus { outline: 2px solid #000; }
</style>
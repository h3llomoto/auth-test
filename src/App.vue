<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import LoadingIcon from '@/components/LoadingIcon.vue';

const userStore = useUserStore();

</script>

<template>
  <div
    v-if="userStore.isLoading"
    class="loading"
  >
    <LoadingIcon />
  </div>
  <RouterView v-else />
</template>

<style scoped>

</style>

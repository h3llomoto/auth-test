<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore(); 
</script>

<template>
  <main>
    <div class="user">
      {{ userStore.user!.fName }}
    </div>
  </main>
</template>

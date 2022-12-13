<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
const router = useRouter();
const userStore = useUserStore();

function handleLogout(e: MouseEvent) {
  e.preventDefault();

  userStore.logout();
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="user wrapper">
    <div class="title">
      Профиль пользователя {{ userStore.user?.login }}
    </div>
    <div class="user-card">
      <div class="user-card_cell">
        <label for="login">
          Логин
        </label>
        <input
          name="login"
          :value="userStore.user?.login"
          disabled
        />
      </div>
      <div class="user-card_cell">
        <label for="password">
          Пароль
        </label>
        <input
          name="password"
          :value="userStore.user?.password"
          disabled
        />
      </div>
      <div class="user-card_cell">
        <label for="name">
          ФИО
        </label>
        <input
          name="name"
          :value="userStore.user?.name"
          disabled
        />
      </div>
      <div class="user-card_cell">
        <label for="birthday">
          Дата рождения
        </label>
        <input
          name="birthday"
          :value="userStore.user?.birthday"
          disabled
        />
      </div>
    </div>
    <button
      @click="handleLogout"
    >
      Log out
    </button>
  </div>
</template>

<style scoped lang="scss">
.user {
  background-color: var(--color-background-soft);
}
.user-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 -7px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  &_cell {
    padding: 0 7px 15px;
  }
}
</style>
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore';
import LoginView from '@/views/LoginView.vue';
import UserView from '@/views/UserView.vue';

enum RouteName {
  Login = 'login',
  User = 'user',
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Login,
      component: LoginView,
    },
    {
      path: '/user',
      name: RouteName.User,
      component: UserView,
    },
  ],
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  await userStore.getUser();

  const { isAuth } = userStore;

  if (isAuth && to.name === RouteName.Login) {
    return { name: RouteName.User };
  } else if (!isAuth && to.name === RouteName.User) {
    return { name: RouteName.Login };
  }

});

export default router;

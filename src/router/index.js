import { createRouter, createWebHistory } from 'vue-router'
import menu from '@/router/menu.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:menu
});

export default router

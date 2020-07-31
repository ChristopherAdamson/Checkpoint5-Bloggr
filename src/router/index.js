import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import Profile from "../pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: '/cooking',
    name: 'Cooking',
    // @ts-ignore
    component: () => import(/* webpackChunkName: "Cooking" */ '../pages/Cooking.vue')
  },
  {
    path: '/gaming',
    name: 'Gaming',
    // @ts-ignore
    component: () => import(/* webpackChunkName: "Gaming" */ '../pages/Gaming.vue')
  },
  {
    path: '/books',
    name: 'Books',
    // @ts-ignore
    component: () => import(/* webpackChunkName: "Books" */ '../pages/Books.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    // @ts-ignore
    component: () => import(/* webpackChunkName: "Blog" */ '../pages/blogDetails.vue')
  },
];

const router = new VueRouter({
  routes,
});

export default router;

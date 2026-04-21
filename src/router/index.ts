import { createRouter, createWebHistory } from "vue-router";
import StarterHomeView from "@/views/StarterHomeView.vue";
import ModuleTemplateView from "@/views/ModuleTemplateView.vue";
import FormDemoView from "@/views/FormDemoView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: StarterHomeView,
    },
    {
      path: "/module-template",
      name: "module-template",
      component: ModuleTemplateView,
    },
    {
      path: "/form-demo",
      name: "form-demo",
      component: FormDemoView,
    },
  ],
});

export default router;

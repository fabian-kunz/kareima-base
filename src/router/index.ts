import { createRouter, createWebHistory } from "vue-router";
import StarterHomeView from "@/views/StarterHomeView.vue";
import ModuleTemplateView from "@/views/ModuleTemplateView.vue";
import TableShowcaseView from "@/views/TableShowcaseView.vue";
import InteractionDemoView from "@/views/InteractionDemoView.vue";
import InputsShowcaseView from "@/views/InputsShowcaseView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: StarterHomeView,
    },
    {
      path: "/guide",
      name: "guide",
      component: ModuleTemplateView,
    },
    {
      path: "/table-showcase",
      name: "table-showcase",
      component: TableShowcaseView,
    },
    {
      path: "/interaction-demo",
      name: "interaction-demo",
      component: InteractionDemoView,
    },
    {
      path: "/inputs-showcase",
      name: "inputs-showcase",
      component: InputsShowcaseView,
    },
  ],
});

export default router;

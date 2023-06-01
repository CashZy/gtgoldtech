<template>
  <div
    class="fixed left-0 z-10 right-0 bottom-0 grid grid-cols-4 items-center bg-white max-width mx-auto"
    :style="{ height: '52px' }"
  >
    <NuxtLink
      v-for="(tab, i) in tabs"
      :key="i"
      :to="tab.route"
      class="flex flex-col items-center justify-center text-light"
      active-class="text-primary"
    >
      <img
        :src="route.path == tab.route ? tab.activeImage : tab.image"
        :style="{ width: '25px' }"
      />
      <p class="text-xs">{{ tab.title }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
import home_tab from "../../../assets/images/layouts/default/home-tab.png";
import home_tab_active from "../../../assets/images/layouts/default/home-tab-active.png";
import product_tab from "../../../assets/images/layouts/default/product-tab.png";
import product_tab_active from "../../../assets/images/layouts/default/product-tab-active.png";
import flop_game_tab from "../../../assets/images/layouts/default/flop-game-tab.png";
import flop_game_tab_active from "../../../assets/images/layouts/default/flop-game-tab-active.png";
import me_tab from "../../../assets/images/layouts/default/me-tab.png";
import me_tab_active from "../../../assets/images/layouts/default/me-tab-active.png";
const route = useRoute();
const tabs = ref([
  { title: "Home", image: home_tab, activeImage: home_tab_active, route: "/" },
  {
    title: "Product",
    image: product_tab,
    activeImage: product_tab_active,
    route: "/product",
  },
  {
    title: "Flop Game",
    image: flop_game_tab,
    activeImage: flop_game_tab_active,
    route: "/flop-game",
  },
  { title: "Me", image: me_tab, activeImage: me_tab_active, route: "/user" },
]);
</script>

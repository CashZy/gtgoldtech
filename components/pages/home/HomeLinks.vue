<template>
  <div>
    <div class="flex items-center space-x-10 my-5">
      <NuxtLink
        to="/recharge"
        class="grow flex items-center justify-center bg-red-500 text-white rounded-lg space-x-2"
        :style="{ height: '52px' }"
      >
        <img :src="recharge_icon" alt="" class="w-8" />
        <p class="text-lg font-semibold">Recharge</p>
      </NuxtLink>
      <NuxtLink
        to="/withdraws"
        class="grow flex items-center justify-center bg-green-700 text-white rounded-lg space-x-2"
        :style="{ height: '52px' }"
      >
        <img :src="withdraws_icon" alt="" class="w-8" />
        <p class="text-lg font-semibold">Withdraws</p>
      </NuxtLink>
    </div>
    <div class="grid grid-cols-4 gap-5">
      <NuxtLink
        v-for="(link, i) in links"
        :key="i"
        :to="link.route"
        class="flex flex-col items-center justify-start space-y-2"
        @click="onClickLink(i)"
      >
        <img
          :src="link.image"
          :style="{
            width: '67px',
          }"
          alt=""
        />
        <p class="text-xs text-white text-center">{{ link.title }}</p>
      </NuxtLink>
    </div>
  </div>

  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    cancel-text="Close"
    close-on-click-action
    @cancel="show = false"
  />
</template>

<script setup>
import recharge_icon from "../../../assets/images/pages/home/recharge-icon.png";
import withdraws_icon from "../../../assets/images/pages/home/withdraws-icon.png";

import gift_icon from "../../../assets/images/pages/home/gift-icon.png";
import invitation_icon from "../../../assets/images/pages/home/invitation-icon.png";
import teams_icon from "../../../assets/images/pages/home/teams-icon.png";
import projects_icon from "../../../assets/images/pages/home/projects-icon.png";
import service_icon from "../../../assets/images/pages/home/service-icon.png";
import download_icon from "../../../assets/images/pages/home/download-icon.png";
import money_icon from "../../../assets/images/pages/home/money-icon.png";
import check_icon from "../../../assets/images/pages/home/check-icon.png";

const links = ref([
  { title: "Gift Redemption", image: gift_icon, route: "/gift/redPack" },
  { title: "Invitation", image: invitation_icon, route: "/share" },
  { title: "My Teams", image: teams_icon, route: "/user/team" },
  { title: "My Projects", image: projects_icon, route: "/product/order" },
  {
    title: "Customer Service",
    image: service_icon,
    route: "/",
    showPicker: true,
  },
  { title: "App Download", image: download_icon, route: "/appff" },
  { title: "Money Making Tasks", image: money_icon, route: "/news/1" },
  { title: "Check Ins", image: check_icon, route: "/user/signin" },
]);

const show = ref(false);
const actions = [{ name: "+919522293670", disabled: true }];

const onClickLink = (i) => {
  if (i == 4) {
    show.value = true;
  }
};
</script>

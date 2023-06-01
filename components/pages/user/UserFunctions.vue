<template>
  <div class="bg-white rounded-lg p-3">
    <h2 class="text-lg font-medium">Common Functions</h2>

    <div class="grid grid-cols-3 gap-3">
      <NuxtLink
        v-for="(link, i) in links"
        :key="i"
        class="flex flex-col items-center justify-center space-y-1"
        :to="link.route"
      >
        <img :src="link.image" :style="{ width: '34px' }" alt="" />
        <p class="text-xs text-[#333]">{{ link.title }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import projects_icon from "~/assets/images/pages/user/projects-icon.png";
import coupon_icon from "~/assets/images/pages/user/coupon-icon.png";
import funding_icon from "~/assets/images/pages/user/funding-icon.png";
import bind_bank_icon from "~/assets/images/pages/user/bind-bank-icon.png";
import invitation_icon from "~/assets/images/pages/user/invitation-icon.png";
import gift_icon from "~/assets/images/pages/user/gift-icon.png";
import teams_icon from "~/assets/images/pages/user/teams-icon.png";
import agent_icon from "~/assets/images/pages/user/agent-icon.png";
import office_icon from "~/assets/images/pages/user/office-icon.png";
const links = ref([
  { title: "My Projects", image: projects_icon, route: "/product/order" },
  { title: "Coupon", image: coupon_icon, route: "/coupon" },
  { title: "Funding Details", image: funding_icon, route: "/funding" },
  { title: "Bind Bank Account", image: bind_bank_icon, route: "/setting/bank" },
  { title: "Invitation", image: invitation_icon, route: "/share" },
  { title: "Gift Redemption", image: gift_icon, route: "/gift/redPack" },
  { title: "My Teams", image: teams_icon, route: "/user/team" },
  { title: "Agent Inverstment", image: agent_icon, route: "/news/1" },
  { title: "Office Email", image: office_icon, route: "/news/1" },
]);
</script>

<template>
  <div class="relative overflow-y-auto h-[92vh]">
    <NuxtLink to="/setting" class="absolute right-3 top-5"
      ><img :src="settings_icon" :style="{ width: '30px' }" alt=""
    /></NuxtLink>
    <AdminDrawer />
    <div class="px-3 space-y-3">
      <UserProfile />
      <UserWallet />
      <UserTeamCommision />
      <UserFunctions />
    </div>
  </div>
</template>

<script setup>
import UserProfile from "~/components/pages/user/UserProfile.vue";
import UserWallet from "~/components/pages/user/UserWallet.vue";
import UserTeamCommision from "~/components/pages/user/UserTeamCommision.vue";
import UserFunctions from "~/components/pages/user/UserFunctions.vue";
import AdminDrawer from "~/components/pages/user/AdminDrawer.vue";
import settings_icon from "~/assets/images/common/settings-icon.png";

definePageMeta({
  layout: "tabs",
});
</script>

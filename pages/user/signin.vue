<template>
  <div
    class="h-full bg-cover bg-bottom"
    :style="{ backgroundImage: `url(${signin_bg})` }"
  >
    <PageHeader title="Check Ins" />

    <div class="flex items-center justify-center my-4">
      <van-image :src="signin_image" width="92px" alt="" />
    </div>

    <div class="px-3 space-y-4">
      <div class="bg-white rounded flex items-center justify-around p-2">
        <div class="flex flex-col items-center justify-center">
          <h3 class="text-sm">Comulative Check-ins</h3>
          <p class="text-primary text-xl font-medium">0</p>
        </div>
        <div class="w-[1px] h-10 bg-opacity-25 bg-light shrink-0"></div>
        <div class="flex flex-col items-center justify-center">
          <h3 class="text-sm">Remaining Check-ins</h3>
          <p class="text-primary text-xl font-medium">0</p>
        </div>
      </div>

      <div class="bg-white rounded p-2">
        <h3 class="font-bold text-lg mb-2">Sign-in task description:</h3>
        <div class="text-[#666] space-y-2">
          <p>
            Invite friends to join successfully, you can click 【Check in】✅
            once.
          </p>
          <p>To upgrade a product item, you can click 【Check in】✅ once.</p>
          <p>Sign in 3 times in a row to get 1 flop game lucky draw 🎁.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import signin_image from "~/assets/images/pages/user/signin.png";
import signin_bg from "~/assets/images/pages/user/signin-bg.jpg";
</script>

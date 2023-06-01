<template>
  <div class="h-full bg-[#fff4e6]">
    <div
      class="px-4 space-y-4 bg-left-top bg-cover"
      :style="{ backgroundImage: `url(${bg})`, backgroundPosition: '0 -35px' }"
    >
      <div class="h-32"></div>
      <h1
        class="text-[35px] text-[#e97c41] font-bold text-center"
        :style="{
          textShadow:
            '-2px 2px 0 #fff, 2px 2px 0 #fff, 2px -2px 0 #fff, -2px -2px 0 #fff',
        }"
      >
        Remaining times: 0
      </h1>

      <div class="grid grid-cols-4 gap-3 px-2">
        <div v-for="box in 8" :key="box">
          <img :src="card" alt="" />
        </div>
      </div>

      <p>
        Lucky Draw Rules:<br />
        <br />
        1: New members who join any planting project can get 1 lucky draw
        chance<br />
        <br />
        2: Invite friends to join, you can get 1 lucky draw chance<br />
        <br />
        3: Manual random draw, the prizes won will be automatically distributed
        to your account
      </p>
    </div>
  </div>
</template>

<script setup>
import bg from "~/assets/images/pages/flop-game/bg.jpg";
import card from "~/assets/images/pages/flop-game/card.png";

definePageMeta({
  layout: "tabs",
});
</script>

<template>
  <div class="flex items-center justify-center my-10">
    <van-image width="125px" height="125px" :src="logo" />
  </div>

  <div class="px-3">
    <slot />
  </div>
</template>

<script setup>
import logo from "~/assets/images/common/logo.png";
</script>

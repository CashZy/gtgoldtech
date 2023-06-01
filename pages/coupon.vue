<template>
  <PageHeader title="My Coupon" />

  <van-tabs v-model:active="active">
    <van-tab
      v-for="(tab, i) in tabs"
      :title="tab"
      title-inactive-color="#000"
      title-active-color="#fff"
    >
      <div class="p-5">
        <div class="my-3 text-sm text-white flex items-center justify-center">
          <p>No More</p>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
const tabs = ["Unused", "Used", "Expired"];
const active = ref(0);
</script>

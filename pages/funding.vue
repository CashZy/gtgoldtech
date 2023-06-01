<template>
  <PageHeader title="Funding Details" />

  <van-tabs v-model:active="active">
    <van-tab
      v-for="(tab, i) in tabs"
      :title="tab"
      title-inactive-color="#000"
      title-active-color="#fff"
    >
      <div class="p-5">
        <div
          class="bg-white rounded-lg text-black flex items-center justify-around p-3 text-sm pb-5"
        >
          <h3>Time</h3>
          <h3>Amount</h3>
          <h3>Remark</h3>
        </div>

        <div class="my-3 text-sm text-white flex items-center justify-center">
          <p>No More</p>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
const tabs = ["Recharge", "Withdraws", "Other"];
const active = ref(0);
</script>

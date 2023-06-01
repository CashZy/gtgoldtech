<template>
  <PageHeader title="Order Details" />
  <div class="my-5">
    <van-cell-group inset>
      <van-field
        v-for="(inf, i) in info"
        :label="inf.title"
        label-class="!text-right"
        :key="i"
        v-model="inf.value"
        readonly
      >
        {{ inf.value }}
      </van-field>
    </van-cell-group>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";

const info = ref([
  { title: "Order Number", value: "3ba7dff2d6989106" },
  { title: "Amount", value: "550" },
  { title: "Payment Method", value: "Online Payment" },
  { title: "Order Time", value: "04-14 13:46:16" },
  { title: "Status", value: "Waiting Payment" },
]);
</script>

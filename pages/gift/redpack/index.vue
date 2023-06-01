<template>
  <PageHeader
    title="Gift Reemption"
    right-text="Records"
    right-route="/gift/redPack/record"
  />

  <div class="my-5 mx-3 rounded-lg bg-white px-2 py-1 border !border-secondary">
    <van-field
      v-model="code"
      label="Code"
      placeholder="Please Enter The Red Envelop Code"
    ></van-field>

    <div class="mx-5 my-3">
      <van-button
        class="!bg-secondary !text-white !border-secondary !rounded-full !h-10 !w-full"
        >Recieve</van-button
      >
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
const code = ref("");
</script>

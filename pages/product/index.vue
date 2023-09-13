<template>
  <div>
    <PageHeader title="Plan Project Area" back-route="/" />
    <!--    <van-tabs v-model:active="active" back-route="/">-->
    <!--      <van-tab v-for="(tab, i) in tabs" :title="tab">-->
    <div class="grid overflow-y-auto h-[84vh] grid-cols-2 gap-3 my-3 mx-3">
      <div v-for="(n, i) in products" :key="i">
        <ProductsWidget :product="n" />
      </div>
    </div>
    <!--      </van-tab>-->
    <!--    </van-tabs>-->
  </div>
</template>

<script setup>
import ProductsWidget from "../../components/pages/product/ProductsWidget.vue";
import PageHeader from "~/components/pages/PageHeader.vue";
const tabs = ref(["fruit area"]);
const active = ref(0);

const { data: products } = await useFetch("/api/products");

definePageMeta({
  layout: "tabs",
});
</script>

<style></style>

import ProductHeader from '~/components/pages/product/ProductHeader.vue';

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <ProductHeader />
    <div class="grow overflow-auto pb-16">
      <ProductWidget :product="product"/>
    </div>
  </div>
  <ProductBuyButton :product="product"/>
</template>

<script setup>
import ProductHeader from "~/components/pages/product/ProductHeader.vue";
import ProductBuyButton from "~/components/pages/product/ProductBuyButton.vue";
import ProductWidget from "~/components/pages/product/ProductWidget.vue";

const route = useRoute();
const { id } = route.params;
const { data: product, error } = await useFetch(`/api/products/${id}`);
console.log(error);
</script>

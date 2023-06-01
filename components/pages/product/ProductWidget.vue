<template>
  <div class="mx-3 space-y-3">
    <van-swipe
      class="rounded-lg overflow-hidden"
      :autoplay="2000"
      indicator-color="black"
    >
      <van-swipe-item v-for="slide in 3" :key="slide">
        <van-image
            v-if="product.image"
            :src="`/uploads/products/${product.image}`"
        />
        <van-image v-else :src="product_image" />
      </van-swipe-item>
    </van-swipe>

    <div class="bg-[#00000066] p-2 rounded-lg text-white">
      <h2 class="text-center text-lg font-semibold">{{ product.title }}</h2>
      <div class="grid grid-cols-3 gap-3 mt-2">
        <div class="flex flex-col items-center justify-center">
          <p class="text-primary">₹{{ product.price }}.00</p>
          <p class="text-sm">Price</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-primary">{{ product.days }} Days</p>
          <p class="text-sm">Term</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-primary">₹{{ product.dayProfit }}</p>
          <p class="text-sm">Daily Income</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-primary">₹{{ product.totalRevenue }}</p>
          <p class="text-sm">Total Revenue</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-primary">{{ product.rate }}%</p>
          <p class="text-sm">Daily Rate</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-primary">{{ product.quantity }}</p>
          <p class="text-sm">Quantity Limit</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-3 text-light text-sm">
      <h3 class="text-black font-semibold">Project Description</h3>
      <div v-html="product.content"></div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
import product_image from "~/assets/images/pages/product/product.jpg";
</script>

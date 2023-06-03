<template>
  <div class="bg-[#00000066] p-2 rounded-lg text-white space-y-1">
    <van-image
      v-if="product.image"
      :src="`/uploads/products/${product.image}`"
      class="rounded-lg"
      :style="{ height: '250px', width: '100%' }"
    />
    <h2 class="font-medium">{{ product.title }}</h2>
    <p class="text-xs">
      Price: <span class="text-primary">₹{{ product.price }}.00</span>
    </p>
    <p class="text-xs">
      Term: <span class="text-primary">{{ product.days }} days</span>
    </p>
    <p class="text-xs">
      Daily Income: <span class="text-primary">₹{{ product.dayProfit }}</span>
    </p>
    <p class="text-xs">
      Total Revenue:
      <span class="text-primary">₹{{ product.totalRevenue }}</span>
    </p>

    <div class="h-3 w-full bg-white rounded-full !my-2"></div>
    <NuxtLink
      :to="`/product/${product.id}`"
      class="bg-primary text-white rounded-lg py-1.5 w-full flex items-center justify-center font-medium"
    >
      View Project
    </NuxtLink>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
// import product_image from "../../../assets/images/pages/product/product.jpg";
</script>

<template>
  <NuxtLink
    :to="`/news/${news.slug}`"
    class="flex justify-between bg-white rounded p-2 text-sm"
  >
    <div class="flex flex-col justify-between">
      <h2>{{ news.title }}</h2>
      <p>{{ format(new Date(news.createdAt), "yyyy-MM-dd") }}</p>
    </div>
    <van-image
      v-if="news.image"
      :src="`/uploads/news/${news.image}`"
      :style="{ height: '100px', width: '100px' }"
    />
  </NuxtLink>
</template>

<script setup>
const { news } = defineProps(["news"]);
import { format } from "date-fns";
</script>

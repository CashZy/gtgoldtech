<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Detail" />
    <div v-if="error" class="p-5 flex items-center justify-center text-white">
      <p>News Not Found</p>
    </div>
    <div v-else class="grow overflow-auto py-2 px-3 space-y-2">
      <h1 class="text-3xl font-semibold">{{ news.title }}</h1>
      <p class="text-xs text-white">
        News {{ format(new Date(news.createdAt), "yyyy-MM-dd") }}
      </p>

      <div v-html="news.body"></div>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import PageHeader from "~/components/pages/PageHeader.vue";

const route = useRoute();
const { slug } = route.params;
const { data: news, error } = await useFetch(`/api/news/${slug}`);
console.log(error);
</script>

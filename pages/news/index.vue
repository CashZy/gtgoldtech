<template>
  <div class="flex flex-col h-full">
    <PageHeader title="News" back-route="/" />

    <div class="grow h-full overflow-auto py-2 space-y-3 px-3 bg-[#f6f6f6]">
      <div v-for="(n, i) in news" :key="i">
        <NewsWidget :news="n" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import NewsWidget from "~/components/pages/news/NewsWidget.vue";

const { data: news } = await useFetch("/api/news");
</script>

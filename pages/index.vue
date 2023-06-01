<template>
  <div class="mx-3 h-full flex flex-col">
    <PagesHomeHeader />
    <div class="grow overflow-y-auto pb-14">
      <PagesHomeVideo />
      <PagesHomeNotifications />
      <PagesHomeLinks />
      <PagesHomeNews />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "tabs",
});
</script>

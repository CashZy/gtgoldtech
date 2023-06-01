<template>
  <div class="h-full bg-white overflow-y-auto">
    <div class="p-5">
      <div class="flex my-2 space-x-5">
        <van-image :src="logo" width="110px" class="shrink-0" alt="" />
        <div class="grow">
          <h2 class="text-xl font-semibold mb-1">Crystal</h2>
          <p class="text-[#8a8a90] text-sm mb-3">Application size：3M</p>
          <div class="flex items-center justify-end mb-1">
            <div
              class="w-5 h-5 bg-[#0477f9] rounded-full text-white flex items-center justify-center mr-1 text-xs"
            >
              ?
            </div>
            <p class="text-xs text-[#0477f9]">Safety certification</p>
          </div>
          <div>
            <van-button
              class="!bg-[#0477f9] !border-[#0477f9] !text-white !text-sm !rounded-full !h-7"
              >Free Installation</van-button
            >
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mt-2">
        <div class="grow">
          <div class="flex items-center space-x-1">
            <p class="text-sm text-[#8e8f92] font-semibold">4.99</p>
            <van-image :src="stars" width="80px" />
          </div>
          <p class="text-xs text-[#8d8d8d] text-opacity-30">9,999 scores</p>
        </div>
        <div class="shrink-0 flex flex-col items-center justify-center">
          <p class="text-sm text-[#8e8f92]">
            <span class="font-semibold">4</span>
            <span>+</span>
          </p>
          <p class="text-xs text-[#8d8d8d] text-opacity-30">age</p>
        </div>
      </div>

      <van-divider />

      <p
        style="background-color: #e64141; border-radius: 5px"
        class="text-sm p-3 text-white"
      >
        1、After downloading the Android phone, click Install<br />
        2、Click Install to return to the desktop. If the download is complete,
        click settings &gt;&gt; General &gt;&gt; Description File &gt;&gt;
        DOLE&gt;&gt;install
      </p>

      <van-divider />

      <h2 class="text-lg font-semibold mb-2">Brief Introduction</h2>
      <h2 class="text-sm mb-1">Speed Download</h2>

      <van-divider />

      <h2 class="text-lg font-semibold mb-2">Scroing and Comments</h2>

      <div class="flex justify-between">
        <div>
          <h3 style="font-size: 60px; color: #4a4a4e">4.9</h3>
          <p class="text-xs" style="color: #7b7b7b">Full Score: 5 points</p>
        </div>

        <div class="grow">
          <div v-for="a in 5" :key="a" class="flex items-center space-x-1">
            <div class="relative">
              <van-image :src="stars" width="46px" alt="" />
              <div
                class="absolute inset-0 bg-white"
                :style="{ width: (a - 1) * 9 + 'px' }"
              ></div>
            </div>
            <div class="grow">
              <van-progress
                :percentage="a == 1 ? '90' : a == '2' ? 10 : '0'"
                stroke-width="2"
                color="#000"
                :show-pivot="false"
              />
            </div>
          </div>

          <p class="text-xs text-[#8d8d8d] text-opacity-70 text-right">
            9,999 scores
          </p>
        </div>
      </div>

      <van-divider />

      <h2 class="text-lg font-semibold mb-2">New Function</h2>
      <h2 class="text-sm mb-1">Edition 1.0#</h2>

      <van-divider />

      <h2 class="text-lg font-semibold mb-2">Information</h2>

      <div
        v-for="(a, i) in information"
        :key="i"
        class="flex items-center justify-between text-xs py-3 border-b border-black border-opacity-5"
      >
        <p class="text-[#737379]">{{ a.title }}</p>
        <p>{{ a.value }}</p>
      </div>

      <p class="text-xs text-[#0477f9] my-5">Privacy Policy</p>
    </div>

    <div class="text-xs text-[#999] bg-[#f9f9f9] p-3">
      Disclaimers：<br />
      This website only provides download hosting. The developer is responsible
      for matters related to app content, which has nothing to do with this
      website。
    </div>
  </div>
</template>

<script setup>
import logo from "~/assets/images/common/logo.png";
import stars from "~/assets/images/pages/appff/stars.png";

const information = ref([
  { title: "Seller", value: "" },
  { title: "Size", value: "3M" },
  { title: "Language", value: "en" },
  { title: "Age Qualification", value: "Over 4 years old" },
  { title: "price", value: "free" },
]);
</script>

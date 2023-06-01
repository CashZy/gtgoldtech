<template>
  <div class="bg-white rounded-lg py-3 px-8 space-y-3">
    <div class="flex items-center justify-between text-lg text-[#333]">
      <div class="flex flex-col space-y-0.5 items-center justify-center">
        <p>10%</p>
        <p>B(0)</p>
      </div>
      <div class="flex flex-col space-y-0.5 items-center justify-center">
        <p>5%</p>
        <p>C(0)</p>
      </div>
      <div class="flex flex-col space-y-0.5 items-center justify-center">
        <p>2%</p>
        <p>D(0)</p>
      </div>
    </div>

    <NuxtLink
      to="/rebate"
      class="bg-[#ff976a] text-white py-2 flex items-center justify-center rounded-full w-full"
    >
      Team Commission
    </NuxtLink>
  </div>
</template>

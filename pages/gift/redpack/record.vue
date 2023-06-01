<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Exchange Record" />

    <div class="p-5 grow overflow-y-auto">
      <p class="text-lg font-semibold text-white text-center">Toal: ₹0.00</p>
      <table class="w-full my-3">
        <thead>
          <tr>
            <td class="text-center">Time</td>
            <td class="text-center">Code</td>
            <td class="text-center">Amount</td>
          </tr>
        </thead>
      </table>
      <p class="my-3 text-sm text-white text-center">No More</p>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
</script>

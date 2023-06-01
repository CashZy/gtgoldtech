<template>
  <van-dialog
    v-model:show="modal"
    title="Withdrawal Instructions"
    show-confirm-button
  >
    <div
      style="padding: 0px 6% 1.5rem; word-break: break-all; font-weight: 400"
    >
      <br />
      1: Valid members can apply for withdrawal. The number of withdrawals is
      unlimited. The minimum withdrawal amount is 110rs.<br />
      2: IFSC should be 11 characters and 5th character should be 0. If you fill
      in wrong bank information, your withdrawal will fail.<br />
      3: Withdrawal fee: 6%<br />
      4: Withdrawal time: 1-2 days
    </div>

    <template #footer>
      <div class="px-5 mb-5">
        <van-button
          @click="modal = false"
          class="!bg-primary !rounded-full !text-white !font-medium !border-primary !w-full !h-10"
          >Got it</van-button
        >
      </div>
    </template>
  </van-dialog>
</template>

<script setup>
const modal = ref(true);
</script>

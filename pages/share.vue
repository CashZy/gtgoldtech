<template>
  <div class="h-full flex flex-col">
    <PageHeader title="Invitation" />
    <div class="grow overflow-y-auto px-3">
      <div class="my-4 space-y-2 text-white">
        <p class="text-center">Invitation Code</p>
        <p class="text-lg font-semibold text-center">{{ user?.code }}</p>
      </div>
      <div class="flex items-center justify-center">
        <van-image :src="qrcode" width="220px" />
      </div>

      <div class="flex items-center justify-center my-3">
        <div class="p-2 border border-white rounded text-center text-white">
          {{ `https://dolevip.shop/register/` + user?.code }}
        </div>
      </div>

      <div class="my-3 px-16">
        <van-button
          @click="copyToClipboard"
          class=".btn-copy !bg-[#d65c33] !border !border-[#d65c33] !text-white !w-full !rounded-full !text-lg"
          >Copy Invitation Link</van-button
        >
      </div>

      <div class="text-white" style="margin-top: 1rem">
        <p class="text-lg" style="font-weight: 600">【Invite tips】:</p>
        <p class="text-xs">
          When you invite a friend to join, he belongs to your team B-level
          member, and you can get his 10% commission income<br />
          <br />
          When a B-level member of your team invites his friend to join, his
          friend will become a C-level member of your team, and you can get his
          5% commission income<br />
          <br />
          When a C-level member of your team invites his friend to join, his
          friend will become a D-level member of your team, and you can get his
          2% commission income<br />
          <br />
          10%<br />
          5%<br />
          2%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import qrcode from "~/assets/images/common/qrcode.jpg";
import useAuth from "~/composables/auth/useAuth";
import Clipboard from "clipboard";

//const { data: user } = await useFetch("/api/auth/user");
const { user } = useAuth();
const copyToClipboard = () => {
  const clipboard = new Clipboard(".btn-copy", {
    text: () => `https://www.doleco.land/h5/register/` + user?.value.code,
  });

  clipboard.on("success", (e) => {
    showSuccessToast("Copied Successfully");
    e.clearSelection();
  });

  clipboard.on("error", (e) => {
    console.error("Error copying to clipboard:", e.action);
    showFailToast(e.message);
  });

  clipboard.onClick(event);
};

// const formData = reactive({
//   id: user?.value?.id || "",
//   phone: user?.value?.phone || "",
//   nickname: user?.value?.nickName || "",
//   image: [],
// });

// watch(user, (value) => {
//   if (value) {
//     formData.id = value?.id || "";
//     formData.phone = value?.phone || "";
//     formData.nickname = value?.nickName || "";
//   }
// });
</script>

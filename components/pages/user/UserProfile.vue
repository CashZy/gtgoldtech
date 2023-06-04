<template>
  <div class="">
    <div
      class="flex flex-col items-center justify-center space-y-1 text-white pt-5"
    >
      <div
        class="rounded-full"
        style="width: 90px; height: 90px; overflow: hidden"
      >
        <img
          :src="user?.avatar ? `/uploads/users/${user.avatar}` : profile"
          class="h-full w-full object-cover"
          alt=""
        />
      </div>
      <p class="text-lg">{{ user?.phone }}</p>
      <p>ID: {{ user?.id }}</p>
    </div>
  </div>
</template>

<script setup>
import profile from "~/assets/images/common/profile.jpeg";
import useAuth from "~/composables/auth/useAuth";
const { user } = useAuth();

const formData = reactive({
  id: user?.value?.id || "",
  phone: user?.value?.phone || "",
  nickname: user?.value?.nickName || "",
  image: [],
});

watch(user, (value) => {
  if (value) {
    formData.id = value?.id || "";
    formData.phone = value?.phone || "";
    formData.nickname = value?.nickName || "";
  }
});
</script>

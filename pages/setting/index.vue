<template>
  <div>
    <PageHeader title="Security Settings" backRoute="/user" />

    <div class="px-4 py-2 space-y-5">
      <div class="bg-white rounded-lg py-2 text-sm">
        <van-cell
          v-for="(link, i) in links"
          :key="i"
          :title="link.title"
          isLink
          :to="link.route"
        >
          <div
            class="flex items-center justify-end"
            v-if="i == 0 && user?.avatar"
          >
            <img
              :src="`/uploads/users/${user?.avatar}`"
              :style="{
                width: '25px',
                height: '25px',
              }"
              alt=""
            />
          </div>
        </van-cell>
      </div>

      <van-button
        @click="onClick"
        class="!w-full !text-white !text-lg !font-medium !rounded-lg !bg-secondary !border-secondary"
      >
        Sign Out
      </van-button>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "~/components/pages/PageHeader.vue";
import profile from "~/assets/images/common/profile.jpeg";

import { showConfirmDialog } from "vant";
import useLogout from "~/composables/auth/useLogout";
import useAuth from "~/composables/auth/useAuth";

const router = useRouter();

const links = ref([
  { title: "Peronal Information", route: "/setting/uinfo" },
  { title: "Modify Login Password", route: "/setting/password" },
  { title: "Modify Payment Password", route: "/setting/password2" },
  { title: "Bind Bank Password", route: "/setting/bank" },
]);

const { logout } = useLogout();

const { user } = useAuth();

const beforeClose = (action) =>
  new Promise(async (resolve) => {
    router.push("/login");
    await logout(() => resolve(action === "confirm"));
  });

const onClick = () => {
  showConfirmDialog({
    title: "Are You Sure ?",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    confirmButtonColor: "red",
    beforeClose,
  });
};
</script>

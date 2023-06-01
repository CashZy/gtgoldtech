<template>
  <div
    :style="{ height: '40px' }"
    class="bg-white rounded-lg flex items-center justify-start px-3 overflow-hidden"
    ref="textRef"
  >
    <img :src="notifications_icon" class="w-6 shrink-0" alt="" />

    <div className="grow h-full w-full overflow-hidden">
      <div class="flex items-center overflow-hidden h-full">
        <div
          class="font-medium notifications-content min-w-max text-primary"
          :style="{
            transform: `translateX(${wid ? wid + 'px' : '100%'})`,
          }"
        >
          Congratulations to the 846****447 team for reaching 500 people and get
          monthly salary of 50000rs.Congratulations to the 978****105 team for
          reaching 500 people and get monthly salary of 50000rs.Congratulations
          to the 729****887 team for reaching 500 people and get monthly salary
          of 50000rs.Congrats to 919****514 for getting 4% discount voucher
          through lucky draw.Congrats to 884****500 for getting 2000rs through
          lucky draw.User 799****334 for getting 2000rs through lucky draw.User
          758****004 withdraws 6821rs successfully. User 677****350 recharges
          16500rs.User 810****733 withdraws 4492rs successfully. User 885****203
          recharges 7750rs.User 936****008 withdraws 9810rs successfully. User
          952****210 recharges 3350rs.User 701****234 withdraws 1350rs
          successfully. User 850****310 recharges 16500rs.User 772****384
          withdraws 5542rs successfully. User 926****118 recharges 1900rs.User
          782****655 withdraws 10820rs successfully. User 921****443 recharges
          9700rs.User 893****336 withdraws 4521rs successfully. User 910****990
          recharges 3700rs.User 752****447 withdraws 3851rs successfully. User
          806****330 recharges 9700rs.User 768****007 withdraws 28450rs
          successfully. User 772****999 recharges 1900rs.User 967****553
          withdraws 1830rs successfully. User 946****111 recharges 5000rs.User
          808****337 withdraws 4924rs successfully. User 7659****872 recharges
          18400rs.User 987***112 get commission 1380rs today.User 852***555 get
          commission 970rs today.User 829***252 get commission 1760rs today.User
          897***005 get commission 867.2rs today.User 764***159 get commission
          796.8rs today.User 782***994 get commission 859.5rs today.User
          986***229 get commission 4891rs today.User 887***128 get commission
          10983rs today.User 872***441 get commission 1689.2rs today
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import notifications_icon from "../../../assets/images/common/notifications-icon.png";
const textRef = ref(null);
const wid = ref(null);

onMounted(() => {
  wid.value = textRef.value.clientWidth;
});
</script>

<style lang="scss" scoped>
.notifications-content {
  animation: notifications-content 120s linear 1s infinite;

  &:hover {
    animation-play-state: paused;
  }
}
@keyframes notifications-content {
  100% {
    transform: translateX(-100%);
  }
}
</style>

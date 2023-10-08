<template>
  <div class="container">
    <div ref="cardRef" class="card" @click="flipCard"></div>
    <div class="clock">
      <p>{{ time.month }}</p>
      <p>{{ time.day }}</p>
      <p>{{ time.hours }}</p>
      <p>{{ time.minutes }}</p>
      <p>{{ time.seconds }}</p>
      <p>({{ time.weekDay }})</p>
      <p>{{ time.ampm }}</p>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";

const time = reactive({
  month: "",
  day: "",
  hours: "",
  minutes: "",
  seconds: "",
  weekDay: "",
  ampm: "",
});

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
const formatDate = () => {
  const date = new Date();
  time.month = (date.getMonth() + 1).toString().padStart(2, "0");
  time.day = date.getDate().toString().padStart(2, "0");
  time.hours = date.getHours().toString().padStart(2, "0");
  time.minutes = date.getMinutes().toString().padStart(2, "0");
  time.seconds = date.getSeconds().toString().padStart(2, "0");
  time.weekDay = weekDays[date.getDay()];
  time.ampm = date.getHours() >= 12 ? "PM" : "AM";
};

const cardRef = ref();
let isFlipping = false;
const flipCard = () => {
  if (!isFlipping) {
    isFlipping = true;
    gsap.to(cardRef.value, {
      rotateY: "+=180",
      duration: 0.5,
      ease: "none",
      onComplete: () => {
        isFlipping = false;
      },
    });
  }
};

const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  setInterval(() => {
    formatDate();
  }, 1000);

  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #dbdbdb;
  .card {
    flex: 0.45;
    height: 50%;
    background: white;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
    perspective: 1000px;
    transform-style: preserve-3d;
    cursor: pointer;
  }
  .clock {
    flex: 0.45;
    text-align: center;
    height: 50%;
    background: red;
  }
}
</style>

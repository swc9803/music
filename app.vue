<template>
  <div class="container">
    <div class="card" @click="flipCard">
      <div ref="cardFrontRef" class="card-front">
        <p>앞</p>
      </div>
      <div ref="cardBackRef" class="card-back">
        <p>뒤</p>
      </div>
    </div>
    <transition name="clock-fade">
      <div class="clock">
        <p>{{ month }}</p>
        <p>{{ day }}</p>
        <p>{{ hours }}</p>
        <p>{{ minutes }}</p>
        <p>{{ seconds }}</p>
        <p>({{ weekDay }})</p>
        <p>{{ ampm }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import gsap from "gsap";

const date = ref(new Date());
const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
const month = computed(() =>
  (date.value.getMonth() + 1).toString().padStart(2, "0"),
);
const day = computed(() => date.value.getDate().toString().padStart(2, "0"));
const hours = computed(() => date.value.getHours().toString().padStart(2, "0"));
const minutes = computed(() =>
  date.value.getMinutes().toString().padStart(2, "0"),
);
const seconds = computed(() =>
  date.value.getSeconds().toString().padStart(2, "0"),
);
const weekDay = computed(() => weekDays[date.value.getDay()]);
const ampm = computed(() => (date.value.getHours() >= 12 ? "PM" : "AM"));

const cardFrontRef = ref();
const cardBackRef = ref();
let isFlipping = false;

const flipCard = () => {
  if (!isFlipping) {
    isFlipping = true;
    gsap.to([cardFrontRef.value, cardBackRef.value], {
      rotateY: "-=180",
      duration: 0.5,
      ease: "power2.out",
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
    date.value = new Date();
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
    position: relative;
    flex: 0.45;
    height: 50%;
    perspective: 1000px;
    transform-style: preserve-3d;
    cursor: pointer;
    &-front,
    &-back {
      position: absolute;
      width: 100%;
      height: 100%;
      box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
      backface-visibility: hidden;
    }
    &-front {
      background: rgb(206, 235, 174);
    }
    &-back {
      transform: rotateY(180deg);
      background: rgb(231, 169, 169);
    }
  }
  .clock {
    flex: 0.45;
    text-align: center;
    height: 50%;
    background: rgb(255, 243, 243);
  }
}

.clock-fade-enter-active,
.clock-fade-leave-active {
  transition: all 0.5s ease;
}
.clock-fade-enter-from,
.clock-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

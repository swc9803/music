<template>
  <div class="container">
    <div class="card" @click="flipCard">
      <div ref="cardFrontRef" class="card-front">
        <!-- <iframe
          class="youtube"
          src="https://www.youtube.com/embed/l7DQrZZ0o4U?si=D5pn77eC1iF_86Qz"
        /> -->
        <!-- nocookie -->
        <p>유튜브 재생 progress bar</p>
      </div>
      <div ref="cardBackRef" class="card-back">
        <p>뒤</p>
      </div>
    </div>
    <div ref="clockRef" class="clock">
      <div class="time">
        <p ref="timeRef1">{{ hours }}</p>
        <p ref="timeRef2">:</p>
        <p ref="timeRef3">{{ minutes }}</p>
        <p ref="timeRef4">:</p>
        <p ref="timeRef5">{{ seconds }}</p>
        <p ref="timeRef6" class="ampm">{{ ampm }}</p>
      </div>
      <div class="day">
        <p ref="timeRef7">{{ weekDay }},</p>
        <p ref="timeRef8">{{ month }}</p>
        <p ref="timeRef9">/</p>
        <p ref="timeRef10">{{ day }}</p>
      </div>
      <div ref="toggleRef" class="toggle-theme" @click="toggleTheme" />
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { useCurrentTime } from "../composables/useCurrentTime.js";

const { month, day, hours, minutes, seconds, weekDay, ampm } = useCurrentTime();

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

const toggleRef = ref();
const clockRef = ref();
const timeRef1 = ref();
const timeRef2 = ref();
const timeRef3 = ref();
const timeRef4 = ref();
const timeRef5 = ref();
const timeRef6 = ref();
const timeRef7 = ref();
const timeRef8 = ref();
const timeRef9 = ref();
const timeRef10 = ref();
const themeTimeline = gsap.timeline({ paused: true });

const theme = ref(false);
const toggleTheme = () => {
  theme.value = !theme.value;
  if (theme.value) {
    themeTimeline.play();
  } else {
    themeTimeline.reverse();
  }
};

const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  themeTimeline.to(
    toggleRef.value,
    {
      background: "#ffffff",
      duration: 0.2,
      ease: "none",
    },
    "<",
  );
  themeTimeline.to(
    clockRef.value,
    {
      background: "#000000",
      duration: 0.2,
      ease: "none",
    },
    "<",
  );
  themeTimeline.to(
    [
      timeRef1.value,
      timeRef2.value,
      timeRef3.value,
      timeRef4.value,
      timeRef5.value,
      timeRef6.value,
      timeRef7.value,
      timeRef8.value,
      timeRef9.value,
      timeRef10.value,
    ],
    {
      color: "#ffffff",
      duration: 0.2,
      ease: "none",
    },
    "<",
  );

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
      backface-visibility: hidden;
    }
    &-front {
      background: rgb(206, 235, 174);
    }
    &-back {
      transform: rotateY(180deg);
      background: rgb(231, 169, 169);
    }
    .youtube {
      width: 90%;
      height: 90%;
      border: none;
    }
  }
  .clock {
    flex: 0.45;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
    background: rgb(255, 255, 255);
    .time {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 5px;
      font-size: 2em;
      font-weight: 600;
      .ampm {
        font-size: 0.5em;
      }
    }
    .day {
      display: flex;
      justify-content: center;
      gap: 5px;
    }
    .toggle-theme {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 60px;
      height: 30px;
      border: 1px solid gray;
      border-radius: 50px;
      background: black;
      cursor: pointer;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

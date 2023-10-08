<template>
  <div class="container">
    <div>home</div>
  </div>
</template>

<script setup>
const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: red;
}
</style>

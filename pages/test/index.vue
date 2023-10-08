<template>
  <div>
    <div>test</div>
    <button @click="onChange">change</button>
    <p>{{ user.count }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();

const onChange = () => {
  user.count++;
  console.log(user.count);
};
</script>

<style lang="scss" scoped></style>

import { ref, onBeforeUnmount } from "vue";

export const useCurrentTime = () => {
  const currentTime = ref(new Date());
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const month = computed(() =>
    (currentTime.value.getMonth() + 1).toString().padStart(2, "0"),
  );
  const day = computed(() =>
    currentTime.value.getDate().toString().padStart(2, "0"),
  );
  const hours = computed(() =>
    currentTime.value.getHours().toString().padStart(2, "0"),
  );
  const minutes = computed(() =>
    currentTime.value.getMinutes().toString().padStart(2, "0"),
  );
  const seconds = computed(() =>
    currentTime.value.getSeconds().toString().padStart(2, "0"),
  );
  const weekDay = computed(() => weekDays[currentTime.value.getDay()]);
  const ampm = computed(() =>
    currentTime.value.getHours() >= 12 ? "PM" : "AM",
  );

  const updateCurrentTime = () => {
    currentTime.value = new Date();
  };
  const updateTimeInterval = setInterval(updateCurrentTime, 1000);
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });
  return {
    month,
    day,
    hours,
    minutes,
    seconds,
    weekDay,
    ampm,
  };
};

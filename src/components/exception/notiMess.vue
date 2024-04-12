<template>
  <div
    v-if="notiData.show"
    class="notification fixed right-[2rem] top-[1rem] bg-[#fe5300] rounded-[12px] pl-2 pr-2 pb-2 pt-0;"
    :class="{ error: notiData.error, bottom: notiData.bottom }"
  >
    <h1 class="text-center text-red-950 uppercase">Thông báo</h1>
    <p class="w-fit text-center px-3 py-2 pt-0 text-[#000000]">
      {{ notiData.mess }}
    </p>
    <a v-if="notiData.link" :href="notiData.link" target="_blank">More Info</a>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { noti_mess_store } from "@/stores/notiMessStore";

export default {
  setup() {
    const notiData = computed(() => noti_mess_store.value);

    return {
      notiData,
    };
  },
};
</script>

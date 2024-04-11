<script>
import SiderBar from "@/components/siderBar.vue";
import Header from "@/components/header.vue";
import CardNotes from "@/components/cardNotes.vue";

export default {
  components: {
    SiderBar,
    Header,
    CardNotes,
  },
};
</script>

<template>
  <div class="flex h-screen">
    <SiderBar />
    <div class="w-full max-h-full">
      <Header />
    </div>
  </div>
</template>

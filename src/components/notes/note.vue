<template>
  <!-- pin -->
  <div class="bg-[#d9f47b] rounded-md max-h-[17rem]" @click="selectNote">
    <div class="flex justify-between pr-3 pt-2 w-full">
      <div class="text-xs ml-3 mb-1">27.NOV</div>
      <div class="icon-wrapper">
        <div
          class="icon-circle w-[20px] h-[15px] rounded-full flex justify-center items-center text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="12"
            height="12"
            fill="black"
          >
            <path
              d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- title -->
    <div>
      <div class="pl-5">
        <h1 class="text-sm font-medium">{{ note.title }}</h1>
      </div>
    </div>
    <!-- description -->
    <div
      class="px-5 pb-2 inline-block h-32 max-h-[5rem] text-sm overflow-hidden"
    >
      <p class="text-[#577245] overflow-hidden max-w-36">{{ note.content }}</p>
    </div>
    <div
      class="rounded-xl bg-slate-400 max-w-fit ml-5 w-full px-2 cursor-pointer mb-2"
    >
      <label class="cursor-pointer text-xs" for="">Label</label>
    </div>
    <div class="flex gap-3 pl-3 pb-3 relative group">
      <i
        class="text-gray-500 group-hover:bg-gray-300 rounded-full p-1 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="w-4 h-4"
        >
          <path
            fill="#5d8c81"
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
          />
        </svg>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      id: null,
      title: "",
      content: "",
      color: "Green",
    }, // Prop nhận dữ liệu của ghi chú
  },
  methods: {
    selectNote() {
      this.$emit("select", this.note); // Emit sự kiện khi ghi chú được chọn
    },
  },
};
</script>

<style scoped>
.icon-wrapper:hover .icon-circle {
  background-color: #f0ffc6; /* Change the background color on hover */
}
</style>

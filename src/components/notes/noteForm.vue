<template>
  <div
    class="bg-[#f2edd3] w-[21rem] rounded-3xl ml-5 px-6 pt-2 mb-1 mt-[3rem] pb-2 flex flex-col justify-between absolute"
  >
    <div>
      <i class="fa-regular fa-note-sticky text-[#5d8c81]"></i>
      <h1 class="text-[#122d28] font-semibold">New Note</h1>

      <div class="grid gap-2">
        <div class="flex items-center">
          <font-awesome-icon :icon="['fas', 'thumbtack']" />
          <input
            class="text-black bg-[#f2edd3] outline-none border-none"
            type="text"
            placeholder="Title"
            v-model="note.title"
          />
        </div>
        <div class="border-t-[1px] border-[#ebdf9a]"></div>
      </div>
      <div class="border-[1px] border-[#ebdf9a] mt-2 rounded-md">
        <div class="flex gap-3 m-1">
          <h1 class="w-1/2">Normal Text</h1>
          <div class="flex w-1/2 gap-1">
            <i class="flex-grow">a</i>
            <i class="flex-grow">b</i>
            <i class="flex-grow">c</i>
          </div>
        </div>
      </div>

      <div class="outline-none border-b-[1px] border-[#ebdf9a] pt-2 pb-2">
        <textarea
          id="message"
          rows="12"
          class="textarea-lined resize-none w-full text-sm text-gray-900 bg-[#f2edd3] border-none outline-none"
          placeholder="Enter Details"
          v-model="note.content"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-center">
      <div
        class="inline-flex justify-center border-none mt-3 rounded-md w-[13rem] bg-[#fe5300]"
      >
        <button
          class="text-white text-center p-2 hover:bg-blue-500 transition-colors"
          @click="saveNote"
        >
          Add New Note
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    note: {
      id: null,
      title: "",
      content: "",
      color: "Green",
    }, // Prop nhận ghi chú đang chỉnh sửa
    isEditing: Boolean, // Prop để kiểm tra xem có đang chỉnh sửa ghi chú hay không
  },
  methods: {
    saveNote() {
      this.$emit("save"); // Emit sự kiện khi lưu ghi chú
    },
  },
};
</script>

<style scoped>
.textarea-lined {
  background-size: 100% 2em;
  background-image: linear-gradient(to bottom, #ebdf9a 1px, transparent 1px);
  line-height: 1.5rem;
}

.textarea-lined::-webkit-scrollbar {
  width: 2px; /* Điều chỉnh kích thước rộng của thanh cuộn */
}

.textarea-lined::-webkit-scrollbar-track {
  background: #f1f1f1; /* Màu nền của phần track (đường dẫn thanh cuộn) */
}

.textarea-lined::-webkit-scrollbar-thumb {
  background: #888; /* Màu của thumb (phần có thể kéo của thanh cuộn) */
}

.textarea-lined::-webkit-scrollbar-thumb:hover {
  background: #555; /* Màu của thumb khi được hover */
}
</style>

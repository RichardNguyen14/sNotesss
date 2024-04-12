<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center z-50 justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <p class="text-lg text-gray-800">{{ message }}</p>
      <div class="mt-4 mr-4 flex justify-end">
        <button
          @click="handleConfirm"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm
        </button>
        <button
          @click="handleCancel"
          class="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: "Are you sure?",
    },
  },
  emits: ["confirm", "cancel"],
  methods: {
    handleConfirm() {
      if (this.noteId !== null) {
        this.$emit("confirm"); // Gửi noteId khi confirm
      } else {
        console.error("noteId is not defined.");
      }
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<script>
import { pin_note_api, unpin_note_api } from "@/service/noteServices";
import { notes } from "@/stores/noteStore";

export default {
  props: ["title", "noteId"],
  methods: {
    async togglePin() {
      const note = notes.value.find((note) => note.id === this.noteId);
      if (!note) {
        console.error("Không tìm thấy ghi chú:", this.noteId);
        return;
      }

      try {
        // Kiểm tra trạng thái hiện tại của ghi chú và gọi API tương ứng
        if (note.pinned) {
          await unpin_note_api(this.noteId); // Gọi API gỡ ghim nếu ghi chú đang được ghim
        } else {
          await pin_note_api(this.noteId); // Gọi API ghim nếu ghi chú chưa được ghim
        }
        // Cập nhật trạng thái pinned của ghi chú sau khi gọi API thành công
        note.pinned = !note.pinned;
        this.$emit("pin");
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái ghim:", error);
      }
    },
  },
};
</script>
<template></template>

<script>
import { pin_note_api, unpin_note_api } from "@/service/noteServices";
import { notes } from "@/stores/noteStore";
import NotiMess from "../exception/notiMess.vue";
import { set_noti_mess_store } from "@/stores/notiMessStore";
import { ref, nextTick } from "vue";
export default {
  components: {
    NotiMess,
  },
  props: ["noteId"],
  methods: {
    async togglePin() {
      const note = notes.value.find((note) => note.id === this.noteId);
      if (!note) {
        console.error("Không tìm thấy ghi chú:", this.noteId);
        return;
      }

      try {
        if (note.pinned) {
          await unpin_note_api(this.noteId);
          nextTick(() => {
            console.log("unpin thanh cong");
            set_noti_mess_store({ mess: "unpin thanh cong" });
          });
        } else {
          await pin_note_api(this.noteId);
          nextTick(() => {
            console.log("pin thanh cong");
            set_noti_mess_store({ mess: "pin thanh cong" });
          });
        }
        note.pinned = !note.pinned;
        this.$emit("pin");
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái ghim:", error);
      }
    },
  },
};
</script>
<template>
  <div
    class="icon-circle w-[20px] h-[15px] rounded-full flex justify-center items-center text-xs text-gray-500 group-hover:bg-gray-300 p-1 transition duration-300"
    @click.stop="togglePin"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width="12"
      height="12"
      fill="[#5d8c81]"
    >
      <path
        d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"
      />
    </svg>
  </div>
  <NotiMess />
</template>

<template>
  <Popup
    v-if="isOpen"
    :isOpen="isOpen"
    :noteId="selectedNoteId"
    :message="'Bạn có muốn xóa không?'"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
  <div class="pt-3 px-5">
    <div class="flex items-center text-xl gap-3">
      <v-icon name="co-home" />
      <h1 class="text-[#122d28] font-semibold">My Notes</h1>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-6 gap-4 overflow-y-auto h-[33rem] max-h-[33rem] pt-4 pl-4 pr-4 w-[100%] custom-scrollbar"
    >
      <div
        class="bg-[#d9f47b] rounded-md max-h-[12rem]"
        v-for="note in trashNotes"
        :key="note.id"
      >
        <!-- Hiển thị thông tin của note ở đây -->
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
          <p class="text-[#577245] overflow-hidden max-w-36">
            {{ note.content }}
          </p>
        </div>
        <div
          class="rounded-xl bg-slate-400 max-w-fit ml-5 w-full px-2 cursor-pointer mb-2"
        >
          <label class="cursor-pointer text-xs" for="">Label</label>
        </div>
        <div class="flex gap-1 pl-3 pb-3">
          <!-- delete -->
          <div class="flex relative group" @click="openPopup(note.id)">
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
          <!-- restore -->
          <div>
            <div
              class="flex relative group"
              @click="handleRestoreNote(note.id)"
            >
              <i
                class="text-gray-500 group-hover:bg-gray-300 rounded-full p-1 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="w-4 h-4"
                >
                  <!-- Font Awesome Icon -->
                  <path
                    fill="#5d8c81"
                    d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm192 64c-6.4 0-12.5 2.5-17 7l-80 80c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V408c0 13.3 10.7 24 24 24s24-10.7 24-24V273.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-4.5-4.5-10.6-7-17-7z"
                  />
                </svg>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {
  notes,
  deletedNotes,
  deleteNotetoNotes,
  restoreNoteFromTrash,
} from "@/stores/noteStore";
import Popup from "@/components/popup.vue";

export default {
  components: {
    Popup,
  },
  setup() {
    const isOpen = ref(false);
    const selectedNoteId = ref(null);

    const trashNotes = computed(() => {
      return notes.value.filter((note) => deletedNotes.value.includes(note.id));
    });

    const openPopup = (noteId) => {
      isOpen.value = true;
      selectedNoteId.value = noteId;
    };

    // Trong setup của TrashPage.vue
    const handleConfirm = async () => {
      if (selectedNoteId.value !== null) {
        await deleteNotetoNotes(selectedNoteId.value);
        isOpen.value = false;
        selectedNoteId.value = null; // Reset sau khi xóa
      }
    };

    const handleCancel = () => {
      isOpen.value = false;
      selectedNoteId.value = null;
    };
    const handleRestoreNote = (noteId) => {
      restoreNoteFromTrash(noteId);
    };
    return {
      trashNotes,
      isOpen,
      openPopup,
      handleConfirm,
      handleCancel,
      selectedNoteId,
      handleRestoreNote,
    };
  },
};
</script>

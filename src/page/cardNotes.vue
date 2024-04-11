<script>
import { ref } from "vue";
import { create_note_api } from "@/service/noteServices";

import {
  addNoteToNotes,
  fetchNotes,
  notes,
  updateNotetoNotes,
} from "@/stores/noteStore";
import { noti_mess_store } from "@/stores/notiMessStore";
import { onMounted } from "vue";
import notiMess from "@/components/exception/notiMess.vue";
import NoteForm from "@/components/notes/noteForm.vue";
export default {
  components: {
    notiMess,
  },
  setup() {
    onMounted(fetchNotes);
    const CreaterNote = ref({
      id: null,
      title: "",
      content: "",
      color: "Green",
    });
    const isEditingNotes = ref(false);

    const selectNote = (note) => {
      CreaterNote.value.id = note.id;
      CreaterNote.value.title = note.title;
      CreaterNote.value.content = note.content;
      CreaterNote.value.color = note.color;
      isEditingNotes.value = true;
    };

    const saveNotes = async () => {
      try {
        let response;
        if (isEditingNotes.value) {
          response = await updateNotetoNotes(CreaterNote.value);
          updateNotetoNotes(response.data);
        } else {
          response = await create_note_api(CreaterNote.value);
          addNoteToNotes(response.data);
        }
        clearNoteData();
      } catch (e) {
        noti_mess_store.addNotification("Error saving note");
      }
    };

    const clearNoteData = () => {
      CreaterNote.value = { id: null, title: "", content: "", color: "Green" };
      isEditingNotes.value = false;
    };

    return {
      notes,
      saveNotes,
      CreaterNote,
      isEditingNotes,
      selectNote,
    };
  },
};
</script>
<template>
  <div class="pt-3 px-5">
    <noti-mess />
    <div class="flex items-center text-xl gap-3">
      <v-icon name="co-home" />
      <h1 class="text-[#122d28] font-semibold">My Notes</h1>
    </div>
    <div class="flex">
      <!-- Card -->
      <div
        class="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto max-h-[33rem] pt-4 pl-4 pr-4 w-[70%] custom-scrollbar"
      >
        <Note
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :selectNote="selectNote"
        />
      </div>

      <NoteForm
        :note="CreaterNote"
        :isEditing="isEditingNotes"
        @save="saveNotes"
      />
    </div>
  </div>
</template>

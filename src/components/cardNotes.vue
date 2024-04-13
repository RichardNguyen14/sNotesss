<script>
import { ref, computed } from "vue";
import { create_note_api } from "@/service/noteServices";
import {
  addNoteToNotes,
  deleteNoteTemporarily,
  fetchNotes,
  notes,
  deletedNotes,
  updateNotetoNotes,
} from "@/stores/noteStore";
import { noti_mess_store, set_noti_mess_store } from "@/stores/notiMessStore";
import { onMounted } from "vue";
import notiMess from "./exception/notiMess.vue";
import pinnote from "./notes/pinnote.vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
// Include necessary Quill modules

export default {
  components: {
    notiMess,
    pinnote,
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
    const selectedNoteId = ref(null);

    const selectNote = (note) => {
      CreaterNote.value.id = note.id;
      CreaterNote.value.title = note.title;
      CreaterNote.value.content = note.content;
      CreaterNote.value.color = note.color;
      isEditingNotes.value = true;
      if (quill) {
        quill.root.innerHTML = note.content;
      }
      selectedNoteId.value = note.id;
    };

    const saveNotes = async () => {
      try {
        let response;
        console.log("123123");
        if (isEditingNotes.value) {
          console.log("123123");
          console.log("1", CreaterNote.value);
          response = await updateNotetoNotes(CreaterNote.value);
          console.log("2", response.value);
          updateNotetoNotes(response.data);
        } else {
          console.log("123123");
          response = await create_note_api(CreaterNote.value);
          addNoteToNotes(response.data);
        }
        clearNoteData();
      } catch (e) {
        noti_mess_store.addNotification("Error saving note");
      }
    };

    const clearNoteData = () => {
      // Xóa dữ liệu trong CreaterNote
      CreaterNote.value = { id: null, title: "", content: "", color: "Green" };
      isEditingNotes.value = false;
      selectedNoteId.value = null;
      // Đặt lại nội dung của Quill editor về trạng thái rỗng
      if (quill) {
        quill.root.innerHTML = "";
      }
    };

    const visibleNotes = computed(() => {
      return notes.value.filter(
        (note) => !deletedNotes.value.includes(note.id)
      );
    });
    const handleDeleteNote = (noteID) => {
      deleteNoteTemporarily(noteID);
    };
    const getPinnedNotes = computed(() => {
      return notes.value.filter((note) => note.pinned);
    });
    const quillEditor = ref(null);
    let quill;
    onMounted(() => {
      quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: ["sans-serif", "serif", "monospace"] }], // Define font options
            ["bold", "italic"], // Toggle buttons for bold and italic
            [{ list: "bullet" }], // Toggle button for bullet list
          ],
        },
      });

      quill.on("text-change", function () {
        CreaterNote.value.content = quill.root.innerHTML; // Sync Quill editor content with Vue data model
      });
    });

    return {
      notes,
      saveNotes,
      CreaterNote,
      isEditingNotes,
      selectNote,
      handleDeleteNote,
      visibleNotes,
      getPinnedNotes,
      quillEditor,
      selectedNoteId,
    };
  },
};
</script>
<template>
  <div class="py-3 px-5 h-[80%]">
    <noti-mess />
    <div class="flex items-center text-xl gap-3">
      <v-icon name="co-home" />
      <h1 class="text-[#122d28] font-semibold">My Notes</h1>
    </div>
    <div class="flex h-full">
      <!-- Card -->
      <div
        class="grid grid-cols-1 auto-rows-min md:grid-cols-4 gap-4 overflow-y-auto h-full pt-4 pl-4 pr-4 w-[75%] custom-scrollbar"
      >
        <div
          class="bg-[#d9f47b] rounded-md max-h-[18rem] h-[18rem]"
          v-for="note in visibleNotes"
          :key="note.id"
          @click="selectNote(note)"
          :class="{
            'border-2 border-red-500': selectedNoteId?.value,
          }"
        >
          <div>
            <div class="flex justify-between pr-1 pt-2 w-full">
              <div class="text-xs ml-3 mb-1">
                {{ note.created_at }}
              </div>
              <div>
                <pinnote :note-id="note.id" />
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
            class="px-5 pb-2 inline-block h-44 max-h-[10rem] max-w-[35rem] text-sm overflow-hidden"
          >
            <div
              v-html="note.content"
              class="text-[#577245] overflow-hidden max-w-56"
            ></div>
          </div>
          <div
            class="rounded-xl bg-slate-400 max-w-fit ml-5 w-full px-2 cursor-pointer mt-4"
          >
            <label class="cursor-pointer text-xs" for="">Label</label>
          </div>
          <div class="flex gap-1 ml-3 group">
            <!-- Icon 1 -->
            <div
              class="flex items-center justify-center rounded-full p-2 transition duration-300"
              @click.stop="handleDeleteNote(note.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="w-4 h-4 text-gray-500 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
              >
                <path
                  fill="#5d8c81"
                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                />
              </svg>
            </div>

            <!-- Icon 2 -->
            <div
              class="flex items-center justify-center rounded-full p-2 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="w-4 h-4 text-gray-500 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
              >
                <path
                  fill="#5d8c81"
                  d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[25%] h-full overflow-hidden mx-6">
        <!-- pin -->
        <div class="bg-[#f2edd3] h-[20%] border-[#ebdf9a] rounded-3xl">
          <div class="flex gap-2 pt-3">
            <i class="ml-3 pt-[6px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="15"
                height="15"
                fill="black"
              >
                <!-- Font Awesome Icon -->
                <path
                  d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
                />
              </svg>
            </i>
            <div>
              <h1>Quick Pinned</h1>
            </div>
          </div>
          <div class="overflow-y-auto h-24 ml-3 mr-3 customer-scrollbar-pin">
            <div
              v-for="note in getPinnedNotes"
              :key="note.id"
              class="flex border-[1px] border-[#ebdf9a] mt-2 rounded-md px-3 hover:bg-gray-100"
            >
              <div class="">
                {{ note.title }}
              </div>
            </div>
          </div>
        </div>
        <!-- New Notes -->
        <div
          class="bg-[#f2edd3] h-[80%] rounded-3xl mt-2 px-4 py-4 flex flex-col justify-between"
        >
          <div>
            <div class="h-5% mb-3">
              <i class="fa-regular fa-note-sticky text-[#5d8c81]"></i>
              <h1 class="text-[#122d28] font-semibold">New Note</h1>
            </div>

            <div class="grid gap-2">
              <div class="flex items-center">
                <input
                  class="text-black bg-[#f2edd3] outline-none border-none"
                  type="text"
                  placeholder="Title"
                  v-model="CreaterNote.title"
                />
              </div>
            </div>
            <div class="border-[1px] border-[#ebdf9a] mt-2 rounded-md">
              <div ref="quillEditor"></div>
            </div>

            <div class="outline-none border-b-[1px] border-[#ebdf9a] pt-2 pb-2">
              <div
                ref="quillEditor"
                rows="25"
                class="textarea-lined resize-none w-full text-sm text-gray-900 bg-[#f2edd3] border-none outline-none"
                placeholder="Enter Details"
              ></div>
            </div>
          </div>

          <div class="flex justify-end">
            <div class="border-none mt-3 rounded-md bg-[#fe5300]">
              <button
                class="text-white p-2 hover:bg-[#be6e47] w-full transition-colors"
              >
                Cancel
              </button>
            </div>
            <div class="border-none ml-3 mt-3 rounded-md bg-[#fe5300]">
              <button
                class="text-white p-2 hover:bg-[#be6e47] w-full transition-colors"
                @click="saveNotes"
              >
                Add New Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Đặt trong <style> hoặc tệp CSS của bạn */

.custom-scrollbar::-webkit-scrollbar {
  width: 2px;
  /* Điều chỉnh kích thước thanh cuộn dọc */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* Màu nền của track */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  /* Màu của thumb */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* Màu của thumb khi hover */
}

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

.custom-scrollbar {
  background-image: linear-gradient(to right, #e0e0e0 1px, transparent 1px),
    linear-gradient(to bottom, #e0e0e0 1px, transparent 1px);
  background-size: 50px 50px;
}
.icon-wrapper:hover .icon-circle {
  background-color: #f0ffc6; /* Change the background color on hover */
}
/* Style for the Quill toolbar */

.ql-container {
  height: 360px;
  max-height: 360px; /* Giới hạn chiều rộng của khung soạn thảo */
  /* Bo tròn góc */
  border-radius: 10px; /* Bo tròn góc */
  border: none; /* Loại bỏ đường viền */
  overflow: hidden; /* Ẩn các nội dung vượt quá border */
}

/* Style for the Quill text input area */
.ql-editor {
  max-height: 360px; /* Giới hạn chiều cao tối đa của vùng nhập văn bản */
  overflow-y: auto; /* Hiển thị thanh cuộn dọc khi nội dung vượt quá chiều cao tối đa */
  padding: 3px; /* Đệm bên trong để văn bản không dính sát viền */
  margin-bottom: 10px;
  border: none;
  border-radius: 8px; /* Bo tròn góc cho vùng nhập liệu, đồng nhất với container */
}
.ql-toolbar {
  border-radius: 10px;
  margin-bottom: 17px;
  border: 0;
}
.ql-container.ql-snow {
  border: none;
}
</style>

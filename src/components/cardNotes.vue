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
import { noti_mess_store } from "@/stores/notiMessStore";
import { onMounted } from "vue";
import notiMess from "./exception/notiMess.vue";
import pinnote from "./notes/pinnote.vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
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
    const visibleNotes = computed(() => {
      return notes.value.filter(
        (note) => !deletedNotes.value.includes(note.id)
      );
    });
    const handleDeleteNote = (noteID) => {
      console.log("xoa", noteID);
      deleteNoteTemporarily(noteID);
    };
    const getPinnedNotes = computed(() => {
      return notes.value.filter((note) => note.pinned);
    });
    const quillEditor = ref(null);
    let quill;
    // Hàm kích hoạt chức năng In Đậm
    const toggleBold = () => {
      quill.format("bold", !quill.getFormat().bold);
    };

    // Hàm kích hoạt chức năng In Nghiêng
    const toggleItalic = () => {
      quill.format("italic", !quill.getFormat().italic);
    };

    // Hàm kích hoạt chức năng Danh sách dấu đầu dòng
    const toggleBullet = () => {
      quill.format("list", "bullet");
    };
    onMounted(() => {
      quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: false, // Tắt toolbar mặc định vì bạn đã tạo UI tùy chỉnh
        },
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
      toggleBold,
      toggleItalic,
      toggleBullet,
    };
  },
  filters: {
    formatDate(timestamp) {
      const date = new Date(parseInt(timestamp));
      return moment(String(value)).format("YYYYMMDD"); // Định dạng ngày tháng
    },
  },
};
</script>
<template>
  <div class="py-3 px-5">
    <noti-mess />
    <div class="flex items-center text-xl gap-3">
      <v-icon name="co-home" />
      <h1 class="text-[#122d28] font-semibold">My Notes</h1>
    </div>
    <div class="flex">
      <!-- Card -->
      <div
        class="grid grid-cols-1 auto-rows-min md:grid-cols-4 gap-4 overflow-y-auto h-[33rem] pt-4 pl-4 pr-4 w-[70%] custom-scrollbar"
      >
        <div
          class="bg-[#d9f47b] rounded-md max-h-[12rem]"
          v-for="note in visibleNotes"
          :key="note.id"
          @click="selectNote(note)"
        >
          <div>
            <div class="flex justify-between pr-1 pt-2 w-full">
              <div class="text-xs ml-3 mb-1">
                {{ note.created_at | formatDate }}
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
          <div
            class="flex gap-3 pl-3 pb-3 relative group"
            @click.stop="handleDeleteNote(note.id)"
          >
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
      </div>

      <div class="relative">
        <!-- pin -->
        <div
          class="absolute left-[19px] top-[-7rem] h-36 w-[21rem] z-10 bg-[#f2edd3] border-[#ebdf9a] mt-1 rounded-3xl"
        >
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
                  v-model="CreaterNote.title"
                />
              </div>
              <div class="border-t-[1px] border-[#ebdf9a]"></div>
            </div>
            <div class="border-[1px] border-[#ebdf9a] mt-2 rounded-md">
              <div class="flex gap-3 m-1">
                <!-- font  -->
                <h1 class="w-1/2">Normal Text</h1>
                <!-- bikd , italic, buullets  -->
                <div class="flex w-1/2 gap-1">
                  <i class="flex-grow" @click="toggleBold">a</i>
                  <i class="flex-grow" @click="toggleItalic">b</i>
                  <i class="flex-grow" @click="toggleBullet">c</i>
                </div>
              </div>
            </div>

            <div class="outline-none border-b-[1px] border-[#ebdf9a] pt-2 pb-2">
              <textarea
                id="message"
                rows="12"
                class="textarea-lined resize-none w-full text-sm text-gray-900 bg-[#f2edd3] border-none outline-none"
                placeholder="Enter Details"
                v-model="CreaterNote.content"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-center">
            <div
              class="inline-flex justify-center border-none mt-3 rounded-md w-[13rem] bg-[#fe5300]"
            >
              <button
                class="text-white text-center p-2 hover:bg-blue-500 transition-colors"
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
</style>

import { ref } from "vue";

import { get_notes_api,delete_note_api,update_notes_api } from "@/service/noteServices"
import { auth_logout } from "@/auth";

const notes = ref([]);
const deletedNotes = ref([]);
const fetchNotes = async () => {
  try {
    const response = await get_notes_api();
    notes.value = response.data.data;
     // Lấy danh sách "xóa" từ LocalStorage
     const storedDeletedNotes = JSON.parse(localStorage.getItem('deletedNotes'));
     if (storedDeletedNotes) {
       deletedNotes.value = storedDeletedNotes;
     }
  } catch (error) {
    auth_logout();
  }
};
const addNoteToNotes = (newNote) => {
  notes.value.push(newNote);
};
const updateNotetoNotes = async (updatedNote) => {
  try {
    console.log(updatedNote.value);
    const index = notes.value.findIndex((note) => note.id === updatedNote.id);

    if (index !== -1) {
      notes.value.splice(index, 1, updatedNote);
      console.log("Note updated successfully!", updatedNote);
      await update_notes_api(updatedNote); // Gọi hàm update_notes_api để cập nhật ghi chú trên server
    }
  } catch (error) {
    console.error("Error updating note:", error);
  }
};
// Một phương thức để đánh dấu note là đã xóa
const deleteNoteTemporarily = (noteId)=> {
  if (!deletedNotes.value.includes(noteId)) {
    deletedNotes.value.push(noteId);
        // Lưu vào LocalStorage
        localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes.value));
  }
}
// Thêm vào noteStore.js
const restoreNoteFromTrash = (noteId) => {
  const index = deletedNotes.value.indexOf(noteId);
  if (index !== -1) {
    deletedNotes.value.splice(index, 1);
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes.value));
  }
};
// Trong noteStore.js
export const togglePinStatus = (noteId) => {
  const note = notes.value.find((note) => note.id === noteId);
  if (note) {
    note.pinned = !note.pinned;
  }
};

 const deleteNotetoNotes = async (noteId) => {
  try {
    // Gọi hàm xóa ghi chú từ API
    await delete_note_api(noteId);
    // Xóa ghi chú khỏi danh sách notes
    const index = notes.value.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      notes.value.splice(index, 1);
    }

    console.log("Note deleted successfully!");
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

export { notes, fetchNotes, addNoteToNotes, updateNotetoNotes,deleteNotetoNotes,deleteNoteTemporarily,deletedNotes,restoreNoteFromTrash };

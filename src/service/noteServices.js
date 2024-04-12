import { error_services } from "@/service/index";
import { g_fetch } from "@/modules/g_fetch";

export const get_notes_api = async () => {
  const url = "/notes/all";
  return await g_fetch("GET", url).catch((error) => {
    error_services(error);
    throw error;
  });
};

export const create_note_api = async (noteData) => {
  const url = "/notes/create";
  return await g_fetch("POST", url, noteData).catch((error) => {
    error_services(error);
    throw error;
  });
};
export const update_notes_api = async (updatedNote) => {
  const url = `/notes/${updatedNote.id}`;
  const requestData = {
    title: updatedNote.title,
    content: updatedNote.content,
    color: updatedNote.color,
  };
  return await g_fetch("PUT", url, requestData).catch((e) => {
    error_services(e);
    throw e;
  });
};
export const delete_note_api = async (noteId) => {

  const url = `/notes/${noteId}`;
  return await g_fetch("DELETE", url).catch((error) => {
    error_services(error);
    throw error;
  });
};
export const pin_note_api = async (noteId) => {
  const url= `/notes/pin-note/${noteId}`;
  return await g_fetch("PUT", url).catch((e) => {
    error_services(e);
    throw e;
  });
};
export const unpin_note_api = async (noteId) => {
  const url= `/notes/unpin-note/${noteId}`;
  return await g_fetch("PUT", url).catch((e) => {
    error_services(e);
    throw e;
  });
};

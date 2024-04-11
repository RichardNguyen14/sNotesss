import { set_noti_mess_store } from "@/stores/notiMessStore";

export const error_services = (error) => {
  console.log("->>erro Service: ", error);
  set_noti_mess_store({
    error: true,
    mess: error,
  });
};

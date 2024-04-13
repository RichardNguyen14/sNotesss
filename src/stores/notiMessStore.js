import { ref } from "vue";
const noti_mess_store = ref({
  show: false, //một giá trị boolean để xác định xem thông báo có hiển thị hay không.
  mess: "", //một chuỗi để chứa nội dung thông báo.
  link: "", //một chuỗi để chứa liên kết, nếu có
  open: "", //một chuỗi để xác định hành động khi nhấp vào thông báo.
  error: false, // một giá trị boolean để xác định xem thông báo có phải là lỗi hay không.
  bottom: false, //một giá trị boolean để xác định vị trí hiển thị của thông báo.
});
const clear_noti_mess_store = () => {
  noti_mess_store.value = {
    show: false,
    mess: "",
    link: "",
    open: "",
    error: false,
    bottom: false,
  };
};
const set_noti_mess_store = (mess) => {
  clear_noti_mess_store();
  if (mess.mess != undefined) {
    noti_mess_store.value.mess = mess.mess;
  }
  if (mess.link != undefined) {
    noti_mess_store.value.link = mess.link;
  }
  if (mess.error != undefined) {
    noti_mess_store.value.error = mess.error;
  }
  if (mess.open != undefined) {
    noti_mess_store.value.open = mess.open;
  }
  if (mess.bottom != undefined) {
    noti_mess_store.value.bottom = mess.bottom;
  }
  noti_mess_store.value.show = true;
  setTimeout(() => {
    clear_noti_mess_store();
  }, 3000);
};

export { noti_mess_store, set_noti_mess_store, clear_noti_mess_store };

import { computed } from "vue";
import { auth_store, clear_data_auth } from "@/stores/authStore";
import {
  get_info_api,
  login_api,
  sign_out_api,
} from "@/service/authServices";
import { noti_mess_store } from "@/stores/notiMessStore";
export const auth_logged_in = computed(() => {
  if (auth_store.value.logged_in) {
    return true;
  } else return false;
});
export const auth_user = computed(() => {
  return auth_store.value.user;
});

export const auth_login = async (data) => {
  await login_api(data)
    .then(async (res) => {
      const accessToken = "Bearer " + res["data"].access_token;
      const refreshToken = res["data"].refresh_token;

      auth_store.value.access_token = accessToken;
      auth_store.value.refresh_token = refreshToken;
      try {
        await auth_fetch_user();
      } catch (error) {
        console.log(noti_mess_store.value.mess);
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const auth_fetch_user = async () => {
  if (Boolean(auth_store.value.access_token)) {
    try {
      await get_info_api()
        .then((res) => {
          auth_store.value.user = res;
          auth_store.value.logged_in = true;
        })
        .catch((e) => {
          auth_logout();
        });
    } catch (error) {}
  }
  try {
    if (auth_logged_in.value) {
      // await init_data_stores_logged_in();
    }
  } catch (error) {
    console.log(error);
  }
};
export const auth_logout = async () => {
  try {
    await sign_out_api();
  } catch (e) {
    console.log(e);
  }
  clear_data_auth();
  window.location = "/login";
};

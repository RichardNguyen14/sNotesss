import { ref, watch } from "vue";

const KEY_LOCALSTORAGE = {
  access_token: "ACCESS_TOKEN_DEV",
  refresh_token: "REFRESH_TOKEN_DEV",
};

const get_token_storage = (key) => {
  const token = localStorage.getItem(key);
  set_token_storage(token, key);
  return token;
};

const updateLoggedInStatus = () => {
  const storedAccessToken = localStorage.getItem(KEY_LOCALSTORAGE.access_token);
  const storedRefreshToken = localStorage.getItem(
    KEY_LOCALSTORAGE.refresh_token
  );

  const currentAccessToken = auth_store.value.access_token;
  const currentRefreshToken = auth_store.value.refresh_token;

  if (
    !storedAccessToken ||
    !storedRefreshToken ||
    !currentAccessToken ||
    !currentRefreshToken
  ) {
    // Nếu một trong các token hoặc cả hai đều không tồn tại, đặt logged_in là false
    auth_store.value.logged_in = false;
  } else if (
    currentAccessToken === storedAccessToken &&
    currentRefreshToken === storedRefreshToken
  ) {
    // Nếu cả storedAccessToken và storedRefreshToken đều tồn tại và trùng khớp với auth_store, đặt logged_in là true
    auth_store.value.logged_in = true;
  } else {
    // Trường hợp còn lại, đặt logged_in là false và cập nhật lại cả access_token và refresh_token
    auth_store.value.logged_in = false;
    auth_store.value.access_token = storedAccessToken;
    auth_store.value.refresh_token = storedRefreshToken;
  }
};

const auth_store = ref({
  user: {},
  logged_in: false,
  access_token: get_token_storage(KEY_LOCALSTORAGE.access_token),
  refresh_token: get_token_storage(KEY_LOCALSTORAGE.refresh_token),
});

function set_token_storage(token, key) {
  if (Boolean(token)) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

const clear_data_auth = () => {
  auth_store.value.user = {};
  auth_store.value.logged_in = false;
  auth_store.value.access_token = null;
  auth_store.value.refresh_token = null;
};

watch(
  () => auth_store.value.access_token,
  (newVal, oldVal) => {
    set_token_storage(newVal, KEY_LOCALSTORAGE.access_token);
    updateLoggedInStatus();
  }
);

watch(
  () => auth_store.value.refresh_token,
  (newVal, oldVal) => {
    set_token_storage(newVal, KEY_LOCALSTORAGE.refresh_token);
    updateLoggedInStatus();
  }
);

window.addEventListener("storage", (e) => {
  try {
    if (
      e.key == KEY_LOCALSTORAGE.access_token ||
      e.key == KEY_LOCALSTORAGE.refresh_token
    ) {
      window.location.reload();
      updateLoggedInStatus();
    }
  } catch (e) {
    console.log(e);
  }
});

export { auth_store, clear_data_auth, updateLoggedInStatus };

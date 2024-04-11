import { BASE_URL_API } from "@/key/url_api.js";

import { auth_store } from "@/stores/authStore";
// import {
// 	auth_refresh_token
// } from "@/auth";
// import {key_error} from '@/key/key_error';

const call_fetch = async (method, url, body) => {
  if (body != undefined) {
    body = JSON.stringify(body);
  }
  const optionFetch = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        url != "/refresh-token" ? auth_store.value.access_token : null,
    },
    body: body,
  };
  return await fetch(BASE_URL_API + url, optionFetch)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const g_fetch = async (method, url, body) => {
  try {
    const call = await call_fetch(method, url, body);
    const callJson = await call.json();
    if (call.ok) {
      return callJson;
    } else {
      // console.log("-----> on gfetch error ", callJson)
      // throw callJson.message
      if (callJson.error.code == "ERR.TOK0102" && url != "/refresh-token") {
        try {
          await call_refresh_token();
          const callBack = await call_fetch(method, url, body);
          if (callBack.ok) {
            return await callBack.json();
          } else {
            const jsonCallBackErr = await callBack.json();
            throw jsonCallBackErr.error.message;
          }
        } catch (e) {
          throw e;
        }
      } else {
        // if (
        //   callJson.error &&
        //   callJson.error.code &&
        //   key_error.value[callJson.error.code]
        // ) {
        //   throw key_error.value[callJson.error.code];
        // } else {
        throw callJson.error.message;
        // }
      }
    }
  } catch (error) {
    throw error;
  }
};

let handleCallRefresh = [];
const call_refresh_token = async () => {
  if (handleCallRefresh.length > 0) {
    return handleCallRefresh[0];
  }

  const auth_refresh = auth_refresh_token()
    .then((res) => {
      handleCallRefresh.splice(0, 1);
      return res;
    })
    .catch((e) => {
      handleCallRefresh.splice(0, 1);
      throw e;
    });
  handleCallRefresh.push(auth_refresh);

  return await auth_refresh;
};

export { g_fetch };

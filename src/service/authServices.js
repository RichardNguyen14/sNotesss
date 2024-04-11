import { g_fetch } from "@/modules/g_fetch";
import { error_services } from ".";

export const sign_up_api = async (data) => {
  return await g_fetch("POST", "/user/sign-up", data).catch((e) => {
    error_services(e);
    throw e;
  });
};
export const resend_mail_api = async (data) => {
  return await g_fetch("POST", "/user/resend-mail", data).catch((e) => {
    error_services(e);
    throw e;
  });
};
export const login_api = async (data) => {
  return await g_fetch("POST", "/oauth/token", data).catch((e) => {
    error_services(e);
    throw e;
  });
};

export const confirm_email_api = async (token) => {
  const url = `/user/confirmation?confirmation_token=${token}`;
  return await g_fetch("GET", url, null).catch((e) => {
    error_services(e);
    throw e;
  });
};
export const forgot_password_api = async (data) => {
  const url = "/user/passwords/forgot";
  return await g_fetch("POST", url, data).catch((e) => {
    error_services(e);
    throw e;
  });
};

export const notes_create_api = async (data) => {
  const url = "/notes/create";
  return await g_fetch("POST", url, data).catch((e) => {
    error_services(e);
    throw e;
  });
};

export const change_password_api = async (data) => {
  const url = "/user/change_password";
  return await g_fetch("POST", url, data).catch((e) => {
    error_services(e);
    throw e;
  });
};
export const sign_out_api = async () => {
  const url = "/oauth/revoke";
  return await g_fetch("POST", url).catch((e) => {
    error_services(e);
    throw e;
  });
};

export const get_info_api = async () => {
  const url = "/user";
  return await g_fetch("GET", url).catch((e) => {
    error_services(e);
    throw e;
  });
};

<script>
import { auth_login } from "@/auth/index";
import { noti_mess_store } from "@/stores/notiMessStore";
import { validateEmail } from "@/utils/formValidate";
export default {
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
      isEmailValid: true,
      signupError: "",
    };
  },
  methods: {
    async signIn() {
      // Kiểm tra email và password trước khi đăng nhập
      this.isEmailValid = validateEmail(this.dataLogin.email);

      // Nếu cả email và password hợp lệ, thực hiện đăng nhập
      if (this.isEmailValid) {
        try {
          await auth_login(this.dataLogin);
          this.$router.push("/home");
        } catch (error) {
          this.signupError = noti_mess_store.value.mess;
        }
      }
    },
    showForgotPasswordModal() {
      this.$emit("showForgotPasswordModal");
    },
    validateEmail() {
      // Kiểm tra email ngay khi người dùng nhập
      this.isEmailValid = validateEmail(this.dataLogin.email);
    },
  },
};
</script>

<template>
  <div class="form-container sign-in-container">
    <form @submit.prevent="signIn">
      <h1>Sign in</h1>

      <span>or use your account</span>
      <input
        type="email"
        placeholder="Email"
        v-model="dataLogin.email"
        @input="validateEmail"
      />
      <div v-if="!isEmailValid" class="valid">Email không hợp lệ</div>
      <input
        type="password"
        placeholder="Password"
        v-model="dataLogin.password"
      />
      <p v-if="signupError" class="valid">{{ signupError }}</p>

      <a href="#" @click="showForgotPasswordModal">Forgot your password?</a>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>
<style scoped>
@import "../auth/index.css";
</style>

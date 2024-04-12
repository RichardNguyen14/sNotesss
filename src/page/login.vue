<script>
import { forgot_password_api } from "@/service/authServices";
import signin from "@/components/auth/signIn.vue";
import signup from "@/components/auth/sginUp.vue";
import { noti_mess_store } from "@/stores/notiMessStore";
export default {
  created() {
    // Lấy giá trị của SuccessRegisterConfirm từ query parameter
    const querySuccessRegisterConfirm =
      this.$route.query.SuccessRegisterConfirm;
    this.showSuccessRegisterConfirm = querySuccessRegisterConfirm
      ? querySuccessRegisterConfirm === "true"
      : false;
  },

  components: {
    signin,
    signup,
  },
  data() {
    return {
      forgotPassword: {
        email: "",
      },
      showModalSignIn: false,
      showSuccessRegisterConfirm: false,
      isSignUp: false,
      loginError: "",
    };
  },
  methods: {
    showForgotPasswordModal() {
      this.showModalSignIn = true;
    },

    closeModal() {
      this.showModalSignIn = false;
      this.showSuccessRegisterConfirm = false;
    },
    async sendResetPasswordEmail() {
      try {
        await forgot_password_api(this.forgotPassword);
        this.loginError = "Sussces";
      } catch (e) {
        this.loginError = noti_mess_store.value.mess;
      }
    },
    switchToSignIn() {
      this.isSignUp = false;
    },
    switchToSignUp() {
      this.isSignUp = true;
    },
  },
};
</script>

<template>
  <div
    class="container"
    :class="{ 'right-panel-active': isSignUp }"
    id="container"
  >
    <signin
      v-if="!isSignUp"
      @showForgotPasswordModal="showForgotPasswordModal"
    />
    <signup v-if="isSignUp" />
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" @click="switchToSignIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" @click="switchToSignUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <p>
      Created with <i class="fa fa-heart"></i> by
      <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
      - Read how I created this and how you can join the challenge
      <a
        target="_blank"
        href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
        >here</a
      >.
    </p>
  </footer>
  <!-- Modal- resentemail -->
  <div class="modal" v-if="showModalSignIn">
    <!-- Sử dụng class binding để thêm class 'show' khi showModal là true -->
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Forgot Password</h2>
      <input
        type="email"
        v-model="forgotPassword.email"
        placeholder="Enter your email"
      />
      <button @click="sendResetPasswordEmail">Send</button>
      <p v-if="loginError" class="valid">{{ loginError }}</p>
    </div>
  </div>
  <!-- Modal- RegisterConfirm -->
  <div class="modal" v-if="showSuccessRegisterConfirm">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Success</h2>
      <p v-if="loginError" class="valid">{{ loginError }}</p>
    </div>
  </div>
</template>
<style scoped>
@import "../components/auth/index.css";
</style>

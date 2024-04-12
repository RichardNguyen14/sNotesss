<template>
  <div>
    <div class="header_account" style="position: relative">
      <i class="fa-regular fa-user large-icon" @click="toggleUserCard"></i>
      <div class="user-card" v-if="isUserCardVisible">
        <button v-if="!isLoggedIn" @click="redirectToLogin">Login</button>
        <button @click="handleSignOut">Logout</button>
        <button @click="openChangePasswordPopup">ChangePassword</button>
      </div>
    </div>
  </div>
  <div class="popup-overlay" v-if="isChangePasswordPopupVisible"></div>
  <div class="popup" v-if="isChangePasswordPopupVisible">
    <h1>Change Password</h1>
    <input
      type="text"
      placeholder="old_password"
      v-model="changePassword.old_password"
    />
    <input
      type="text"
      placeholder="new_password"
      v-model="changePassword.new_password"
    />
    <input
      type="text"
      placeholder="confirm_new_password"
      v-model="changePassword.confirm_new_password"
    />
    <p v-if="signupError" class="valid">{{ signupError }}</p>
    <button @click="handleChangePassword" class="change-password-confirm">
      Change Password
    </button>
    <button
      @click="isChangePasswordPopupVisible = false"
      class="change-password-confirm"
    >
      Close
    </button>
  </div>
</template>

<script>
import { sign_out_api, change_password_api } from "@/service/authServices";
import { clear_data_auth } from "@/stores/authStore";
import { noti_mess_store } from "@/stores/notiMessStore";
export default {
  data() {
    return {
      changePassword: {
        old_password: "",
        new_password: "",
        confirm_new_password: "",
      },
      isUserCardVisible: false,
      isLoggedIn: false, // Thêm biến này để kiểm tra trạng thái đăng nhập
      isChangePasswordPopupVisible: false,
      signupError: "",
    };
  },
  methods: {
    toggleUserCard() {
      this.isUserCardVisible = !this.isUserCardVisible;
      // Kiểm tra nếu đã đăng nhập thì ẩn nút "Login"
      if (this.isLoggedIn) {
        this.isUserCardVisible = false;
      }
    },
    redirectToLogin() {
      // Chuyển hướng người dùng đến trang đăng nhập
      this.$router.push("/login");
      localStorage.clear(); //clear data
    },
    async handleSignOut() {
      try {
        await sign_out_api();
        clear_data_auth();
        this.isLoggedIn = false; // Cập nhật trạng thái đăng nhập khi đăng xuất
        this.$router.push("/login"); // Chuyển hướng đến trang đăng nhập
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
    openChangePasswordPopup() {
      this.isChangePasswordPopupVisible = true;
    },
    async handleChangePassword() {
      // Kiểm tra xác nhận mật khẩu mới
      if (
        this.changePassword.new_password !==
        this.changePassword.confirm_new_password
      ) {
        this.signupError = "New password and confirm password do not match.";
        return;
      }
      // Gọi service để reset mật khẩu
      try {
        await change_password_api(this.changePassword);
        this.signupError = noti_mess_store.value.mess;
        // Xử lý khi mật khẩu được thay đổi thành công
      } catch (error) {
        this.signupError = noti_mess_store.value.mess;
        // Xử lý khi có lỗi xảy ra
      }
    },
  },
};
</script>

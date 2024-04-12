<template>
  <!-- Nav Bar -->
  <div class="bg-[#004C42] w-1/5 px-5 h-screen max-h-full relative">
    <div class="pb-14 pt-8 pl-8">
      <h1 class="text-4xl font-semibold text-white">NOTES</h1>
    </div>

    <div class="grid gap-5">
      <div class="flex gap-5 items-center pl-6">
        <i class="fa-solid fa-magnifying-glass text-[#99b7b3]"></i>
        <input
          class="text-white bg-[#004C42] outline-none border-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <div class="border-t-[1px] border-[#357169]"></div>
    </div>
    <!-- navbar -->
    <div class="text-[#99b7b3] grid gap-8 pt-12">
      <div
        class="menu-item h-12 rounded-2xl flex items-center gap-5"
        @click="goTo('home')"
        @mouseover="highlightItem('home')"
        @mouseout="unhighlightItem()"
      >
        <i class="pl-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            :width="20"
            :height="20"
          >
            <path
              fill="#5d8c81"
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            />
          </svg>
        </i>
        <a class="text-[#5d8c81]" @click="goToHome" href="#">Home</a>
      </div>
      <div class="flex justify-between px-6">
        <div class="flex gap-5 items-center">
          <i class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
            >
              <!-- Đoạn path có fill được truyền trực tiếp màu sắc -->
              <path
                fill="#5d8c81"
                d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
              />
            </svg>
          </i>
          <a href="#">Notification</a>
        </div>
        <div
          class="w-[28px] h-[28px] rounded-lg bg-[#D9F47B] text-black text-center"
        >
          4
        </div>
      </div>
      <div class="px-6 flex gap-5 items-center">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            :width="20"
            :height="20"
          >
            <path
              fill="#5d8c81"
              d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z"
            />
          </svg>
        </i>
        <a href="#">Notes</a>
      </div>
      <div
        class="menu-item h-12 rounded-2xl flex items-center gap-5"
        @click="goTo('trash')"
        @mouseover="highlightItem('trash')"
        @mouseout="unhighlightItem()"
      >
        <i class="pl-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            :width="20"
            :height="20"
          >
            <path
              fill="#5d8c81"
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
            />
          </svg>
        </i>
        <a @click="goToTrash" href="#">Trash</a>
      </div>
      <div class="px-6 flex gap-5 items-center">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            :width="20"
            :height="20"
          >
            <path
              fill="#5d8c81"
              d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8c13.8-2.3 28-3.5 42.5-3.5s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
            />
          </svg>
        </i>
        <a href="#">Settings</a>
      </div>
    </div>

    <div class="flex absolute bottom-4 items-center text-white px-6 gap-5">
      <div class="w-[44px] h-[44px] rounded-full bg-[#d9f47b]"></div>
      <div>John Gilbert</div>
      <div class="mr-1">
        <i @click="toggleUserCard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="icon"
            :width="20"
            :height="20"
          >
            <path
              fill="white"
              d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
            />
          </svg>
        </i>
        <div
          class="user-card bg-[#1d5d56] text-sm text-[#5d8c81] w-44 h-[10rem] fixed top-[33rem] left-[13rem] rounded-md p-4 z-10 overflow-hidden"
          v-if="isUserCardVisible"
        >
          <button
            v-if="!isLoggedIn"
            @click="redirectToLogin"
            class="py-2 px-4 bg-[#d9f47b] hover:bg-[#94b51c] w-full text-black rounded-md mb-2"
          >
            Login
          </button>
          <button
            @click="handleSignOut"
            class="py-2 px-4 bg-[#d9f47b] hover:bg-[#94b51c] w-full text-black rounded-md mb-2"
          >
            Logout
          </button>
          <button
            @click="openChangePasswordPopup"
            class="py-2 px-4 bg-[#d9f47b] hover:bg-[#94b51c] w-full text-black rounded-md mb-2"
          >
            Change Password
          </button>
        </div>
      </div>
      <div class="popup-overlay" v-if="isChangePasswordPopupVisible"></div>
      <div
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20"
        v-if="isChangePasswordPopupVisible"
      >
        <!-- Popup -->
        <div class="bg-[#1d5d56] p-6 rounded-lg shadow-lg w-96">
          <h1 class="text-lg font-bold mb-4 text-center">Change Password</h1>
          <input
            type="password"
            placeholder="Old Password"
            v-model="changePassword.old_password"
            class="block w-full px-4 py-2 mb-4 border rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="New Password"
            v-model="changePassword.new_password"
            class="block w-full px-4 py-2 mb-4 border rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            v-model="changePassword.confirm_new_password"
            class="block w-full px-4 py-2 mb-4 border rounded-lg text-black"
          />
          <p v-if="signupError" class="text-red-500 text-sm mb-4 items-center">
            {{ signupError }}
          </p>

          <div class="flex justify-start space-x-2">
            <button
              @click="handleChangePassword"
              class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              OK
            </button>
            <button
              @click="isChangePasswordPopupVisible = false"
              class="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { sign_out_api, change_password_api } from "@/service/authServices";
import { clear_data_auth } from "@/stores/authStore";
import { noti_mess_store } from "@/stores/notiMessStore";
// Tạo một biến phản ứng để lưu trữ item đang active
const activeItem = ref(null);
const changePassword = ref({
  old_password: "",
  new_password: "",
  confirm_new_password: "",
});
const isUserCardVisible = ref(false);
const isLoggedIn = ref(false); // Thêm biến này để kiểm tra trạng thái đăng nhập
const isChangePasswordPopupVisible = ref(false);
const signupError = ref("");

// Sử dụng useRouter để có thể chuyển hướng
const router = useRouter();

// Định nghĩa phương thức goTo để chuyển hướng đến routeName
function goTo(routeName) {
  activeItem.value = routeName; // Cập nhật item đang active
  router.push(`/${routeName}`); // Sử dụng router để chuyển hướng
}

// Phương thức để đánh dấu item khi hover
function highlightItem(itemName) {
  if (activeItem.value !== itemName) {
    activeItem.value = itemName;
  }
}

// Phương thức để bỏ đánh dấu khi không hover nữa
function unhighlightItem() {
  activeItem.value = null;
}

// Phương thức để toggle hiển thị user card
const toggleUserCard = () => {
  isUserCardVisible.value = !isUserCardVisible.value;
  // Kiểm tra nếu đã đăng nhập thì ẩn nút "Login"
  if (isLoggedIn.value) {
    isUserCardVisible.value = false;
  }
};

// Phương thức để chuyển hướng đến trang đăng nhập
const redirectToLogin = () => {
  router.push("/login");
  localStorage.clear(); // Xóa dữ liệu trong localStorage
};

// Phương thức xử lý đăng xuất
const handleSignOut = async () => {
  try {
    await sign_out_api();
    clear_data_auth();
    isLoggedIn.value = false; // Cập nhật trạng thái đăng nhập khi đăng xuất
    router.push("/login"); // Chuyển hướng đến trang đăng nhập
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Phương thức để mở popup thay đổi mật khẩu
const openChangePasswordPopup = () => {
  isChangePasswordPopupVisible.value = true;
};

// Phương thức để thay đổi mật khẩu
const handleChangePassword = async () => {
  // Kiểm tra xác nhận mật khẩu mới
  if (
    changePassword.value.new_password !==
    changePassword.value.confirm_new_password
  ) {
    signupError.value = "New password and confirm password do not match.";
    return;
  }
  // Gọi service để reset mật khẩu
  try {
    await change_password_api(changePassword.value);
    signupError.value = "Sussec";
    isChangePasswordPopupVisible = false;
    // Xử lý khi mật khẩu được thay đổi thành công
  } catch (error) {
    signupError.value = noti_mess_store.value.mess;
    // Xử lý khi có lỗi xảy ra
  }
};
</script>
<style scope>
.menu-item {
  /* Các style khác giữ nguyên */
  cursor: pointer;
}
.menu-item:hover,
.menu-item.active {
  background-color: #02675b; /* Màu nền khi hover hoặc active */
  color: white; /* Màu chữ khi hover hoặc active */
}
.menu-item:hover a,
.menu-item:hover i svg path,
.menu-item.active a,
.menu-item.active i svg path {
  color: white;
  fill: white;
}
</style>

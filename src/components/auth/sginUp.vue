<script>
import { sign_up_api, resend_mail_api } from "@/service/authServices";
import { validateEmail, validatePassword, validateConfirmPassword } from "@/utils/formValidate"
import { noti_mess_store } from "@/stores/notiMessStore";
export default {
    data() {
        return {
            dataSignUp: {
                email: "",
                password: "",
                password_confirmation: "",
                firstname: "",
                lastname: "",
                role: "USER"
            },
            signupError: "",
            resendError: "",
            isEmailValid: true,
            isPasswordValid: true,
            isPasswordConfirmationValid: true,
            showModalSignUp: false,
        };
    },
    methods: {
        async signUp() {
            // check email min
            // check email max
            // check email valid
            
            this.isEmailValid = validateEmail(this.dataSignUp.email);
            this.isPasswordValid = validatePassword(this.dataSignUp.password);
            this.isPasswordConfirmationValid = validateConfirmPassword(this.dataSignUp.password, this.dataSignUp.password_confirmation);
            if (this.isEmailValid && this.isPasswordValid && this.isPasswordConfirmationValid) {
                try {
                    await sign_up_api(this.dataSignUp);
                    this.clearSignUpData();
                    this.signupError = "Sign up success";
                    this.showModalSignUp = true;
                } catch (error) {
                    this.signupError = noti_mess_store.value.mess;
                }
            }
        },
        async resentEmail() {
            try {
                await resend_mail_api(this.dataSignUp);// Gọi API resend email
                this.resendError = "Resend email success";
            } catch (error) {
                this.resendError = noti_mess_store.value.mess;
            }
        },
        clearSignUpData() {
            this.dataSignUp.email = "";
            this.dataSignUp.firstname = "";
            this.dataSignUp.lastname = "";
            this.dataSignUp.password = "";
            this.dataSignUp.password_confirmation = "";
        },
        validateEmail() {
            // Kiểm tra email ngay khi người dùng nhập
            this.isEmailValid = validateEmail(this.dataSignUp.email);
        },
        validatePassword() {
            // Kiểm tra email ngay khi người dùng nhập
            this.isPasswordValid = validatePassword(this.dataSignUp.password);
        },
        validateConfirmPassword() {
            // Kiểm tra email ngay khi người dùng nhập
            this.isPasswordConfirmationValid = validateConfirmPassword(this.dataSignUp.password, this.dataSignUp.password_confirmation);
        },
        closeModal() {
            this.showModalSignUp = false;

        },
    }

};
</script>
<template>
    <div class="form-container sign-up-container">
        <form @submit.prevent="signUp">
            <h1>Create Account</h1>

            <span>or use your email for registration</span>

            <input type="email" placeholder="Email" v-model="dataSignUp.email" @input="validateEmail" />
            <div v-if="!isEmailValid" class="valid">Email không hợp lệ</div>
            <input type="text" placeholder="Firstname" v-model="dataSignUp.firstname" />
            <input type="text" placeholder="Lastname" v-model="dataSignUp.lastname" />
            <input type="password" placeholder="Password" v-model="dataSignUp.password" @input="validatePassword" />
            <div v-if="!isPasswordValid" class="valid">Password không hợp lệ</div>
            <input type="password" placeholder="password_confirmation" v-model="dataSignUp.password_confirmation"
                @input="validateConfirmPassword" />
            <div v-if="!isPasswordConfirmationValid" class="valid">Password không hợp lệ</div>
            <button type="submit">Sign Up</button>
            <p v-if="signupError" class="valid">{{ signupError }}</p>
        </form>
    </div>

    <!-- Modal SignUp -->
    <div v-if="showModalSignUp" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <p>Vui lòng kiểm tra email để xác nhận.</p>
            <div>
                <button @click="resentEmail" class="btn-signup">Resend Email</button>
                <p v-if="resendError" class="valid">{{ resendError }}</p>
                <button @click="closeModal" class="btn-signup">Đóng và Đăng nhập</button>
            </div>


        </div>
    </div>

    <!-- End Modal -->
</template>
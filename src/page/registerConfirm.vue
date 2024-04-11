<script>
import { confirm_email_api } from '@/service/authServices';
export default {

   created() {
      const url = new URLSearchParams(window.location.search);
      const token = url.get('token');
      this.callConfirmEmailAPI(token);
   },
   methods: {
      async callConfirmEmailAPI(token) {
         try {
            await confirm_email_api(token);
            this.$router.push({
               name: 'Login',
               query: { SuccessRegisterConfirm: true }
            });

         } catch (e) {
            console.log(e);
         }
      }
   }
};
</script>

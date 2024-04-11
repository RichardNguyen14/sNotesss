import { auth_store, updateLoggedInStatus } from "@/stores/authStore";
export default class Middleware {
  constructor(router) {
    this.router = router;
    this.registerMiddleware();
  }

  registerMiddleware() {
    this.router.beforeEach((to, from, next) => {
      const path = to.path; // Lấy đường dẫn của route hiện tại
      updateLoggedInStatus(); // Cập nhật trạng thái đăng nhập

      if (!auth_store.value.logged_in) {
        // Nếu không đăng nhập
        if (to.meta.requiresAuth) {
          // Nếu trang yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
          next({ name: "Login" });
        } else {
          // Nếu trang không yêu cầu xác thực và người dùng chưa đăng nhập, cho phép truy cập vào đường dẫn đó
          next();
        }
      } else {
        // Nếu đã đăng nhập
        if (!auth_store.value.logged_in && to.name === "Home") {
          // Nếu người dùng chưa đăng nhập và đang cố gắng truy cập vào trang Home, chuyển hướng về trang đăng nhập
          next({ name: "Login" });
        } else if (path === "/login" && !from.meta.requiresAuth) {
          // Nếu đang ở trang đăng nhập hoặc các trang tương tự mà đã đăng nhập và không phải từ một trang yêu cầu xác thực,
          // chuyển hướng về trang chính (Home)
          next({ name: "Home" });
        } else {
          // Nếu không phải là trang đăng nhập hoặc các trang tương tự, cho phép truy cập và cập nhật đường dẫn cho tab hiện tại
          next();
        }
      }
    });
  }
}

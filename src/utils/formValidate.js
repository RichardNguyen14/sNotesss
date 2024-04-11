
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };
  
  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  export { validateEmail, validatePassword, validateConfirmPassword };
  
"use strict";
const user = new UserForm();
//авторизация

user.loginFormCallback = (data) => ApiConnector.login(data, (response) => {
    if (response.success) {
        location.reload();  
    } else {user.setLoginErrorMessage("Неверный логин или пароль")
}
});

user.registerFormCallback = (data) => ApiConnector.register(data, (response) => {
    if (response.success) {
        location.reload();  
    } else {user.setRegisterErrorMessage("Некорректный логин или пароль")
}
});

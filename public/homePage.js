"use strict";

//выход
const logoutUser = new LogoutButton();
logoutUser.action = () => ApiConnector.logout((response) => {
    if (response.success) {
        location.reload();
    }
});

//текущий профиль
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
});

//курсы валют
const ratesBoard = new RatesBoard();

function exchangeRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};
exchangeRates();
let timerFunc = setInterval(exchangeRates, 60000);

//операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        let message;
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = "зачисление прошло успешно";            
        } else {
            message = "Ошибка. Отмена операции";
        }
        moneyManager.setMessage(response.success, message);
    })
} 

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        let message;
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = "конвертация прошла успешно";  
        } else {
            message = "Ошибка. Отмена операции";
        }
        moneyManager.setMessage(response.success, message);
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        let message;
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = "перевод прошел успешно";  
        } else {
            message = "Ошибка. Отмена операции";
        }
        moneyManager.setMessage(response.success, message);
    })
}

//работа с избранным
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        let message;
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message = "Пользователь успешно добавлен";
        } else {
            message = "Ошибка. Отмена операции";
        }
        moneyManager.setMessage(response.success, message);
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        let message;
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message = "Пользователь успешно удален";
        } else {
            message = "Ошибка. Отмена операции";
        }
        moneyManager.setMessage(response.success, message);
    })
}





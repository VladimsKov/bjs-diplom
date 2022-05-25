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
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "зачисление прошло успешно");  
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
        
    });
} 

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);       
            moneyManager.setMessage(response.success, "конвертация прошла успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
        
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {        
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "перевод прошел успешно"); 
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
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
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно удален");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}





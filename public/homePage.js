const logOut = new LogoutButton();
logOut.action = () =>
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  });

// function raid() {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = processResponse;

//     function processResponse(e) {
//         if (xhr.readyState === 4) {
//             location.reload();
//         } else {
//             console.log('Загружаем ...')
//         }
//     }
//     xhr.open('GET', 'employees.json', true);
//     xhr.send();
// }
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const courseTable = new RatesBoard();

ApiConnector.getStocks(response => {
  if (response.success) {
    courseTable.clearTable();
    courseTable.fillTable(response.data);
    setInterval(() => {
      courseTable.clearTable();
      courseTable.fillTable(response.data);
    }, 60000);
  }
});

// function hardReset() {
//   setTimeout(() => (window.location = window.location.href), 3000); //обновление страницы
// }

const coinManager = new MoneyManager();

coinManager.addMoneyCallback = ({ currency, amount }) => {
  ApiConnector.addMoney(
    {
      currency,
      amount
    },
    response => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        coinManager.setMessage(
          !response.success,
          `Успешное пополнеие на ${amount} в ${currency}`
        );
      } else {
        coinManager.setMessage(!response.success, "Ошибка пополнения!");
      }
    }
  );
};

coinManager.conversionMoneyCallback = ({
  fromCurrency,
  targetCurrency,
  fromAmount
}) => {
  ApiConnector.convertMoney(
    {
      fromCurrency,
      targetCurrency,
      fromAmount
    },
    response => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        coinManager.setMessage(
          !response.success,
          `Успешная конвертация из ${fromCurrency} в ${targetCurrency} на ${fromAmount}`
        );
      } else {
        coinManager.setMessage(!response.success, "Ошибка конвертации!");
      }
    }
  );
};

coinManager.sendMoneyCallback = ({ to, currency, amount }) => {
  ApiConnector.transferMoney(
    {
      to,
      currency,
      amount
    },
    response => {
      console.log(response);
      if (response.success) {
        coinManager.setMessage(
          !response.success,
          `Успешный перевод ${to}! Вы перевели ${amount} ${currency}`
        );
      } else {
        coinManager.setMessage(!response.success, response.data);
      }
    }
  );
};

const adress = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  if (response.success) {
    adress.clearTable();
    adress.fillTable(response.data);
    coinManager.updateUsersList(response.data);
  }
});

adress.addUserCallback = ({ id, name }) => {
  ApiConnector.addUserToFavorites(
    {
      id,
      name
    },
    response => {
      if (response.success) {
        adress.clearTable();
        adress.fillTable(response.data);
        coinManager.updateUsersList(response.data);
        //console.log(response.success);
        adress.setMessage(!response.success, `Успех`);
      } else {
        adress.setMessage(!response.success, "Ошибка добавления пользователя!");
      }
    }
  );
};

adress.removeUserCallback = id => {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success) {
      adress.clearTable();
      adress.fillTable(response.data);
      coinManager.updateUsersList(response.data);
      adress.setMessage(!response.success, `Успех`);
    } else {
      adress.setMessage(!response.success, "Ошибка!");
    }
  });
};

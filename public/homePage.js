const logOut = new LogoutButton();
logOut.action = () => ApiConnector.logout(raid);

function raid() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = processResponse;

    function processResponse(e) {
        if (xhr.readyState === 4) {
            location.reload();
        } else {
            console.log('Загружаем ...')
        }
    }
    xhr.open('GET', 'employees.json', true);
    xhr.send();
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

// let profdat = {
//      id: 2,
//      login: `ivan@demo.ru`
//  };
// ProfileWidget.showProfile(profdat);
class ServerMethod {
    constructor(){
        this.url = 'http://localhost:7070/?method='
    }

    allTickets(){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const query = this.url + 'allTickets';

            xhr.open('GET', query, true);
            xhr.responseType = 'text';

            xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const tickets = JSON.parse(xhr.responseText);
                    // console.log(tickets);
                    resolve(tickets); // передаём данные дальше
                } catch (e) {
                    reject(new Error('Невалидный JSON в ответе'));
                }
            } else {
                reject(new Error(`Ошибка HTTP: ${xhr.status} ${xhr.statusText}`));
            }
            };

            xhr.onerror = function () {
                reject(new Error('Сетевая ошибка (CORS, недоступен сервер и т.п.)'));
            };

            xhr.send();
        })
            
    }

    byId(id){
        // const id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'; // подставь реальный ID
        const xhr = new XMLHttpRequest();
        

        return new Promise((resolve,reject) => {
            xhr.open('GET', this.url+`ticketById&id=${id}`, true);
            xhr.responseType = 'text';

            xhr.onload = function () {
                if (xhr.status === 200) {
                    try {
                        const ticket = JSON.parse(xhr.responseText);
                        resolve(ticket);
                    } catch(e) {
                        reject(new Error('anser no valid'))
                    }
                    
                } else if (xhr.status === 404) {
                    reject(console.error('Тикет не найден'));
                } else {
                    reject(console.error('Ошибка:', xhr.status, xhr.statusText));
                }
            };
            xhr.onerror = function () {
                console.error('Сетевая ошибка');
            };

            xhr.send();
        })
    }
            

    deleteById(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', this.url+`deleteById&id=${id}`, true);
        xhr.responseType = ''; // у тебя 204 без тела

        xhr.onload = function () {
            if (xhr.status === 204) {
                console.log('Удалено успешно');
            } else if (xhr.status === 404) {
                console.error('Тикет не найден для удаления');
            } else {
                console.error('Ошибка удаления:', xhr.status, xhr.statusText);
            }
        };            

        xhr.onerror = function () {
            console.error('Сетевая ошибка');
        };

        xhr.send();
    }

    changeTicket(name,description,status){
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.url+'createTicket', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';

        const payload = {
            name: name,
            description: description,
            status: status
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Создан тикет:', xhr.response);
            } else {
                console.error('Ошибка создания:', xhr.status, xhr.statusText, xhr.response);
            }
        };

        xhr.onerror = function () {
            console.error('Сетевая ошибка');
        };

        xhr.send(JSON.stringify(payload));
    }

    updateTicker(id,name,description,status){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', this.url+`updateById&id=${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';

        const payload = {
            status: status,
            description: description,
            name:name
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Обновлённый список тикетов:', xhr.response);
            } else if (xhr.status === 404) {
                console.error('Тикет не найден для обновления');
            } else {
                console.error('Ошибка обновления:', xhr.status, xhr.statusText, xhr.response);
            }
        };

        xhr.onerror = function () {
            console.error('Сетевая ошибка');
        };

        xhr.send(JSON.stringify(payload));
    }
}

export default ServerMethod

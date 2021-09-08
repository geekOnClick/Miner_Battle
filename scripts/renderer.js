let renderer = {
    /**
     * Метод отрисовки (рендоринга) карты. Вызывывает метод отрисовки карты, отрисовывает сетку, отрисовывает новое/первоначальное расположение игроков и золота. Если метоположение игроков совпадает, вызывается метод game.showBoom. После отрисовки карты запускается метод проверки находится ли игрок на координатах золота game.isTakenGold
     * @param {object} currentPlayer Объект текущего игрока для отрисовки
     */
    render(currentPlayer) {
        let map = this.createMap();
        for(let row = 0; row <= config.rowsCount-1; row++){
            let tr = document.createElement('tr');
            map.append(tr);
            for(let col = 0; col <= config.colsCount-1; col++){
                if (player1.y === player2.y && player1.x === player2.x){
                    game.showBoom();
                    if(currentPlayer == player1){
                        player2.x = config.rowsCount-1;
                        player2.y = 0;
                    } else {
                        player1.x = 0;
                        player1.y = 0;
                    }
                }
                if(player1.y === row && player1.x === col){
                    let user = document.createElement('td');
                    user.classList.add('td');
                    user.classList.add('user1');
                    tr.append(user);
                }
                else if(player2.y === row && player2.x === col){
                    let user2 = document.createElement('td');
                    user2.classList.add('td');
                    user2.classList.add('user2');
                    tr.append(user2);
                }
                else if(gold.y === row && gold.x === col){
                    let gold = document.createElement('td');
                    gold.classList.add('td');
                    gold.classList.add('gold');
                    tr.append(gold);
                }
                else {
                    let td = document.createElement('td');
                    td.classList.add('td');
                    tr.append(td);
                }
            }
        }
        game.isTakenGold(currentPlayer);
    },
    /**
     * Метод отрисовывает и возвращает пустую карту (таблицу)
     * @returns {object} возвращает пустую карту (таблицу)
     */
    createMap() {
        let table = document.createElement('table');
        table.classList.add('table');
        document.querySelector('.gameField').append(table);
        return table;
    },

    /**
     * Метод очистки(удаления) карты
     */
    clear() {
    document.querySelector('table').remove();
    },
    /**
     * Метод рандомно определяет новые координаты золота, чистит и рендерит карту.
     */
    renderRandomGold() {
        gold.x = Math.floor(Math.random() * (15 - 0)) + 0;
        gold.y = Math.floor(Math.random() * (15 - 0)) + 0;
        renderer.clear();
        renderer.render();
    }

  
}
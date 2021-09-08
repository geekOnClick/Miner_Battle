let mover = {
    /**
     * Отдает следующую точку, в которой будет находиться игрок
     * @param {int} key Значение нажатой клавиши
     * @param {object} player Объект игрока, который делает ход 
     * @returns {{x:int}{y:int}} Новые координаты игрока для рендеринга
     */
    getNextPosition(key, player) {
        const nextPosition = {
            x: player.x,
            y: player.y
        }
        switch(key){
            case "ArrowDown":
            case "s":
            case "ы":
                if(nextPosition.y == config.rowsCount-1){
                    break;
                }
                nextPosition.y++;
                break;
            case 'ArrowLeft':
            case 'a':
            case 'ф':
                if(nextPosition.x == 0){
                    break;
                }
                nextPosition.x--;
                break;
            case 'ArrowRight':
            case 'd':
            case 'в':
                if(nextPosition.x == config.colsCount-1){
                    break;
                }
                nextPosition.x++;
                break;
            case 'ArrowUp':
            case 'w':
            case 'ц':
                if(nextPosition.y == 0){
                    break;
                }
                nextPosition.y--;
                break; 
        }
        return nextPosition;
    }
}
let game = {
    // свойство для включения/отключения режима чата при наведении на чат. По умолчанию false. При активации чата, останавливается игра.
    playerMessage: false,

    /**
     * Основная логика игры: метод получает нажатую пользователем клавишу, передает ее в метод mover.getNextPosition для построения хода игрока, чистит карту, двигает игрока на новую точку и заново рендерит карту с учетом нового расположения игрока.
     * @param {object} event Событие нажатия на кнопку
     */
    run(event) {
        let currentPlayer = this.getPlayer(event.key);
        const nextPoint = mover.getNextPosition(event.key, currentPlayer);
        renderer.clear();
        currentPlayer.move(nextPoint);
        renderer.render(currentPlayer);
    },

    /**
     * Метод для запуска рендеринга игрового поля. Запускается при первом старте игры и после нажатия пользователем новой клавиши.
     */
    init() {
        renderer.render();
        document.querySelector('body').addEventListener('keydown', () => this.checkEvent(event))
    },
    /**
     * Метод проверяет: а) Включен ли режим чата и нужно ли расценивать нажатую клавишу как ход игрока; б) Если режим чата выключен, то происходит проверка допустимости нажатой клавиши путем сравнения с допустимыми ходами игроков player.availableDirection. Если проверки пройдены, событие нажатие на клавишу передается в основной метод this.run
     * @param {object} event Событие нажатой клавиши
     * @return Прерывает работу события, если проверки не пройдены.
     */
    checkEvent(event) {
        if(this.playerMessage == true){
            return;
        }
        event.preventDefault();
        if (!player1.availableDirection.includes(event.key) && !player2.availableDirection.includes(event.key)) {
            return;
        }
        this.run(event);
    },
    /**
     * Метод определяет игрока, в зависимости от нажатой клавиши согласно допустимым значениям ходов игроков player.availableDirection
     * @param {string} key Значение нажатой клавиши
     * @returns {object} Возвращает игрока, который будет делать ход
     */
    getPlayer(key){
            if(player1.availableDirection.includes(key)){
                 return player1;
            }
            else if (player2.availableDirection.includes(key)){
                 return player2;
             }
     },

     /**
      *  Метод библиотеки sweetalert2, показывает модальное окно с надписью "BOOM" при столкновении игроков.
      */
     showBoom() {
        Swal.fire({
            position: 'center-start',
            icon: 'warning',
            title: 'BOOOM!',
            showConfirmButton: false,
            timer: 600
          })
    },
    /**
     * Проверяем, попал ли игрок на клетку с золотом, если да, то  прибавляем счет (scoreColor). Затем, в зависимости от счета игрока (scoreColor), проверяем победил он или нет.
     * @param {object} player передает на проверку объект конкретного игрока
     */
    isTakenGold(player) {
        if (typeof player == 'undefined') {
            return;
        }
        if(player.x == gold.x && player.y == gold.y){
            if(player == player1){
                player1.scoreColor++;
                document.querySelector('.red_score').innerHTML = player1.scoreColor;
            }
            else if(player == player2) {
                player2.scoreColor++;
                document.querySelector('.blue_score').innerHTML = player2.scoreColor;
            }
            
            if(this.isPlayerWon(player.scoreColor)){
                this.showPlayerWin(player);
                
            }
            else {
                renderer.renderRandomGold()
            }   
        }
    },
    /**
     * Проверяет, равняется ли счет игрока 10 (выиграл ли он в текущей игре). 
     * @param {number} scoreColor Принимает текущий счет игрока для сравнения.
     * @returns {boolean} Возвращает true, если счет игрока = 10 и false если счет != 10.
     */
    isPlayerWon(scoreColor) {
        if(scoreColor == 10){
        return true;
    } 
    else {
        return false;
    }
    },
    /**
     * Метод библиотеки sweetalert2, показывает модальное окно с иформацией о победе конкретного игрока. Запускает перезапуск игрового поля после нажатия на подтверждающую кнопку.
     * @param {object} player Принимает объект текущего игрока
     */
    showPlayerWin(player){
        Swal.fire({
         title: 'Победа!',
         text: `Победил ${player.name} игрок!`,
         icon: 'success',
         confirmButtonText: 'Продолжить',
         showConfirmButton: 'true'
       })
       document.querySelector('.swal2-confirm').addEventListener('click',this.reloadGame);
     },
     /**
      * Перезапускает текущую игру
      */
     reloadGame() {
         document.location.reload();
     }
};
chat.startChat();
game.init();

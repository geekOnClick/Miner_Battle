/**
 * Объект игрока1, здесь будут все свойства и методы с ним
 * x - позиция по X-координате
 * y - позиция по Y-координате
 */
const player1 = {
    name: 'красный',
    x: 0,
    y: 0,
    availableDirection: ['ArrowDown','ArrowLeft','ArrowRight','ArrowUp'],
    scoreColor: 0,
    
/**
 * Двигает игрока по переданному направлению
 * @param {object} nextPoint  передает новое положение игрока
 */
move(nextPoint) {
    this.x = nextPoint.x;
    this.y = nextPoint.y;
}

};

/**
 * Объект игрока2, здесь будут все свойства и методы с ним
 * x - позиция по X-координате
 * y - позиция по Y-координате
 */
const player2 = {
    name: 'синий',
    x: config.rowsCount-1,
    y: 0,
    availableDirection:["w", "ц", "s", "ы", "a", "ф", "d", "в"],
    scoreColor: 0,
    
   /**
 * Двигает игрока по переданному направлению
 * @param {object} nextPoint  передает новое положение игрока
 */
move(nextPoint) {
    this.x = nextPoint.x;
    this.y = nextPoint.y;
}

}


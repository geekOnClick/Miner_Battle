let chat = {
/**
 * Основной метод работы часа. Пишет в переменные все DOM элементы, содержит проверки на пустые Имя и Сообщение, Отрисовывает новые сообщения
 */
startChat(){
// События включения/выключения чата при наведении на блок.
document.querySelector('.chat').addEventListener('mouseover', () =>{
    game.playerMessage = true;
})
document.querySelector('.chat').addEventListener('mouseout', () =>{
    game.playerMessage = false;
})

const noMessagesEl = document.querySelector('.noMessages');
const messagesEl = document.querySelector('.messages');
const textareaEl = document.querySelector('textarea');
const nameInputEl = document.querySelector('input');
const errorTextareaEl = document.querySelector('.errorTextarea');
const errorInputEl = document.querySelector('.errorInput');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');

const messageElClassName = 'message';

sendBtn.addEventListener('click', () => {
    if(textareaEl.value === ""){
        errorTextareaEl.textContent = "Имя и Сообщение не может быть пустым.";
        return;
    } else {
        errorTextareaEl.textContent = ""
    }

    if(nameInputEl.value === ""){
        errorInputEl.textContent = "Имя и Сообщение не может быть пустым.";
        return;
    } else {
        errorInputEl.textContent = ""
    }

    this.hideNoMessagesText(noMessagesEl);

    const messageMarkup = this.getMessageMarkup(textareaEl.value, nameInputEl.value, this.getTime(), messageElClassName);
    messagesEl.insertAdjacentHTML('beforeend', messageMarkup);
    textareaEl.value = "";
    nameInputEl.value = "";
})
/**
 * Функция-обработчик события, очищает чат
 */
clearBtn.addEventListener('click', function() {
    chat.showNoMessagesText(noMessagesEl);
    textareaEl.value = "";
    nameInputEl.value = "";
    const messagesElems = document.querySelectorAll("."+messageElClassName);
    messagesElems.forEach(function(message) {
        message.remove();
    });
});
},
/**
 * Метод скрывает надпись "Сообщений нет"
 * @param {object} noMessagesEl DOM элемент 
 */
hideNoMessagesText(noMessagesEl){
    noMessagesEl.style.display = 'none';
},
/**
 * Метод построения шаблона сообщения
 * @param {string} text Текст сообщения
 * @param {string} author Имя автора сообщения
 * @param {object} time Время отправки сообщения
 * @param {string} messageClass Название класса для сообщения
 * @returns {string} возвращает шаблон сообщения
 */
getMessageMarkup(text, author, time, messageClass) {
    return `<div class="${messageClass}">
                <div>Сообщение: ${text}</div>
                <div>Автор: ${author}</div>
                <div>Время: ${time}</div>
           </div>`;
},
/**
 * Метод определения времени
 * @returns Объект (час,минута, секунды)
 */
getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
},
/**
 * Отрисовывает надпись "Сообщений нет"
 * @param {object} noMessagesEl DOM элемент
 */
showNoMessagesText(noMessagesEl) {
    noMessagesEl.style.display = 'block';
}




}
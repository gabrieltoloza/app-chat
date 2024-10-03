const cuerpoChat = document.querySelector('.app')
const chatBtn = document.querySelector('#btn-chat')
const inputChat = document.querySelector('#text-chat')

const socketClient = io();


chatBtn.addEventListener('click', (event) => {
    event.preventDefault();
    socketClient.emit('init_message', inputChat.value)
    inputChat.value = ''
})


// Subscribiendo/escuchando nueva data desde el servidor
// Subscribiendo/escuchando nueva data desde el servidor
socketClient.on('new_message', (data) => {

    console.log('Nuevo mensaje recibido', data);

    renderMessage(data, data.id === socketClient.id)
})



function renderMessage(data, isOwnMessage) {
    const newMessage = document.createElement('p');
    newMessage.textContent = data.message;
    newMessage.className = isOwnMessage ? 'message own' : 'message other';
    cuerpoChat.appendChild(newMessage);
}






socketClient.on('welcome', data => {
    console.log(data)
})



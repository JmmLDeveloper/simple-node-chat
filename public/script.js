const socket = io('ws://localhost:3000')

socket.emit('join-room',sessionData.room)

const messageInput = document.querySelector('#message-input')
const sendMsgBtn = document.querySelector('#send-message-button')
const messagesContainer = document.querySelector('#messages-container')
const messagesOverflow = document.querySelector('#messages-overflow')

messageInput.addEventListener('keydown',(ev)=> {
  if ( ev.key == 'Enter' )
    sendMessage()
})
sendMsgBtn.addEventListener('click', sendMessage)

socket.on('message',messageToDom)


function sendMessage() {
  const content = messageInput.value;
  if(content.trim().length == 0)
    return;
  const message = {
    date : new Date(),
    content,
    username : sessionData.username
  }
  messageToDom(message)
  socket.emit('message', message)
  messageInput.value = ''
}

function messageToDom(messageData) {
  const msgEl = messageElement(messageData)
  messagesContainer.append(msgEl);
  messagesOverflow.scrollTop = messagesOverflow.scrollHeight;
}



function messageElement({content,date,username}) {
  const div = document.createElement('div');

  const text = `
    <div class="bg-white p-3 rounded-lg border-gray-400 shadow-md border-2 mb-3">
      <header>
          <span class="text-teal-500 ">${username}</span>
          <span class="text-gray-500 ">at ${moment(date).format('h:mm a')} </span>
      </header>
      <main class="text-gray-900">
          ${content}
      </main>
    </div>
  `;
  div.innerHTML = text;
  return  div.firstElementChild;
}

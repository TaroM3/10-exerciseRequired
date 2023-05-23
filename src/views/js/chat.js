// const socket = io()
let socket
let user = ''
const chatBox = document.getElementById('chatBox')
const divChat = document.getElementById('messagesLog')
const username = document.getElementById('username')

Swal.fire({
    title: ' Chat Authentication ',
    input: 'text',
    text: 'Enter your email for this chat',
    inputValidator: value => !value.trim() && 'Please write your email',
    allowOutsideClick: false
}).then(result => {
    user = result.value
    console.log('user: ' + user)
    // document.getElementById('username').innerHTML = user + ': '
    username.innerHTML =  user + ': '
    socket = io()
    
    chatBox.addEventListener('keyup', event => {
        if( event.key == 'Enter') {
            if(chatBox.value.trim().length > 0) {
                socket.emit('message', {
                    user,
                    message: chatBox.value
                })
                chatBox.value = ''
            }
        }
    })
    
    // messages.forEach(element => {
        //     messagesReceived =+ '<p>[<i>'+ element.user + '</i>]: ' +element.message+'</p>'            
        // });
        // messagesLog.innerText = messagesReceived
        socket.on('conversations', messages => {
            let messagesReceived = ''
            console.log(messages)
            console.log(messages.user)
            const messagesLog = document.getElementById('messagesLog')

                // let completedMessage = document.createElement('p')

                let userMessage = document.createElement('i')
                let userMessageText= document.createTextNode('['+messages.user + ']: ')
                userMessage.appendChild(userMessageText)

                let messageContent = document.createElement('p')
                let messageContentText = document.createTextNode(messages.message)
                messageContent.appendChild(userMessage)
                messageContent.appendChild(messageContentText)
                
                // messagesLog.appendChild(userMessage)
                messagesLog.appendChild(messageContent)

            // for(let i = 0; i< messages.length; i++){
                
            //     let completedMessage = document.createElement('p')

            //     let userMessage = document.createElement('i')
            //     let userMessageText= document.createTextNode(messages[i].user + ': ')
            //     userMessage.appendChild(userMessageText)

            //     let messageContent = document.createElement('p')
            //     let messageContentText = document.createTextNode(messages[i].message)
            //     messageContent.appendChild(userMessage)
            //     messageContent.appendChild(messageContentText)
                
            //     // messagesLog.appendChild(userMessage)
            //     messagesLog.appendChild(messageContent)
            // }
            
            // messagesReceived = '<p> [<i>${messages.user}</i>]: ${messages.message}</p> </br>'
            // messagesReceived = messages.message
            // const chatP = document.createElement('p')
            // const chatPText = document.createTextNode(messagesReceived)
            // chatP.appendChild(chatPText) 
            // messagesLog.appendChild(chatP)
            // for (let i= 0; i < messages.length; i++){
            // }
            console.log(messagesReceived)
    })
})

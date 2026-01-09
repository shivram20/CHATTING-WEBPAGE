let socket = io()
let name;
let textarea = document.querySelector("#textarea")
let messagearea = document.querySelector("#message_area")
let username = document.querySelector("#username")

do {
    name = prompt("Enter Your Name :")
} while(!name)

username.append(name)

textarea.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        sendmessage(e.target.value) 
    }
})

//msg function
function sendmessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }
    //append
    appendmessage(msg, "outgoing")
    socket.emit("message", msg)

     textarea.value = ""
}
function appendmessage(msg, type) {
    let maindiv = document.createElement('div');
    let classname = type;
    let usernameclass = 'username';
    maindiv.classList.add(classname, "msg");

    let markup = `
        <h5 class="${usernameclass}">${msg.user}</h5>
        <p>${msg.message}</p>
    `;

    maindiv.innerHTML = markup;
    messagearea.appendChild(maindiv);
}


socket.on("message", (msg) => {
    appendmessage(msg, "incoming")
})
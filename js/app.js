//application running methods

//update chat list
const chatList = document.querySelector(".chat-list");

//get new message
const newChatForm = document.querySelector(".new-chat");
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//update username
const newNameForm = document.querySelector(".new-name");

//update alert message
const updateMsg = document.querySelector(".update-msg");

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();

  //show message
  updateMsg.innerHTML = `Your name updated ot ${newName}`;
  setTimeout(() => (updateMsg.innerHTML = ""), 3000);
});

//update room
const rooms = document.querySelector(".chat-rooms");

rooms.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    //clear old UI
    chatUI.clear();

    //update room name
    const chatroomname = e.target.getAttribute("id");
    localStorage.setItem("chatroom", chatroomname);
    chatroom.updateRoom(chatroomname);

    //fetch chats for updated room
    chatroom.getChats((chat) => {
      chatUI.render(chat);
    });
  }
});

//get username from localstorage
const username = localStorage.username ? localStorage.username : "Unknown";
const chatroomname = localStorage.chatroom ? localStorage.chatroom : "general";

//class instaces
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(username, chatroomname);

//get chats
chatroom.getChats((data) => {
  chatUI.render(data);
  console.log(data);
});

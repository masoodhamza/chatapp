class Chatroom {
  constructor(username, room) {
    this.username = username;
    this.room = room;
    this.chats = db.collection("chats");
    this.unsub;
  }

  // 1. add new chats
  async addChat(message) {
    //get current time
    const now = new Date();

    //create object for firebase
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    //add chat to firestore
    const response = await this.chats.add(chat);
    return response;
  }

  //2. realtime listner to get new chats
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change === "added") {
            //update ui
            callback(change.doc.data());
          }
        });
      });
  }

  //3. updating the username
  updateName(username) {
    this.username = username;
  }

  //4. updating the room
  updateRoom(room) {
    this.room = room;
    console.log(room);
    if (this.unsub) this.unsub();
  }
}

const chatroom = new Chatroom("hamza", "general");

chatroom.getChats((data) => console.log(data));

setTimeout(() => {
  chatroom.updateRoom("general");
  chatroom.getChats((data) => console.log(data));
  chatroom.addChat("hi");
}, 3000);

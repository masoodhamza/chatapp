//methods to render UI

class ChatUI {
  constructor(list) {
    this.list = list;
  }

  //clearing existing chats
  clear() {
    this.list.innerHTML = "";
  }

  //   creating new chats
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });

    const html = `
        <li class = "list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <small class="time">${when}</small>
        </li>
    `;

    this.list.innerHTML += html;
  }
}

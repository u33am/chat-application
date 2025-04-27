//required for front end communication between client and server

// public/js/client.js

const socket = io();
const inboxPeople = document.querySelector(".inbox__people");

let userName = "";
let id;
let typing = false;
let typingTimeout;

const newUserConnected = function () {
  id = Math.floor(Math.random() * 1000000);
  userName = 'user-' + id;
  socket.emit("new user", userName);
  addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
  if (!!document.querySelector(`.${userName}-userlist`)) {
    return;
  }

  const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
  inboxPeople.innerHTML += userBox;
};

// Call once when loaded
newUserConnected();

// New user connects
socket.on("new user", function (users) {
  inboxPeople.innerHTML = '<h4>Active users</h4>'; // Clear and refill
  users.forEach(user => addToUsersBox(user));
});

// User disconnects
socket.on("user disconnected", function (userName) {
  const userDiv = document.querySelector(`.${userName}-userlist`);
  if (userDiv) {
    userDiv.remove();
  }
});

// Chat handling
const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) return;

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
  stopTyping();
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});

// Typing handling
inputField.addEventListener("input", () => {
  if (!typing) {
    typing = true;
    socket.emit("typing", userName);
    typingTimeout = setTimeout(stopTyping, 3000);
  } else {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(stopTyping, 3000);
  }
});

function stopTyping() {
  typing = false;
  socket.emit("stop typing", userName);
}

// Typing display
const fallback = document.querySelector(".fallback");

socket.on("typing", (user) => {
  fallback.innerHTML = `<p><em>${user} is typing...</em></p>`;
});

socket.on("stop typing", () => {
  fallback.innerHTML = '';
});





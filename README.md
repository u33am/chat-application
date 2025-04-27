## Introduction
Personal Website + Chat Application

Overview
This project is a personal/professional website built with HTML, CSS, JavaScript, and Node.js.
It includes:

- A home page introducing myself
- An about page sharing more detailed background and interests
- A real-time interactive chat application using Socket.io

The goal is to demonstrate both static website skills and dynamic real-time communication.

📚 Project Structure
📁 public/
    📁 css/
        📄 demo.css        // Main stylesheet
    📁 js/
        📄 client.js       // Chat frontend JavaScript
📄 index.html              // Home page
📄 about.html              // About me page
📄 chat.html               // Chat application page
📄 index.js                // Node.js server (handles socket.io)
📄 README.md               // This file
📄 commits.pdf             // Git commit history export

💬 Chat Application Features

Feature	Description
Real-time messaging	Messages are instantly delivered between connected users
User activity updates	Notifications are shown when users join or leave the chat
Active users list	Displays all users currently online
Typing indicator	Shows when a user is typing a message

Technical Details:

- Socket.IO is used to handle real-time two-way communication.
- Each client emits events (new user, chat message) to the server.
- The server broadcasts relevant events (new user, chat message, user disconnected) to all connected clients.
- Unique user IDs are assigned automatically to each new connection.

🛠 Development Approach
- HTML5 was used to create semantically correct, validated pages.
- CSS3 (responsive design) ensures compatibility with desktop, tablet, and mobile screens.
- JavaScript (Node.js + Socket.IO) enables the interactive chat.
- Consistent design and a clear navigation sidebar across all pages.

🧠 Challenges Faced
- Setting up the WebSocket server correctly with Socket.IO.
- Handling user join/disconnect events cleanly to update the active users list.
- Implementing responsive layouts for different devices.
- Ensuring that each user received real-time updates from all others.

📝 Validation
- HTML pages have been tested through W3C HTML Validator — 0 major errors.
- CSS stylesheet passes W3C CSS Validator — 0 major errors.
- JavaScript has been tested and debugged to ensure no console errors.

📋 How to Run
1. Install Node.js and npm if not already installed.
2. Navigate to the project directory.
3. Run the server:
node index.js
4. Open your browser and go to:
http://localhost:3000/

👨‍💻 Author
Aamnah Majid

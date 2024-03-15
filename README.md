Qwiz - Real-Time Online Multiplayer Quiz Battle
Qwiz Logo

Live Demo:

https://qwiz.app

Qwiz is an exciting real-time online multiplayer quiz battle application that challenges players' knowledge and reflexes, allowing players to compete against each other in fast-paced quiz battles.


Developed by Fadi Awwad

Features
Real-time multiplayer gameplay
Seamless communication using SocketIO
Dynamic user experience with React and Redux Toolkit
Sleek and modern user interface designed with Material UI
Diverse quiz questions sourced from a third-party API
Leaderboard to showcase top performers
Technologies Used
MongoDB - Database for storing user information and game data (still to be implemented)
Express.js - Backend framework for building APIs and handling server-side logic
React - Frontend library for building interactive user interfaces
Node.js - JavaScript runtime environment for server-side development
SocketIO - Library for enabling real-time, bidirectional communication between the client and server
Redux Toolkit - State management library for efficient and predictable state handling
Material UI - UI component library for creating a polished and responsive user interface

Getting Started
To run Qwiz locally, follow these steps:

Clone the repository:


git clone https://github.com/xbenedict/qwiz.git
Install the dependencies for both the frontend and backend:


cd qwiz/qwiz-frontend
npm install
cd ../qwiz-backend
npm install

Update the SocketIO connection URL:

Open qwiz-frontend/src/socketIOClient.js
Change the line socket = io("https://backend.qwiz.app/"); to socket = io("http://localhost:3000"); to use it locally

Start the development server for both the frontend and backend:

cd qwiz/qwiz-frontend
npm start
cd ../qwiz-backend
npm start
Open your browser and visit http://localhost:3000 to access Qwiz.

Contributing
Please note that contributions to Qwiz are currently not accepted as the application is still in active development. Once the development phase is complete, we will open up opportunities for the community to contribute.

License
Qwiz is released under the MIT License. Feel free to use and modify the code for personal and educational purposes. However, commercial use of the code is not permitted.

Contact
If you have any questions, suggestions, or feedback, please feel free to reach out:

Email: emailfadi@hotmail.com
LinkedIn: linkedin.com/in/fadi-awwad91/
Visit Qwiz.app to experience the thrill of real-time quiz battles and put your knowledge to the test!

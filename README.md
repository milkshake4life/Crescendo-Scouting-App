# Crescendo-Scouting-App
<div align="center">(optional) Project photo</div>
<h1 align="center">589 Crescendo Scouting App</h1>
<p align="center"><strong>One-line description</strong>
<br/>

<h2>About</h2>
<!-- <strong>FILL THIS IN</strong><br/>
Answer these questions: What is your project? Why'd you build it? -->
    The Crescendo Scouting App seeks to trivialize robot scouting during FIRST robotics competitions. By providing users with a platform where they can both store and access robot data, this application greatly optimizes the existing scouting procedures of many FIRST robotics competition (FRC) teams.
    Our team wanted to create a platform for 589 Falkon Robotics to improve its outdated scouting procedures. Now, instead of using cumbersome Google Forms, 589 scouters can fill out intuitive forms built for scouting at FRC competitions, and plan out strategies more effectively by viewing the data in an easy-to-understand way. 

<h2>Goal and requirements</h2>
<!-- <strong>FILL THIS IN</strong><br/>
 Summarize your goals, non-goals, and project requirements from your design doc. Make sure to link your design doc here as well. -->
<ul>
  <li>User-End Goals:
    <ul> 
      <li>Intuitive design for ease of use</li>
      <li>Effective organization of information</li>
      <li>Good UI/UX</li>
      <li>Fully functional app</li>
      <li>Allows users to store data and access past stored data in a manageable format</li>
      <li>Efficient and easy-to-use form for gathering data</li>
    </ul>
  </li>
  <li>Developer-End Goals:
    <ul> 
      <li>Push the app to real users</li>
      <li>Work in a team of developers to produce a tangible product</li>
      <li>Document our work so other developers can replicate and continue improving on the project</li>
      <li>Improve the app based on user feedback</li>
      <li>Eventually transition to open source</li>
    </ul>
   </li>
</ul>
All of this and more can be found on the app's <a href="https://docs.google.com/document/d/1jx93cF06LF3hYVkBG6Cgru9BnOqpPvMuBqvOl-h24wk/edit?usp=sharing">project design document.</a>



 
 <h3>Sprint Goal</h3>
<strong>
David Yu: Defense Checkbox on the robot scouting, Robot disabled Checkbox on the match scouting page, Defense rating for match scouting if the robot is a defensive bot, Add pages for team ranking/leaderboard
 
Jayson Song: make the comments section at the end of the match scouting page.

Christian Kantchev: Research camera feasibility as well as storing pictures for future feature. 

Ethan Lee: Research and plan out future leaderboard feature. 

</strong><br/>

<h2>Key learnings</h2>
<strong>FILL THIS IN</strong><br/>
So... what did you learn? (start this, but **come back to it at the end of the sprint**)

<h2>Running your project</h2>
<!-- <strong>FILL THIS IN</strong><br/> -->
<h3>Prerequisite:</h3>
Install and set up the Expo Go app on a mobile device of choice.

<ul>
    <li>MacOS:
        <ol>
            <li>Download the project from the Github repository (the latest release is the most stable)</li>
            <li>In a terminal instance:
                <ol>
                    <li>As a rule of thumb, <strong>follow instruction prompts given by certain packages in the terminal</strong></li>
                    <li>Install the homebrew package manager from the homebrew <a href="https://brew.sh/">home page</a></li>
                    <li>Install Node.js and NPM (node package manager) via homebrew by following the instructions detailed <a href="https://formulae.brew.sh/formula/node">here.</a> After installing, check the version of node using <i>node -v</i> in the terminal.</li>
                    <li>Install the react-native-cli, by following the instructions detailed <a href="https://formulae.brew.sh/formula/react-native-cli">here.</a></li>
                    <li>Install watchman via <a href="https://formulae.brew.sh/formula/watchman">homebrew.</a> For MacOS users this is a required step.</li>
                    <li>Navigate to the project directory (../Crescendo-Scouting-App) in the terminal. Install expo via the following command: <i>npx install-expo-modules@latest</i></li>
                    <li>Lastly, run the following command to install all required packages: <i>npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar</i></li>
                </ol>
            </li>
        </ol>
    </li>
    <li>Windows:
        <ol>
            <li>Download the project from the Github repository (the latest release is the most stable)</li>
            <li>Install Node.js from the <a href="https://nodejs.org/en/download/current">official installation page.</a></li>
            <li>Follow the instructions in the installation wizard in order to install NPM as well.</li>
            <li>In a powershell instance:
                <ol>
                    <li>Navigate to the project directory (../Crescendo-Scouting-App/) and install expo via the following command: <i>npx install-expo-modules@latest</i></li>
                    <li>Lastly, run the following command to install all required packages: <i>npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar</i></li>
                </ol>
            </li>
    </li>
</ul>

Run the app by entering the main project directory (/Crescendo-Scouting-App/Crescendo-Scouting-App) and running the command: <i>npm run start</i>
Scan the generated QR code using a mobile device camera, and follow the QR code into the Expo Go app, where the functional app will appear.

Eventually, the app will be publicly released on the app store, so users will be able to download the app there. For now, it is still privately released as our team continues to add features and iron out bugs. 

<h2>Misc.</h2>
Feel free to add anything else you want here :)

<h2>Copyright</h2>
This project is licensed under the terms of the MIT license and protected by Udacity Honor Code and Community Code of Conduct. See <a href="LICENSE.md">license</a> and <a href="LICENSE.DISCLAIMER.md">disclaimer</a>.

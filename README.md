# Expense tracker app

Simple react native project about tracking expenses.

## Functionalities of this app

User can switch between recent tab and all expenses tab by toggling the tabs at the bottom of the screen.

Recent expenses filters and show the expenses of the last 7 days while all expense records.

On both screens, users can:<br>
click at the + icon at the top right to add a new expense.<br>
clicking on an expense record allows the user to modify/delete the expense record.

## Running the project locally.

1. download and unzip project.<br>
   open the project in a code editor e.g. Visual Studio Code.<br>
   Requires npm and node.js on your development setup.<br>

2. Requires firebase console as a backend<br>
   Sign up at: `https://console.firebase.google.com/`<br>
   create a new account, then create a new project.<br>
   Create a new realtime database and start as test mode.<br>
   copy the firebase link -> would be used in /util/http.js<br>
   replace the value for const BACKEND_URL<br>

3. Requires a real android or ios phone or an emulator to run the app on.<br>
   On the android or ios pohone, download expo go app from the play store.<br>
   An alterative to a real phone would be to set up android studios on your development setup (to emulate android)<br>
   To emulate an ios phone, you would need a mac and download xcode<br>

4. In the terminal, type in:<br>
   to install dependencies -> npm install<br>
   to run locally -> npm start<br>

   In the terminal, a qr code would appear.<br>
   For using a real android phone connected on the same wifi as your local machine,<br>
   you can scan the qr code on the expo go app installed on your android phone.<br>
   For a real iphone, you can scan the qr code using the camera app.<br>
   If the app is to be ran on an emulator instead:<br>
   Androd studio has to be running an virtual android device.<br>
   or<br>
   Open ios simulator (requires xcode to be installed)<br>

   apk can be found in root folder.
   Alternatively visit this url on the test mobile device:<br>
   https://expo.dev/artifacts/eas/yYwC2ds1hv5hWnMj7jzNt.apk

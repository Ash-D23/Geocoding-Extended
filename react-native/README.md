# HPDF-Team-Task
Team 49 google geocoding app.

This is a geocoding React-Native app that was developed as part of Hasura Product Developement Fellowship(HPDF) by Team 49.

The Google Drive link to the .apk file for **extended idea** is: https://drive.google.com/file/d/13emKwpCan3RBzD_EdhMpLpc5eLeyeWbs/view

The Google Drive link to the .apk file for **initial app** is: https://drive.google.com/file/d/1HdCJ3Cb03JdrhrUwSRBpB19-12C3rS0t/view?usp=sharing

# About the App
The app has two buttons and two rows to enter Source/starting point and destination. You can either enter the name of the source and destination or can enter the coordinates separated by comma. (eg: source-Delhi & destination-chennai || source-28,77 & destination-27,76). onPress the GetDirections button map-markers are set in source(green marker) and destination(red marker) and a direction polyline is plotted between the two.

The second button works the following way -

To get distance and time between two locations. Enter source and destination and press this button. A tab will be visible in bottom of screen displaying distance between points and time of travel.

To get location name for a set of coordinate: Enter latitude in first row and longitude in second row. onPress the get-distance button an alert box will pop up with location name.

To get coordinates for a location name: Enter location name in anyone of two rows and press the button. An alert box pops up with coordinates.

# Steps to setup the app in your PC
This project is bootstrapped with Create-React-Native-App(CRNA).Follow the below steps to setup this app in your PC.

1)Ensure that you have the following installed in your PC.

-Nodejs with npm >= 5 

-Expo client in your android phone. Follow link: https://expo.io/ or you can directly download it from playstore.

-Install CRNA. Run the following command in your terminal: 

 **npm install -g create-react-native-app** 

 For more details:https://facebook.github.io/react-native/docs/getting-started.html

-Java jdk. link: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html. (Java required to build .apk file)

2)git clone this repository. Note: Windows users are recommended to use git Bash for this.

3)Change the directory to this project folder in your terminal.

4)Install native base. Run 

**npm install native-base --save**

For more details: http://nativebase.io/docs/v0.5.13/getting-started

5)Install react-native maps. Run

 **npm install react-native-maps --save**

6)Inside your project folder run 

 **npm start**
 
 A QR code will appear on your terminal screen.

7)Open expo app in your android phone and scan this QR code. You may need to set up a rule in your windows firewall allowing access to port 19000 and 19001 as expo runs on this port.

8)The map and corresponding UI will appear on your phone screen.

9)To edit the code open App.js in the project directory(Preferrably in Atom editor) and make necessary changes and save the file. The changes will be hot reloaded.

# Steps to build an .apk file
Follow the below steps.

1)After installing Java jdk you need to create an API key.


2)Read the expo documentation on MapView for the same: https://docs.expo.io/versions/latest/sdk/map-view.html

-Follow the steps under "If you already have not configured Google Sign In".

-The app.json can be found in your project directory.

-To know SHA1 certificate follow these steps instead of step 9 in expo documentation.

a)run: 

**cd C:\Program Files\Java\jdk1.8.0_151\bin**

b)Inside this directory run: 

**keytool -list -v -keystore C:\Users\Your_Username\ .android\debug.keystore**

Password is most probably: 'android'

(Note: the keystore name might change. Also the 'Your_Username' characters may hinder the process. In that case copy '.android' file outside 'Your_Username' and run: **keytool -list -v -keystore C:\Users\ .android\debug.keystore**. Also note down the 'keystore alias' name)

-Copy the API key (the first text input on the page) into app.json under the android.config.googleMaps.apiKey.


3)cd into your project directory and follow this link to build a .apk or .ipk file: https://docs.expo.io/versions/latest/guides/building-standalone-apps.html

4)After running "exp build:android" command you will be asked whether you want to upload your own keystore or have expo provide one for you. Select 'i want to upload my own keystore' and follow the steps to create a .apk file.

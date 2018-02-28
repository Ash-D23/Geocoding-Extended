Geocoding is the process of converting addresses (like a street address) into geographic coordinates (like latitude and longitude).
This quickstart uses [**hello-react**](https://hasura.io/hub/project/hasura/hello-react/deployment-instructions) as a base to implement the backend and frontend services of the project along with react-native code.

Extended Idea: Travel app which uses data and auth api features of Hasura for people who want to travel from one city to another or a tourism app where people are searching for drivers who can show them places across the city the whole day.

## What does this come with?

* Custom service that integrates with the Google Maps Geocoding API: https://developers.google.com/maps/documentation/geocoding/start 

  *  Allow user to enter an address or a set of latitude/longitude coordinates.
   * Use the backend API to display a Google maps based interface that shows the directions between the source and destination and travel time.
   * Extended with Hasura auth and data apis for authentication and storing data in a database 

### About the App

The App is an extension of Geocoding where we display a basic City travels app where drivers who provide tourism or city travelling facilities can login and enter their details and users who want to tour the city or travel from one city to another can check the cost and duration of travel and list of drivers available in that city

### How to get it running?


In order to get this app running, you must have the following:

1. [hasura CLI tool](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) (hasura).

2. Expo client (XDE). Download from https://expo.io/tools

3. NodeJS

(For more such apps, check out https://hasura.io/hub)


## Deployment instructions

### Basic deployment:

* Press the **Clone & Deploy** button and follow the instructions.
* The `hasura quickstart` command clones the project repository to your local computer, and also creates a **free Hasura cluster**, where the project will be hosted for free.
* A git remote (called hasura) is created and initialized with your project directory.
* Now get your cluster name using `hasura cluster status` and modify the App.js file inside `microservices/ui/app/src` and change the cluster name in from airborne24 -> your cluster-name. 
* Modify the server.js file inside `microservices/api/src` and change the Api key
* Run `git add .`, `git commit`, and `git push hasura master`.
* Run the below command to open your shiny new deployed Geocoding app.
``` shell
$ hasura microservice open ui
```

### Opening the Mobile app (React-Native)

- Open Expo XDE, do a login/signup and click on `Open existing project...`. Browse to the Geocoding-T49 directory and open the react-native folder.
- Once the project loads, click on Share.
- Scan the QR code using the Expo app from your phone (Install from Playstore/Appstore)
- Fully working app will open on your phone

```
Note: You can open the app with any of your desired react-native simulators. We prefer Expo because of its simple onboarding for beginners.
```

## Mobile Version of App (React-native)

![React-native](https://github.com/Ash-D23/Geocoding-T49/blob/master/readme-assets/React-native-2.png)

This is a geocoding React-Native app that was developed as part of Hasura Product Developement Fellowship(HPDF) by Team 49.

The Google Drive link to the .apk file is: https://drive.google.com/file/d/13emKwpCan3RBzD_EdhMpLpc5eLeyeWbs/view

### What's Inside 

The app contains :
* A login/signup screen for drivers where logged in drivers can enter their details
* A Source and Destination map where users can check the distance,duration and cost of travel
* A page where user can enter the city name and it displays a list of drivers available in that city


### Steps to setup the app in your PC
This project is bootstrapped with Create-React-Native-App(CRNA).Follow the below steps to setup this app in your PC.

1) Ensure that you have the following installed in your PC.

-Nodejs with npm >= 5 

-Expo client in your android phone. Follow link: https://expo.io/ or you can directly download it from playstore.

-Install CRNA. Run the following command in your terminal: 

 **npm install -g create-react-native-app** 

 For more details:https://facebook.github.io/react-native/docs/getting-started.html

-Java jdk. link: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html. (Java required to build .apk file)

2) git clone this repository. Note: Windows users are recommended to use git Bash for this.

3) Change the directory to this project folder in your terminal.

4) Install native base. Run 

**npm install native-base --save**

For more details: http://nativebase.io/docs/v0.5.13/getting-started

5) Install react-native maps. Run

 **npm install react-native-maps --save**

6) Inside your project folder run 

 **npm start**
 
 A QR code will appear on your terminal screen.

7) Open expo app in your android phone and scan this QR code. You may need to set up a rule in your windows firewall allowing access to port 19000 and 19001 as expo runs on this port.

8) The map and corresponding UI will appear on your phone screen.

9) To edit the code open App.js in the project directory(Preferrably in Atom editor) and make necessary changes and save the file. The changes will be hot reloaded.

### Backend Api

### This API does the following :
* Generates the distance matrix from the origin and destination address
* Generates the lat,lng for the particular address
* Generates the address from the lat and lng values
* A database with a list of drivers and their details
* Manages Authentication : login/signup 
* The input is passed through the url and output is of the form of json

### Resources used:
* Hasura auth and data API's
* Google Maps Geocoding API- It is a service that provides geocoding and reverse geocoding of addresses.
* Google Maps Distance Matrix API- It is a service that provides travel distance and time for a matrix of origins and destinations, based on the recommended route between start and end points.
* Reverse Geocoding - Reverse geocoding is the process of converting geographic coordinates into a human-readable address.


## Steps to build an .apk file
Follow the below steps.

1) After installing Java jdk you need to create an API key.


2) Read the expo documentation on MapView for the same: https://docs.expo.io/versions/latest/sdk/map-view.html

-Follow the steps under "If you already have not configured Google Sign In".

-The app.json can be found in your project directory.

-To know SHA1 certificate follow these steps instead of step 9 in expo documentation.

a) run: 

**cd C:\Program Files\Java\jdk1.8.0_151\bin**

b) Inside this directory run: 

**keytool -list -v -keystore C:\Users\Your_Username\ .android\debug.keystore**

Password is most probably: 'android'

(Note: the keystore name might change. Also the 'Your_Username' characters may hinder the process. In that case copy '.android' file outside 'Your_Username' and run: **keytool -list -v -keystore C:\Users\ .android\debug.keystore**. Also note down the 'keystore alias' name)

-Copy the API key (the first text input on the page) into app.json under the android.config.googleMaps.apiKey.


3) cd into your project directory and follow this link to build a .apk or .ipk file: https://docs.expo.io/versions/latest/guides/building-standalone-apps.html

4) After running "exp build:android" command you will be asked whether you want to upload your own keystore or have expo provide one for you. Select 'i want to upload my own keystore' and follow the steps to create a .apk file.

## Web version of App (React-JS)

![React-JS](https://github.com/Ash-D23/Geocoding-T49/blob/master/readme-assets/react-js-2.png)

**This webapp lets you enter addresses of a source and a destination, and shows the following-**

1) Distance between the two.

2) Time taken to travel from the source to the destination.

3) A Google Maps link to show the directions.

   If only the coordinates are known, then convert the coordinates to its address first using the coordinates-to-address calculator available on the same webapp.


### Making changes and deploying

* To make changes to the frontend part , browse to `/microservices/ui/app/src` and edit the `App.js` file in the folder according to your app or if you already have an existing code migrate them on to the folder
*To make changes to the backend part, browse to `/microservices/ui/app/src` and edit the server.js file in the folder according to your app or if you already have an existing backend code replace them on to the folder 
* Commit the changes, and perform `git push hasura master` to deploy the changes.

## Contributors
* Ashutosh Kumar (ak6214651@gmail.com) [Twitter](https://twitter.com/Ash23_ssj) 
[GitHub](http://github.com/Ash-D23)
* Abhijit J Kumar (j.abhijith.abhi@gmail.com) [GitHub](http://github.com/abiajk)

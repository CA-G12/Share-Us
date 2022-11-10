# Share-Us-Team7
A free-ticketing platform to share your events, plans and interests.

## **Problem** 
- It is hard sometimes to bring together people that share common interests, and we might find many people who want to meet but cannot manage an event alone and invite others to it.

## **Solution** 
- Share Us is a free-ticketing platform for live experiences. It is where you share with people, make friends and chat with them, find and join events, and explore their interests. Thousands of events are happening every day, join the fun!


## **User Story** 
### As a user, I will be able to:
- Signup and login either with a new account or with google.
- Browse events and filter a group of events by date or event state (upcoming, in-progress, closed).
- Search for a certain event, friend or hashtag.
- See more details about a specific event when clicking on it like the number of the interested and joined people, event duration, etc.
- Chat with friends.
- Join or add interested to an event.
- Check the location of the event in the map.
- Comment my feedback and interests about it as well as delete my comment on the event.
- Open my profile page and edit information as bio, avatar and username.
- Search for my friends and follow them.
- Block useless followers and dumb people.
- Visit other users profile and see their events, and information like their followers, following, etc.
- Check all the events using the calender of the app or google calender and also go to the events I joined. 
- Check my notifications and get notified when there is any event added too.
- Get notified in my gmail of upcoming events I joined.

## **User Journey** 
- When the user enters the website he can create a new account manually or with google. Then, he can see all events from his followers and can filter the events according to their date or status.
- He can add an event by clicking on add event button and an event form will appear to add it with location, hashtag and etc.
- After adding the event and going back to the home page, if he clicked on the read more button on the event card he will be able to join and see the event details such as the event duration, date, and check the location using map, also comment on the event.
- He can search for a specific event, friend, or hashtag in the search input placed in the navbar.
- If he wants to visit his profile page, he can click on the drop-down image in the navbar and click on his name he entered when signing up.
- By clicking on the notification icon he will see all the notifications, if he clicked on the calendar icon he will move to calender page which contains all his joined and interested events. The user can add the event in google calendar too.
- When he clicks on other user's profile, he can see his profile information and all his events, he can also follow, block him or send a message.
- He can check his followers, following or users he blocked by clicking on them and a pop-up panel will appear to him.
- He can check his messages or chat with his friends he followed in the chat page, also he can unsend his message.

## **Prototype** 
### Database Schema
![image](https://cdn.discordapp.com/attachments/1001457072510087190/1029484525501288558/newDB.PNG)
### Figma Design
![image](https://i.imgur.com/QZK9wWt.png)


## **Links**
- [Figma Design](https://www.figma.com/file/eb9XOlKUIJMZaBgIjzBK7P/share-us?node-id=0%3A1)
- [Render Link](https://shareus.onrender.com/)

## **Getting Started**  

To get the application locally:
## Installation 
- Launch the app locally by following the steps:
   ```sh
   git clone https://github.com/CA-G12/Share-Us.git
   cd Share-Us
   npm i 
   cd client
   npm i 
   ```
- Make sure you have installed PostgreSQL and pgcli, then in the `psql` or  `pgcli` terminal:
  ```sh
  CREATE DATABASE {database name};
  CREATE USER {user name} WITH superuser password {password}
  ALTER DATABASE {database name} OWNER TO {user name};
  ```

 - Migrate/build your database 
    ```sh
    npm run build:db
    ```
- Create .env file and add your environment variables : 
  ```sh
    # database urls
    DB_URL=postgres://postgres:<password>@localhost:5432/shareus
    DB_TEST_URL=postgres://postgres:<password>@localhost:5432/shareus_test

    # secret for passport and jwt
    SECRET_KEY=your secret key

    # cloudinary keys in client side
    REACT_APP_CLOUDINARY_CLOUD_NAME=
    REACT_APP_CLOUDINARY_API_KEY=
    REACT_APP_CLOUDINARY_API_SECRET=

    # sendGrid keys
    SENDGRID_EMAIL=
    SENDGRID_API_KEY=
  ```
- To run the server side, you can run `npm run dev` command and to run the client side`cd client & npm run start`.


## **Technologies**

* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/)
* [React Leaflet Map](https://react-leaflet.js.org/)
* [Socket.io](https://socket.io/)
* [Material UI](https://mui.com/)
* [Passport.js](https://www.passportjs.org/)
* [Cloudinary](https://cloudinary.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Firebase](https://firebase.google.com/)
* [Formik](https://formik.org/)
* [FullCalendar](https://fullcalendar.io/)
* [Google Calendar api](https://developers.google.com/calendar/api)
* [SendGrid](https://sendgrid.com/)
* [Node-Cron](https://www.npmjs.com/package/node-cron)

## **Contributors** 

### **Our Amazing Leader**
[Abdallah Abu Amra](https://github.com/aaamra) 

### **Team Members**
[Saif Hayek](https://github.com/SaifHayek)
[Mostafa Balousha](https://github.com/MostafaBalousha123)
[Bakeza Diazada](https://github.com/Bakeza)
[Shams Alkhoudary](https://github.com/shamskhodary)








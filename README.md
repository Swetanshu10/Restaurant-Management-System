# Restaurant-Management-System

# Video demo of the system
(https://youtu.be/L2SVFs8AGmY)

# System Design

![Project system design](https://github.com/user-attachments/assets/01cb869d-e5b4-485a-baa4-f07f4adc56e9)

# Overall System Functionality
This system handles common restaurant management tasks like table booking by users,displaying the menu, user placing order,showing orders to restaurant personnel and taking user reviews. It consists of 2 applications.One is User Application and other is Admin Application. 
# User Application Functionality
User Application has features like Account Management feature(Sign Up, Login, Logout, delete account and change password), Users add/edit their personal details like name and mobile number, they can view the live status(available/not available) of dishes under the menu section, they can select dish's quantity, view cart and total cost, book tables, place and add reviews about the order
# Admin Application Functionality
Admin Application has Login,Logout,change password features, the admin can control the availability of all dishes, Add or edit details about new or existing dishes and check all the placed orders and add comments to each order

# PERFORMANCE OPTIMISATION
1. Image optimisation:- All uploaded images of dishes are compressed & converted to WebP format in admin app using javascript compressor library before saving it on cloud storage. The images are also loaded lazily.
2. Progressive Rendering :- The app has been programmed in such a way that the page is displayed as soon as minimum expected content is present on it, example, on main menu page, the page is displayed when the minimum number of dishes are loaded onto the page.
3. Loading animations are provided to improve responsiveness and UX of the app

# SECURITY
HTTPS hosting, authentication, redirection logic (redirecting to login page if protected pages of the app are directly accessed by unauthorized users), CSP (Content Security Policy), Firebase security rules and Firebase app check are implemented in the app to make it secure and safe

# TECH-STACK
  # FRONT-END
  HTML, CSS, JavaScript: These are front end fundamentals, as this project was my first ever web development project, so I started with fundamentals and used 
  these technologies to develop the front-end.
  # BACK-END
  FireBase: It is Google's app development platform which provides backend services. The reason for choosing a backend as a service platform over developing 
  backend from scratch was speeding up the development process to complete the project within the timeframe. Also using firebase allowed me to focus majorly on 
  front-end ,UI and feature development instead of developing authentication and backend services from scratch. Integrating firebase with frontend was 
  straightforward with Javascript SDK and it also provided HTTPS hosting for my web app in addition to backend services
  # DATABASE
  Cloud Firestore: It is a FireBase NoSQL cloud database. I used this because of its automatic scaling capacity to handle heavy workloads and real time data 
  updates

# MY ROLE
I was working as the full stack developer on this project, devloping user interfaces, integrating Firebase, managing the services used of Firebase, handling the database

# CHALLENGES
1. Developing real time features as it involved replacing every occurence of old data with updated data and accordingly reflecting the same on User Interface.
2. Modelling and strucuturing the data in javascript which was consistent with database format

# EXTRA FEATURES
1. A waiting list can be added for each table, so if that table is already booked, the user can register themselves in waiting list and the particular table gets booked for that person in the waiting list automatically after the current booking
2. Online bill and payment

# LEARNINGS
I learnt how to develop a complete web application, how to show data and responses from backend on user interface and how to make user interface responsive for all devices

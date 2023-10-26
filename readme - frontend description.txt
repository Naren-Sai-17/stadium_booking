Team: 
cse220001052 - P C Uma Mahesh
cse220001049 - Naren Kumar Sai
cse220001064 - S Ruthvik 
cse220001050 - Neerupam
cse220001033 - Jay

Topic of the project: To develop a full stack web application for a Stadium Ticketing Platform.

============================================================================================================================================================================================

This is a React application as frontend.
To start the website, open the terminal and run the following commands (Node.js required):

cd frontend (if not within the directory already)
npm i --force
npm install react-icons --save
npm run start

============================================================================================================================================================================================

Details of the frontend: page construction and structure

The pages are all constructed as various components in React. They will be received by the root HTML file through the React DOM. 
The components are located at frontend\src\components.
All the public files are available within the frontend\public folder, such as images, root HTML, etc.

frontend\src\App.js: this component specifies routes to various other components.
frontend\src\index.js: this is the starting point of the React application which uses App.js and populates the HTML file with the specified elements and components at an id 'root' within the HTML file.
frontend\public\index.html: this is the basic root of the application. All components get rendered here, which is displayed on the website.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Page details: React components in frontend\src\components

The pages are constructed using the following components. All are linked to one another using the 'Link' feature of the 'react-router-dom' library of the React framework.

1. About.js: A component for the about page.
2. BookingPage.js: A component to render the page of booking tickets for a specific event.
3. Card.js: A component for the event cards.
4. Carousel.js: A component for the carousel in the home page.
5. Dashboard.js: The main home page of the application consisting of various highlights and upcoming event details.
6. Events.js: A component to display all existing events with search feature and filters such as city, sport category, price, etc.
7. Home.js: The main landing page of the website, which is shown to all users irrespective of their login status. It consists of various insights about the website with some parallax and UI/UX effects.
8. Left.js and Right.js: Components for the parallax effects used in the Home.js page (under development).
9. Login.js: The second page of the application, prompts interested users to log into the the website with valid credentials or with a valid Google Account.
10. Navbar.js: Consists of the navigation bar seen at the top of most other pages in the site.
11. OffCanvasNavbar.js: A sidebar/menu to display more options.
12. Profile.js: A component to display the user details to a logged in user.

============================================================================================================================================================================================

The node_modules folder will store the requisite modules of node to run the app. .gitignore file is to let git ignore the files specified in it when the repository is uploaded to a public platform such as GitHub.

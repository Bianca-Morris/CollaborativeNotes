# CollaborativeNotes
Rich text editor with real-time collaboration. (MongoDB, Express, React, Electron)
```
Written By: Bianca Morris and Ingrid Zippe
```

## About
Collaborative Notes is a desktop application built with Draft.js, and deployed as a desktop application with Electron. We used webpack to package the front-end as a single-paged React application, rendered with React-Router. To enable real-time collaboration, we used Socket.io to ping our JSON API back end with updates as clients make changes. Data is stored using MongoDB, authentication is handled with Passport.js, and the server is set up with Express.js.

Check out a demo of Bianca walking you through the application here: 

<a href="http://www.youtube.com/watch?feature=player_embedded&v=k9cQ_z52RT0" target="_blank"><img src="http://img.youtube.com/vi/k9cQ_z52RT0/0.jpg" 
alt="Collaborative Notes Demo Video" width="240" height="180" border="10" /></a>
https://youtu.be/k9cQ_z52RT0

This project is currently INCOMPLETE. As such, there are a few bugs and issues that will listed below in future. 

## Testing
Clone the git repository. Navigate to that folder in terminal, and create a file called "env.sh". This is a shell script that we'll use to 
export some environmental variables necessary to test the app (Note: if you know how, you can also just export the variables directly from
the terminal; there's nothing special about the file itself). The app requires two env variables (case sensitive): MONGODB_URI and 
SECRET_KEY.

MONGODB_URI should be a link to an empty mongoDB database. You can create one easily at mLab.com. On the dashboard for the mLab database
you should see two links like these: http://docs.mlab.com/assets/screenshot-connectinfo.png. You'll need to use the second one.

SECRET_KEY should be some random string, and will be used to protect your data.

The final file should be formatted as follows:
export MONGODB_URI="<my-uri-here>"
export SECRET_KEY="<my-key-here>"

Now, save your env.sh file, and run the command "source env.sh" in terminal.

Run the application in dev mode with the command "npm run dev." Remember to source env.sh in terminal before any concurrent iterations of 
the program are run.

## Known Bugs/Issues
- Have to highlight text in editor to change color/font-style
- Entering a document in use by another user, but in an unsaved position, reverts the document to the previously saved version

## To-Do List
#### Interface
- Remove dev links
- Add logout button
- Display collaborator and author names on document page
- Indicate that document has been saved successfully
- Indicate why a document has not been created

#### Functionality
- Improve share interface
- Deploy server to heroku
- Package file as electron distributable

## Policy
You may not claim ownership of or credit for this project.

## Credits
Horizons School of Technology for assigning the project to us, and assisting us throughout our dev cycle.

```
Thanks for taking a look at our program!
```

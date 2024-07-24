# MyFlix Angular Client App

This is the ghpages hosted app for myFLix Angular.

## Overview

myFlix is an app for movie enthusiasts to be able to access information about different movies, directors, and genres whenever they want. Users are also able to create an account and save their favorite movies to their page as well as update their profile information. This app was built with Angular, Node.js, and npm.

## Objective

My objective when building the myFlix angular app was to use a previous server-side database I built, using the MERN stack, to create a client-side app for users. By doing so I was able to expand upon my skills as a frontend developer, adding Angular and Node.js to my toolkit.

## Context

I built myFlix as a project for my CareerFoundry course to show my skills with Angular, Node.js, npm. As well as practicing my ability to comment on my code with TypeDoc for myself and future developers who view the project.

## Duration

This project in total took about 3 weeks to complete. This time also included projects outside of the app itself such as project management, collaboration, providing constructive feedback, and contribution to the tech community.

## The Process:

1. After creating the new app from my terminal I opened the src folder and ran the command to fetch the API I previously created for the myFlix app.

2. I then implemented user registration and login forms using Angular Material.
<img src=src/img/welcomescreen.png height="300"/>

3. After the user registration forms I added welcome component, movie component, and profile components and used Angular's router to implement a route for each view. Along with adding UI to create a better look/feel to the app.
<img src=src/img/moviescreen.png height="300"/>

<img src=src/img/profilescreen.png height="690" />

4. Finally, I added comments in my code using TypeDoc to explain the choices I made in development for myself and other developers who view the project.

## Features

- The app displays a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user can view all movies.
- Each movie has additional information including its director, genre, and a brief description.
- Each movie has a favorite button for the user to add or remove a movie to/from their favorites list.
- Each user has a profile page that shows the account details, favorite movies, and a form to update the user.

## Technology used

- Angular
  - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.
- Node.js and npm package
- Angular Material
- TypeDoc
- GitHub Pages

## Credits

- Lead Developer: Madison Housman
- Mentor: Alfredo Salazar Vélez
- Tutor: Jubril Akolade

Access myFlix-Angular-Client using ng: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Link to live site
https://madison24.github.io/myFlixAngularClient/welcome

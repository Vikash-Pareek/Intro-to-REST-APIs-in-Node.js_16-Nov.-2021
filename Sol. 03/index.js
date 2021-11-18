/*
3.  Create header which will show following items
Home
About
Contact us
    On clicking on the items it will load the pages
*/

const http = require('http');
const fs = require('fs');

const homeRoute = fs.readFileSync('./index.html');
const aboutRoute = fs.readFileSync('./about.html');
const contactUsRoute = fs.readFileSync('./contactus.html');
const errorRoute = fs.readFileSync('./error.html');

const app = http.createServer((request, response) => {
    console.log(request.url);
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/html');

    if (request.url === '/') {
        response.end(homeRoute);
    } else if (request.url === '/about') {
        response.end(aboutRoute);
    } else if (request.url === '/contactus') {
        response.end(contactUsRoute);
    } else {
        response.statusCode = 404;
        response.end(errorRoute);
    }
});

app.listen(8000, () => {
    console.log("App is running on PORT 8000...");
});

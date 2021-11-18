/*
1. Create a REST API for User entity with following fields:
    Username
    Password
    FirstName
    LastName
Create search bar which will search by user name and will create 
an autocomplete list of user which fullfil the criteria.
*/

const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer((request, response) => {
    const data = fs.readFileSync('userData.json', 'UTF-8');
    response.writeHead(200, {'Content-type': 'application/json'});
    const usersData = JSON.parse(data);

    const parsedUrl = url.parse(request.url, true);

    const getUser = () => {
        return usersData;
    }
    
    const findUser = (firstname) => {
        const userData = usersData.find((ele) => ele.firstname === firstname);
        if (typeof userData !== "undefined") return userData;
        else return "User Not Found!";
    }

    if (parsedUrl.pathname === "/") {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end("<h1>Add '/users' to the URL to see users list.</h1>");
        response.end();
    } else if (parsedUrl.pathname === "/users") {
        if (parsedUrl.query.name) {
            const filteredUsersData = findUser(parsedUrl.query.name);
            console.log(filteredUsersData);
            const userData = JSON.stringify(filteredUsersData);
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(`<h3>${userData}</h3>`);
            response.end();
        } else {
            const usersData = getUser();
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(`<table border=1>`);
            response.write(`<tr>`);
            response.write(`<th>Emp. ID</th>`);
            response.write(`<th>Full Name</th>`);
            response.write(`<th>Username</th>`);
            response.write(`<th>Password</th>`);
            response.write(`</tr>`);
            for (let element = 0; element < usersData.length; element++) {
                response.write(`<tr>`);
                response.write(`<td>${usersData[element].id}</td>`);
                response.write(`<td>${usersData[element].firstname} ${usersData[element].lastname}</td>`);
                response.write(`<td>${usersData[element].username}</td>`);
                response.write(`<td>${usersData[element].password}</td>`);
                response.write(`</tr>`);   
            }
            response.write(`</table>`);
            response.end();
        }
    } else {
        response.end("Page Not Found!");
    }
});

app.listen(8000, () => {
    console.log("The server is running on PORT 8000.....");
});
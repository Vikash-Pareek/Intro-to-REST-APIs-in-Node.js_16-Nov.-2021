/*
 2.  Create a student API which will return list of all students.
Create a table which will show all users
Create filter for student branch name and on clicking on filters it will show students accordingly.
*/

const http = require('http');
const fs = require('fs');
const url = require('url');

// const appUrl = "http://localhost:8000/filter?branch=science";

const app = http.createServer((request, response) => {
    console.log(request.url);
    const data = fs.readFileSync('studentsData.json', 'UTF-8');
    response.writeHead(200, {'Content-type': 'application/json'});
    const studentsData = JSON.parse(data);

    const parsedUrl = url.parse(request.url, true);

    console.log(studentsData);

    const scienceBranchStudents = studentsData.filter(ele => {
        return ele.branch === 'Science';
    });

    const commerceBranchStudents = studentsData.filter(ele => {
        return ele.branch === 'Commerce';
    });

    const artsBranchStudents = studentsData.filter(ele => {
        return ele.branch === 'Arts';
    });

    const scienceBranchStudentsMap = scienceBranchStudents.map(ele => {
        return ele.name;
    });

    const commerceBranchStudentsMap = commerceBranchStudents.map(ele => {
        return ele.name;
    });

    const artsBranchStudentsMap = artsBranchStudents.map(ele => {
        return ele.name;
    });
    
    if (parsedUrl.pathname === "/") {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write(`<table border=1>`);
        response.write(`<tr>`);
        response.write(`<th>Roll No.</th>`);
        response.write(`<th>Name</th>`);
        response.write(`<th>Class</th>`);
        response.write(`<th>Branch</th>`);
        response.write(`</tr>`);
        for (let element = 0; element < studentsData.length; element++) {
            response.write(`<tr>`);
            response.write(`<td>${studentsData[element].id}</td>`);
            response.write(`<td>${studentsData[element].name}</td>`);
            response.write(`<td>${studentsData[element].class}</td>`);
            response.write(`<td>${studentsData[element].branch}</td>`);
            response.write(`</tr>`);
        }
        response.write(`</table>`);
        response.end();
    } else if (parsedUrl.pathname === "/filter") {
        if (parsedUrl.query.branch === "Science") {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(`<h1>${scienceBranchStudentsMap}</h1>`);
            response.end();
        } else if (parsedUrl.query.branch === "Commerce") {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(`<h1>${commerceBranchStudentsMap}</h1>`);
            response.end();
        } else if (parsedUrl.query.branch === "Arts") {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(`<h1>${artsBranchStudentsMap}</h1>`);
            response.end();
        } else {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.end(`<h3>Incorrect URL Query Parameter!</h3>`);
        }
    } else {
        response.end("Page Not Found!");
    }
});


app.listen(8000, () => {
    console.log("The server is running on PORT 8000.....");
});

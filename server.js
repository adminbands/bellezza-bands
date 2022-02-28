const http = require("http");
const fs = require("fs");
const express = require("express");
const app = new express();

const PORT = process.env.PORT || "3000";

//new code meant for ussing jquery
//var jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//const { window } = new JSDOM();
//const { document } = (new JSDOM('')).window;
//global.document = document;

//var $ = jQuery = require('jquery')(window);

//app.use(express.static(__dirname + 'public'));

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    let path = "./";/*
    let newArr = (req.url).split(".");*/
    if (req.url == "/") {
        path += "index.html";
        res.statusCode = 200;
    } else if (req.url.includes("html")) {
        switch (req.url) {
            /* case "/":
                 path += "index.html";
                 res.statusCode = 200;
                 break;*/
            case "/gallery.html":
                path += "pages/gallery.html";
                res.statusCode = 200;
                break;
            case "/contact-page.html":
                path += "pages/contact-page.html";
                res.statusCode = 200;
                break;
            case "/about.html":
                path += "pages/about.html";
                res.statusCode = 200;
                break;/*
            case "/logo":
                path += "public/pic/logo.png";
                res.statusCode = 200;
                break;*/
            default:
                //there is a way to redirct home insted of to an 404 page
                //res.setHeader("Location","/");
                //res.statusCode = 301//becuase its a redirect
                path += "pages/404.html";
                res.statusCode = 404;
                break;
        }
    } else if (req.url.includes("png") || req.url.includes("ico") || req.url.includes("jpg")) {
        path += "public/pic" + req.url;
    } else {
        path += "pages/404.html";
        res.statusCode = 404;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {



            res.end(data);
        }
    })
});

server.listen(PORT, () => console.log(`server running at ${PORT}`));

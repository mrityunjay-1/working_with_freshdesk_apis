const express = require("express");
const hbs = require("hbs");
const path = require("path");
const http = require('http');
const socketio = require('socket.io');

const { make_request_to_freshdesk } = require("./index");


const server = express();

socketapp = http.createServer(server);
const io = socketio(socketapp);


io.on('connection', (socket) => {

    // console.log("i found new connection");

    socket.emit("new_message", "Hello from Server!!!");

    socket.on("new", (data) => console.log(data));

})



const public_path = path.join(__dirname, "./public");
const views_path = path.join(__dirname, "./public/templates/views");
const partials_path = path.join(__dirname, "./public/templates/partials");


server.use(express.static(public_path));
server.set("view engine", "hbs");
server.set("views", views_path);
hbs.registerPartials(partials_path);


server.get("/", async (req, res) => {
    try{
        // getting all the tickets

        let path = "/api/v2/tickets"

        make_request_to_freshdesk(path, 'get', null, (err, response) => {
            if(err) throw new Error(err);

            console.log(response.body);

            res.render('index', {
                data: response.body
            });
        });

        
    }catch(e){
        console.log(e);
    }
});


server.get("/create_ticket", async (req, res) => {
    try{

        let path = "/api/v2/tickets";
        let fields = {
            email: "abc@gmail.com",
            subject: "Test Subject - Last Ticket",
            description: "This is newly created ticket by mrityunjay!",
            status: 2,
            priority: 1
        };

        make_request_to_freshdesk(path, 'post', fields, (err, response) => {

            if(err){
                console.log("Error found!\n".repeat(50));
                throw new Error("Error!");
            }

            console.log("Response came for creating_ticket!\n".repeat(50), response.body);

        });


        res.render("create_ticket");

    }catch(e){
        console.log(e);
    }
})



const PORT = process.env.PORT || 8080;
socketapp.listen(PORT, () => {
    console.log("server is up and running on port:", PORT);
})
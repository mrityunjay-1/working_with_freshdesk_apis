const express = require("express");
const hbs = require("hbs");
const path = require("path");

const { make_request_to_freshdesk } = require("./index");


const server = express();


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


server.listen(8080, () => {
    console.log("server is up and running on port:", process.env.PORT);
})
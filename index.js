// creating ticket
var unirest = require('unirest');

var API_KEY = process.env.API_KEY;
var FD_ENDPOINT = process.env.FD_ENDPOINT;

// var PATH = "/api/v2/tickets"; // come from caller

// will prepared by me here
// var URL =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH;

// coming from caller
// var fields = {
//   email: "kumarmrityunjay_@hotmail.com",
//   subject: "Ticket subject",
//   description: "Ticket description.",
//   status: 2,
//   priority: 1
// }

let Request = null;
let auth_res = null ;

// get request
const get_req = (path, type) => {
    
    let url = "https://" + FD_ENDPOINT + ".freshdesk.com"+ path;
    
    if(type === 'get'){
        // for reading data
        Request = unirest.get(url);

    }else if (type === 'post') {
        
        // for creating data
        Request = unirest.post(url);

    } else if (type === 'put') {
        
        // for updating data
        Request = unirest.put(url);

    }else if (type === 'delete'){

        // for deleteing data
        Request = unirest.delete(url);
    
    }else {
    
        // for generalized - i don't know figure out later!
        Request = unirest.get(url);
    
    }

    auth_res = Request.auth({
        user: API_KEY,
        pass: "dummy_password",
        sendImmediately: true
    });
}



// auth_res.type('json')
// // .send(fields)
// .end(function(response){
//   console.log(response.body)
//   console.log("Response Status : " + response.status)
//   if(response.status == 201){
//     console.log("Location Header : "+ response.headers['location'])
//   }
//   else{
//     	console.log("X-Request-Id :" + response.headers['x-request-id']);
//   }
//   });




// function 1 -> get all the tickets
const make_request_to_freshdesk = (path, type, fields, callback) => {
    try{
        
        get_req(path, type);


        auth_res.type('json').send(fields).end((response) => {

            // console.log(response);

            if(response.status >= 200 && response.status < 300){
                console.log("ye chala hai! path = " + path + " , response = ", response.status);

                callback(null, response);

            }else{
                callback("Error aaya hai make_request_to_freshdesk me. " + response, null);
            }
        })

        return ;

    }catch(e){
        console.log("Error aaya hai. make_request_to_freshdesk me\n".repeat("15"), e);
    }

}


// sample response
// {
//     cc_emails: null,
//     fwd_emails: null,
//     reply_cc_emails: null,
//     ticket_cc_emails: null,
//     fr_escalated: false,
//     spam: false,
//     email_config_id: null,
//     group_id: 84000153277,
//     priority: 1,
//     requester_id: 84002548544,
//     responder_id: null,
//     source: 1,
//     company_id: null,
//     status: 2,
//     subject: 'Payment failed?',
//     association_type: null,
//     support_email: null,
//     to_emails: null,
//     product_id: null,
//     id: 1,
//     type: 'Question',
//     due_by: '2021-12-28T13:00:30Z',
//     fr_due_by: '2021-12-24T13:00:30Z',
//     is_escalated: false,
//     custom_fields: {},
//     created_at: '2021-12-23T09:43:55Z',
//     updated_at: '2021-12-23T13:10:30Z',
//     associated_tickets_count: null,
//     tags: [],
//     nr_due_by: null,
//     nr_escalated: false
//   }





// auth_res.type('json').end(function(response){
//   console.log(response.body)
//   console.log("Response Status : " + response.status)
//   if(response.status == 201){
//     console.log("Location Header : "+ response.headers['location'])
//   }
//   else{
//     	console.log("X-Request-Id :" + response.headers['x-request-id']);
//   }
//   });



let functionalities = {
    make_request_to_freshdesk
}


module.exports = functionalities;
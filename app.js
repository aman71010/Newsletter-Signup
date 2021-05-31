
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) =>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = 'https://us6.api.mailchimp.com/3.0/lists/06f81e48cc';
    const options = {
        method: "POST",
        auth: "amangupta:7cd2c2f67990cbd120345f62ae53eac6-us6"
    }

    const request = https.request(url, options, (response)=>{

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        // response.on("data", (data)=>{
        //     console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData);
    request.end();

    
})

app.post("/failure", (req, res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT||3000, () => {
    console.log("server start running on port 3000");
})

// 7cd2c2f67990cbd120345f62ae53eac6-us6 Api keys

// listid 06f81e48cc
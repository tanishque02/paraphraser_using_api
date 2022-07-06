const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios");

const app = express()
const http = require("https");

const options = {
	"method": "POST",
	"hostname": "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
	"port": null,
	"path": "/rewrite",
	"headers": {
		"content-type": "application/json",
		"X-RapidAPI-Key": "0dbef968a7mshfa2f36e0c2e4e90p1ae3e1jsne192536d1758",
		"X-RapidAPI-Host": "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
		"useQueryString": true
	}
};


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(request, response){
  var sentence = request.body.sentence;

  const req = http.request(options, function (res) {
    const chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      const paraphrased = JSON.parse(body);
      response.send("Paraphrased sentence: " + paraphrased.rewrite)
    });
  });
  
  req.write(JSON.stringify({language: 'en', strength: 3, text: sentence}));
  req.end();
  
})


app.listen(3000, function(){
  console.log("Server up and running on port 3000")
})

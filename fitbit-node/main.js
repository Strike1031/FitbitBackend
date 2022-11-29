const express = require("express");
const app = express();


const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
	clientId: "2393JT", // "YOUR_CLIENT_ID",
	clientSecret: "a8611c1fda7e370f325d41fde6dcca6c", //YOUR_CLIENT_SECRET",
});


app.get("/authorize", (req, res) => {
	console.log("authorize"); //debug


	res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:5000/callback'));
});

app.get("/callback", (req, res) => {
	console.log("callback"); //debug


	client.getAccessToken(req.query.code, 'http://localhost:5000/callback').then(result => {
		client.get("/profile.json", result.access_token).then(results => {
			console.log("profile.json");
			res.send(results[0]);
			console.log(results[0]);
		}).catch(err => {
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
});

// launch the server with port 5000
app.listen(5000);

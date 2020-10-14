let express = require("express");
let path = require("path");

let app = express();
let PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let reservations = [
	{
		name: "Persona Apellido",
		phone: "1234567890",
		email: "persona@gmail.com",
		uid: 1
	},
	{
		name: "Persona2 Apellido2",
		phone: "0234567891",
		email: "persona2@gmail.com",
		uid: 2
	}
];

let waitingList = [
	{
		name: "Persona3 Apellido3",
		phone: "9034567812",
		email: "persona3@gmail.com",
		uid: 3
	}
];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
	return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
	return res.json(waitingList);
});

app.post("/api/tables", function(req, res) {
  let newReservation = req.body;
  
  if (reservations.length < 5) {
	reservations.push(newReservation);
	res.json(true);
  } else {
	waitingList.push(newReservation);
	res.json(false);
  }

});

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
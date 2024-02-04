// event listeners
const submitBtn = document.getElementById("checkDay");
const resetBtn = document.getElementById("reset");
const text = document.getElementById("textDiv");
const container = document.getElementById("containerDiv");
const img = document.getElementById("imgDiv");

const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

text.innerHTML = "";
container.innerHTML = "";
img.innerHTML = "";

submitBtn.addEventListener("click", () => {
	today = new Date();
	dayToday = today.getDay();
	container.innerHTML = daysOfWeek[dayToday];
	if (dayToday === 5) {
		text.innerText = "Yes. It is:";
		img.innerHTML = '<img class="reaction" src="/images/yes.jpg">';
        confetti.start(2000, ["red", "#FFFFFF", "cornflowerblue", "pink", "green", "orange", "purple"]);
	} else {
		text.innerText = "No. It is:";
		img.innerHTML = '<img class="reaction" src="/images/no.jpg">';
	}
});

resetBtn.addEventListener("click", () => {
	text.innerText = "";
	container.innerHTML = "";
	img.innerHTML = "";
	confetti.stop();
});

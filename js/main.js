// event listeners
const submitBtn = document.getElementById("scroll");
const locationBtn = document.getElementById("location");
const giftsBtn = document.getElementById("gifts");
const resetBtn = document.getElementById("reset");
const text1 = document.getElementById("text1Div");
const text2 = document.getElementById("text2Div");
const container1 = document.getElementById("container1Div");
const container2 = document.getElementById("container2Div");
const img = document.getElementById("imgDiv");

let photoNum = 0;

text1.innerHTML = "";
text2.innerHTML = "";
container1.innerHTML = "";
container2.innerHTML = "";
img.innerHTML = "";

function reset() {
		text1.innerText = "";
		text2.innerText = ""
		container1.innerHTML = "";
		container2.innerHTML = "";
		img.innerHTML = "";
		confetti.stop();
}

submitBtn.addEventListener("click", () => {
	reset()
	if (photoNum != 3) {
		photoNum = photoNum + 1
		img.innerHTML = '<img class="reaction" src="/images/wedding/' + photoNum + '.jpeg">';
	}
	else {
		photoNum = 1
		img.innerHTML =
			'<img class="reaction" src="/images/wedding/' + photoNum + '.jpeg">';
	}
});

locationBtn.addEventListener("click", () => {
	reset()
	img.innerHTML =
		'<img class="reaction" src="/images/wedding/king_umberto.jpeg">';
	text1.innerText = "King Umberto, 1343 Hempstead Turnpike, Elmont, NY 11003";
	text2.innerText = "5pm";
});

giftsBtn.addEventListener("click", () => {
	reset()
	text1.innerText = "Please no gifts!" 
	text2.innerText = "Instead, if you would like, please make a donation to the Animal Care Centers of NYC or the American Society for the Prevention of Cruelty to Animals";
	container1.innerHTML = "<a href='https://www.nycacc.org/' target='_blank' rel='noopener noreferrer'>ACCNYC</a>";
	container2.innerHTML =
		"<a href='https://www.aspca.org/' target='_blank' rel='noopener noreferrer'>ASPCA</a>";
});

resetBtn.addEventListener("click", () => {
	reset()
});

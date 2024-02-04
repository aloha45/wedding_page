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
	text2.innerText = "July 13, 2024 -- 5pm";
});

giftsBtn.addEventListener("click", () => {
	reset()
	text1.innerText = "Please no gifts!" 
	text2.innerHTML =
		"Instead, if you would like, please make a donation to the <a href='https://www.nycacc.org/' target='_blank' rel='noopener noreferrer'>Animal Care Centers of NYC</a>, New York City's largest animal shelter, or <a href='https://www.educategirls.ngo/donate/' target='_blank' rel='noopener noreferrer'>Educate Girls</a>, a non-profit that focuses on mobilising communities for girls’ education in India’s rural areas.";
});

resetBtn.addEventListener("click", () => {
	reset()
});

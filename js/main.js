// event listeners
const submitBtn = document.getElementById("scroll");
const locationBtn = document.getElementById("location");
const resetBtn = document.getElementById("reset");
const text = document.getElementById("textDiv");
const container = document.getElementById("containerDiv");
const img = document.getElementById("imgDiv");

let photoNum = 0;

text.innerHTML = "";
container.innerHTML = "";
img.innerHTML = "";

submitBtn.addEventListener("click", () => {
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
	img.innerHTML =
		'<img class="reaction" src="/images/wedding/king_umberto.jpeg">';
	text.innerText = "King Umberto, 1343 Hempstead Turnpike, Elmont, NY 11003";
});

resetBtn.addEventListener("click", () => {
	text.innerText = "";
	container.innerHTML = "";
	img.innerHTML = "";
	confetti.stop();
});

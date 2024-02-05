//confetti
var confetti = {
	maxCount: 500, //set max confetti count
	speed: 5, //set the particle animation speed
	frameInterval: 15, //the confetti animation frame interval in milliseconds
	alpha: 1.0, //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false, //whether to use gradients for the confetti particles
	start: null, //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null, //call to stop adding confetti
	toggle: null, //call to start or stop the confetti animation depending on whether it's already running
	pause: null, //call to freeze confetti animation
	resume: null, //call to unfreeze confetti animation
	togglePause: null, //call to toggle whether the confetti animation is paused
	remove: null, //call to stop the confetti animation and remove all confetti immediately
	isPaused: null, //call and returns true or false depending on whether the confetti animation is paused
	isRunning: null, //call and returns true or false depending on whether the animation is running
};

(function () {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;
	var supportsAnimationFrame =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	var colors = [];
	var streamingConfetti = false;
	var animationTimer = null;
	var pause = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.color2 = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function toggleConfettiPause() {
		if (pause) resumeConfetti();
		else pauseConfetti();
	}

	function isConfettiPaused() {
		return pause;
	}

	function pauseConfetti() {
		pause = true;
	}

	function resumeConfetti() {
		pause = false;
		runAnimation();
	}

	function runAnimation() {
		if (pause) return;
		else if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti(timeout, themeColors, min, max) {
		colors = themeColors;
		console.log(colors);
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				}
			);
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute(
				"style",
				"display:block;z-index:999999;pointer-events:none;position:absolute;top:0"
			);
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener(
				"resize",
				function () {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
				},
				true
			);
			context = canvas.getContext("2d");
		}
		var count = confetti.maxCount;
		if (min) {
			if (max) {
				if (min == max) count = particles.length + max;
				else {
					if (min > max) {
						var temp = min;
						min = max;
						max = temp;
					}
					count = particles.length + ((Math.random() * (max - min) + min) | 0);
				}
			} else count = particles.length + min;
		} else if (max) count = particles.length + max;
		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		pause = false;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stop();
		pause = false;
		particles = [];
	}

	function toggleConfetti() {
		if (streamingConfetti) stopConfetti();
		else startConfetti();
	}

	function isConfettiRunning() {
		return streamingConfetti;
	}

	function drawParticles(context) {
		var particle;
		var x, y, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			if (confetti.gradient) {
				var gradient = context.createLinearGradient(x, particle.y, x2, y2);
				gradient.addColorStop("0", particle.color);
				gradient.addColorStop("1.0", particle.color2);
				context.strokeStyle = gradient;
			} else context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15) particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y +=
					(Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();

// event listeners
const welcome = document.getElementById("welcome");

const submitBtn = document.getElementById("scroll");
const locationBtn = document.getElementById("location");
const menuBtn = document.getElementById("menu");
const giftsBtn = document.getElementById("gifts");
const confettiBtn = document.getElementById("confetti");
// const resetBtn = document.getElementById("reset");
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
		submitBtn.value='Photos'
		text1.innerText = "";
		text2.innerText = ""
		container1.innerHTML = "";
		container2.innerHTML = "";
		img.innerHTML = "";
		confetti.stop();
}

window.addEventListener('DOMContentLoaded', function () {
	confetti.start(3000, [
		"red",
		"indigo",
		"cornflowerblue",
		"goldenrod",
		"green",
		"smokewhite",
		"lavender",
	]);
});

submitBtn.addEventListener("click", () => {
	reset()
	submitBtn.value = 'More Photos'
	if (photoNum != 7) {
		photoNum = photoNum + 1
		img.innerHTML = '<img src="/images/wedding/' + photoNum + '.jpeg">';
	}
	else {
		photoNum = 1
		img.innerHTML =
			'<img src="/images/wedding/' + photoNum + '.jpeg">';
	}
});

locationBtn.addEventListener("click", () => {
	reset()
	img.innerHTML =
		'<img src="/images/wedding/king_umberto.jpeg">';
	text1.innerHTML = "King Umberto<br></br>1343 Hempstead Turnpike, Elmont, NY 11003";
	text2.innerText = "July 13, 2024 -- 5pm";
});

menuBtn.addEventListener("click", () => {
	reset();
	img.innerHTML =
		'<img src="/images/wedding/king_umberto.jpeg">';
	text1.innerHTML = "Hot Antipasto: <br></br>Mozzarella Caprese ~ Fried Capellini ~ Fried Calamari ~ Baked Clams<br></br>---<br></br>Penne alla Vodka<br></br>---<br></br>Tossed Salad<br></br>---<br></br>Shrimp Monachina<br></br>Pork Chop Capestrano<br></br>Chicken Parmigiana<br></br>Eggplant Parmigiana<br></br>---<br></br>Cake<br></br>*Vegan, Gluten Free options also available";
	text2.innerHTML = "<br></br>Beverages: Water, Tea, Coffee, Cappucino, Espresso, Beer, Wine, Soda<br></br>**Kids Menu -- Chicken Fingers, French Fries, Pizza, PBJ -- also available";
});

giftsBtn.addEventListener("click", () => {
	reset()
	text1.innerText = "Please no gifts!" 
	text2.innerHTML =
		"<br>Instead, if you would like, please make a donation to:<ul><li><a href='https://www.nycacc.org/' target='_blank' rel='noopener noreferrer'>Animal Care Centers of NYC</a>, New York City's largest animal shelter</li> <li><a href='https://www.educategirls.ngo/donate/' target='_blank' rel='noopener noreferrer'>Educate Girls</a>, a non-profit that focuses on mobilising communities for girls’ education in India’s rural areas</li><ul>";
});

// resetBtn.addEventListener("click", () => {
// 	reset()
// });

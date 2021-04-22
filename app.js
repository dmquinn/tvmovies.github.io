const API_URL_MOVIES =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const API_URL_TV =
	"https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
let SEARCH_API;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const genre = document.querySelector("#genre");
console.log("hello", genre.value);
genre.addEventListener("change", (e) => {
	console.log("hello", e);
});

movieMode();

let topImage;
let tophOne;
let tophTwo;
let tophThree = document.querySelector(".headerhThree");
let random = Math.floor(Math.random() * Math.floor(20));

let mode;
mode = localStorage.getItem("mode");

if (mode === "tv") {
	clearInterval(intervalMovie);

	tvMode();
} else if (mode === "movie") {
	clearInterval(intervalShow);
	movieMode();
}

/////MOVIES/////////////
function movieMode() {
	getMovies(API_URL_MOVIES);

	async function getMovies(url) {
		const res = await fetch(url);
		const data = await res.json();
		showMovies(data.results);
	}

	function showMovies(movies) {
		main.innerHTML = "";

		movies.forEach((movie) => {
			const { title, poster_path, vote_average, overview } = movie;
			const stars = document.createElement("h6");
			stars.classList.add("stars");
			const movieEl = document.createElement("div");
			movieEl.classList.add("movie");
			movieEl.setAttribute("data-toggle", "modal");
			movieEl.setAttribute("data-target", "#largeModal");

			const sidebar = document.createElement("div");
			sidebar.classList.add("sideMovies");
			movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview"><a href="#" data-taget="#largeModal" data-toggle="modal">
          
          ${overview}</a>
        </div>
		`;

			if (!poster_path.includes("null")) {
				main.appendChild(movieEl);
				document.body.appendChild(sidebar);
			}
		});
		function showHeaderMovies() {
			const topImage = document.querySelector(".imageHeader");
			const tophOne = document.querySelector(".headerhOne");
			const tophTwo = document.querySelector(".headerhTwo");
			const tophThree = document.querySelector(".headerhThree");
			const random = Math.floor(Math.random() * Math.floor(20));
			const firstImage = movies[random];
			topTop = IMG_PATH + firstImage.backdrop_path;
			topImage.style.backgroundImage = `url("${topTop}")`;
			tophOne.innerHTML = firstImage.title;
			tophTwo.innerHTML = firstImage.overview;
			tophThree.innerHTML = `Average Score: ${firstImage.vote_average}`;
		}
		showHeaderMovies();
		const intervalMovie = setInterval(() => {
			showHeaderMovies();
		}, 9000);
		document.querySelector(".tvTab").addEventListener("click", () => {
			clearInterval(intervalMovie);
		});
	}

	function getClassByRate(vote) {
		if (vote >= 8) {
			return "good";
		} else if (vote >= 5) {
			return "medium";
		} else {
			return "bad";
		}
	}

	form.addEventListener("input", async function (e) {
		e.preventDefault();
		const headImg = document.querySelector(".imageHeader");
		const headerOne = document.querySelector(".headerhOne");
		const headerTwo = document.querySelector(".headerhTwo");
		const headerThree = document.querySelector(".headerhThree");
		const overlay = document.querySelector(".overlay");

		headImg.style.height = "0px";
		headerOne.style.opacity = "0%";
		headerTwo.style.opacity = "0%";
		headerThree.style.opacity = "0%";
		overlay.style.opacity = "0%";

		const searchTerm = e.target.value;
		const img = document.querySelector("img");

		if (searchTerm) {
			getMovies(
				'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="' +
					searchTerm
			);
			this.tick = this.tick.bind(this);
			this.onInput = this.onInput.bind(this);
			// search.value = "";
		} else {
			window.location.reload();
		}

		clearList();
	});
	setTimeout(
		function () {
			getTitles();
		},

		1000
	);
}
let clearList = () => {
	var allImg = document.querySelectorAll("IMG");
	if (allImg.length === 0) {
		document.createElement("div");

		return makeImages(data.results);
	}
	var oldDiv = document.querySelector("div");
	oldDiv.remove();
};

/////SHOWS////////////////////////////////
function tvMode() {
	getShows(API_URL_TV);

	async function getShows(url) {
		const res = await fetch(url);
		const data = await res.json();
		showShows(data.results);
	}

	function showShows(shows) {
		main.innerHTML = "";

		shows.forEach((show) => {
			const { name, poster_path, vote_average, overview } = show;
			const sidebar = document.createElement("div");
			sidebar.classList.add("sideShows");
			const movieEl = document.createElement("div");
			movieEl.classList.add("movie");
			movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${name}">
            <div class="movie-info">
          <h3>${name}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
		`;
			if (!poster_path.includes("null")) {
				main.appendChild(movieEl);
				document.body.appendChild(sidebar);
			}
		});
		function showHeaderTv() {
			const topImage = document.querySelector(".imageHeader");
			const tophOne = document.querySelector(".headerhOne");
			const tophTwo = document.querySelector(".headerhTwo");
			const tophThree = document.querySelector(".headerhThree");
			const random = Math.floor(Math.random() * Math.floor(20));
			const firstImage = shows[random];
			topTop = IMG_PATH + firstImage.backdrop_path;
			topImage.style.backgroundImage = `url("${topTop}")`;
			tophOne.innerHTML = firstImage.name;
			tophTwo.innerHTML = firstImage.overview;
			tophThree.innerHTML = `Average Score: ${firstImage.vote_average}`;
		}
		showHeaderTv();
		intervalShow = setInterval(() => {
			showHeaderTv();
		}, 9000);
		document.querySelector(".movieTab").addEventListener("click", () => {
			movieMode();
			clearInterval(intervalShow);
		});
	}

	function getClassByRate(vote) {
		if (vote >= 8) {
			return "good";
		} else if (vote >= 5) {
			return "medium";
		} else {
			return "bad";
		}
	}

	form.addEventListener("input", async function (e) {
		e.preventDefault();
		tvMode();
		const headImg = document.querySelector(".imageHeader");
		const headerOne = document.querySelector(".headerhOne");
		const headerTwo = document.querySelector(".headerhTwo");
		const headerThree = document.querySelector(".headerhThree");
		const overlay = document.querySelector(".overlay");

		headImg.style.height = "0px";
		headerOne.style.opacity = "0%";
		headerTwo.style.opacity = "0%";
		headerThree.style.opacity = "0%";
		overlay.style.opacity = "0%";

		const searchTerm = e.target.value;
		const img = document.querySelector("img");
		if (searchTerm) {
			getShows(
				'https://api.themoviedb.org/3/search/tv?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="' +
					searchTerm
			);
			this.tick = this.tick.bind(this);
			this.onInput = this.onInput.bind(this);
			search.value = "";
		} else {
			window.location.reload();
		}
	});
}
let title = "";
let embedCode = "";
function getTitles() {
	const aTag = document.querySelectorAll(".movie");
	console.log(aTag);
	for (let i = 0; i < aTag.length; i++) {
		aTag[i].addEventListener("click", () => {
			console.log("click");
			title = aTag[i].childNodes[1].alt;
			youtube();
			// setVideo();
		});
	}
}

async function youtube() {
	await fetch(
		`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDUppjf_r8veyOTZQ9PCFwlburDc9693-c&type=video&q=${title}` +
			`trailer`
	)
		.then((result) => {
			const newRes = result.json();
			return newRes;
		})
		.then((newRes) => {
			embedCode = newRes.items[0].id.videoId;
		})
		.catch((err) => {
			console.log(err.response);
		});
	const iframe = document.querySelector("iframe");
	iframe.setAttribute("src", `https://www.youtube.com/embed/${embedCode}`);
}

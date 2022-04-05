
// TMDB API

const API_KEY = "api_key=89257f3876826ef233d76da77aed065f"
const BASE_URL = "https://api.themoviedb.org/3/"
const API_URL = BASE_URL+"discover/movie?sort_by=popularity.desc&"+API_KEY
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = BASE_URL+"search/movie?"+API_KEY

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getMovies(API_URL)

function getMovies(url){
    fetch(url)
    .then(res => res.json()).then(data =>{
        console.log(data.total_results)
        if(data.total_results === 0){
            main.innerHTML=""
            let img = document.createElement("img")
            img.setAttribute("src","https://www.bing.com/th/id/OGC.3b378d53f780a689b6a9da238dfa3dfa?pid=1.7&rurl=http%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2017%2f09%2f404-gif-8.gif&ehk=e5I3q%2fjkKsZoji1HZxOvci9TkyR0r6Ml3%2bf079I%2bNrc%3d")
            main.append(img)
        }else{
            showMovies(data.results)
        }

    })
    .catch(err =>{
        console.log("err",err)
    })
}

function showMovies(data) {
    main.innerHTML=""
    data.forEach(movie => {
        //object distructuring data;
        const{title,poster_path,vote_average,overview} = movie
        const movieEl = document.createElement("div")

        // use the classList API to remove and add classes
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" 
            alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">
                ${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                    ${overview}
            </div>`

            main.appendChild(movieEl);
    })
}

function getColor(vote){
    if(vote >= 8){
        return"green"; 
    } 
    else if (vote >=5){
        return"orange"
    }
    else{
        return "red"
    }
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm)
    if(searchTerm){
        getMovies(SEARCH_URL+"&query="+searchTerm)
    }
    else{
        showMovies(API_URL)
    }
})
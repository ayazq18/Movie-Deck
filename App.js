let movies = [];
let currentPage = 1;
const renderMovies = (movies)=>{
    const moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = '';
    movies.map((movie)=>{
        const{poster_path, title, vote_average, vote_count} = movie;
        let listItem = document.createElement("li");
        listItem.className='card';
        listItem.innerHTML = `
        <img
            class="poster"
            src=https://image.tmdb.org/t/p/original/${poster_path}
            alt="movie-title"
        />
        <p class="title">${title}</p>
        <section class="vote-favouriteIcon">
            <section class="vote">
                <p class="vote-count">${vote_count}</p>
                <p class="vote-average">${vote_average}</p>
            </section>
            <i class="fa-regular fa-heart fa-2xl" id="favorite-icon"></i)
        </section>`
        moviesList.appendChild(listItem);
    })
}
async function fetchMovies (page){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
        const result = await response.json();
        movies = result.results;
        renderMovies(movies);
    }
    catch(error){
        console.log(error);
    }
}
fetchMovies(currentPage);

// sort
//sort by rating
let firstsortByRating = true;
let firstsortByRatingButton = document.getElementById("sort-by-rating");
firstsortByRatingButton.addEventListener("click",sortByRating)
function sortByRating(){
    let sortedMovies;
    if(firstsortByRating){
        sortedMovies = movies.sort((a,b)=> a.vote_average - b.vote_average);
        firstsortByRatingButton.innerText = `Sort by rating (most to least)`;
        firstsortByRating = false;
    } else if (!firstsortByRating){
        sortedMovies = movies.sort((a,b)=> b.vote_average - a.vote_average);
        firstsortByRatingButton.innerText = `Sort by rating (least to most)`;
        firstsortByRating = true;
    }
    renderMovies(sortedMovies);
}
let firstsortByDate = true;
let firstsortByDateButton = document.getElementById("sort-by-date");
firstsortByDateButton.addEventListener("click",sortByDate)
function sortByDate(){
    let sortedMovies;
    if(firstsortByDate){
        sortedMovies = movies.sort((a,b)=>new Date (a.release_date) - new Date (b.release_date));
        firstsortByDateButton.innerText = `Sort by date (latest to oldest)`;
        firstsortByDate = false;
    } else if (!firstsortByDate){
        sortedMovies = movies.sort((a,b)=> new Date (b.release_date) - new Date (a.release_date));
        firstsortByDateButton.innerText = `Sort by rating (oldest to latest)`;
        firstsortByDate = true;
    }
    renderMovies(sortedMovies);
}
    
//pagination

let prevButton = document.getElementById("prev-button");
let pageNumberButton = document.getElementById("page-number-button");
let nextButton = document.getElementById("next-button");
prevButton.disabled = true;

prevButton.addEventListener("click", ()=>{
    currentPage--;
    fetchMovies(currentPage);
    pageNumberButton.innerText = `Current Page: ${currentPage}`;
    if(currentPage === 1){
        prevButton.disabled = true;
        nextButton.disabled = false;
    } else{
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
})
nextButton.addEventListener("click", ()=>{
    currentPage++;
    fetchMovies(currentPage);
    pageNumberButton.innerText = `Current Page: ${currentPage}`;
    if(currentPage === 3){
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else{
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
})


//search

// let searchInp = document.getElementById("search-input");
// let searchbtn = document.getElementById("search-button");

// const getData = ()=>{
//     searchbtn.addEventListener("click", ()=>{
//         fetchMovies(movies);
//     })
// }

// const doSomeMagic = function (fn, delay) {
//     let timer;
    
//     return function(){
//         let context = this,
//         args = arguments;
//     clearTimeout(timer);
//        timer = setTimeout(() => {
//             getData.apply(context, arguments);
//         }, delay);
//     }
// }

// const betterFunction = doSomeMagic(getData, 1000);

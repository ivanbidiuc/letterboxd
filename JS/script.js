// const api_key = 'a89b0700b3e3de04639603191d2a8a5a'
// const url = 'https://api.themoviedb.org/3/search/movie?api_key=a89b0700b3e3de04639603191d2a8a5a';


$(document).ready(() => {
    getInitialMovies();
    $(".content-main-nav-menus--search").on("keydown", setSearchQuery);
  });
  
  const getInitialMovies = async () => {
    const BASE_URL =
      "https://api.themoviedb.org/3/discover/movie?api_key=a89b0700b3e3de04639603191d2a8a5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 ";
    try {
      const data = await axios.get(BASE_URL);
      const movies = data.data.results;
      

        let movies = "";
    for (let i = 0; i < 12; i++) {
      movies += `
      <div class="content-movies-movies-movie" onClick="setMovieToStorage(${data.data.results[i].id})">
          <a href="./movie.html"> 
            <img class="content-movies-movies-movie--img" src="https://image.tmdb.org/t/p/w500${data.data.results[i].poster_path}"
            alt="" />
          </a>
        </div>
      `;
    }
          
          return `${result}
            <div class="content-movies-movies-movie" onClick="setMovieToStorage(${item.id})">
              <a href="index.html"> 
                <img class="content-movies-movies-movie--img" src="https://image.tmdb.org/t/p/w500${item.poster_path}"
                alt="" />
                </a>
            </div>`;
        });
  
      $(".content-movies-movies").html(movies);
    } catch (error) {
      console.error(error);
    }
  };
  
  const setMovieToStorage = (id) => {
    sessionStorage.setItem("id", id);
  };
  
  const setSearchQuery = (event) => {
    if (event.key === "Enter") {
      sessionStorage.setItem("search", event.target.value);
      window.location.replace("/search.html");
    }
  };
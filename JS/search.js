$(document).ready(() => {
    getData();
    $(".content-main-nav-menu--search").on("keypress", setSearchQuery);
  });
  
  let firstPage = 1;
  let foundMovie = {};
  
  const getData = async (page) => {
    const storageSearch = sessionStorage.getItem("search");
  
    let BASE_URL = "";
    if (page === undefined)
      BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${storageSearch}&api_key=a89b0700b3e3de04639603191d2a8a5a&language=en-US&page=1&include_adult=false`;
    else {
      BASE_URL = `https://api.themoviedb.org/3/search/movie?query=${storageSearch}&api_key=a89b0700b3e3de04639603191d2a8a5a&language=en-US&page=1&include_adult=false&page=${page}`;
    }
  
    axios.get(BASE_URL).then((data) => {
      foundMovie = data.data;
      listMovies(foundMovie);
    });
  };
  
  const listMovies = async (newMovie) => {
    try {
      const movies = newMovie.results.reduce((result, movie, key) => {
        if (key === 1)
          return `
            <div class="search-item">
            <a href="./page1.html">
            <img class="search-item-img"
                src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onClick="setMovieToStorage(${movie.id})" alt="No Photo" />
            </a>
                <div class="search-item-info">
                <p class="search-item-info-title">${movie.title}</p>
                <p class="search-item-info-alternatives">${movie.release_date}</p>
                <p class="search-item-info-directed-by">${movie.vote_average} rating</p>
            </div>
        </div>
            `;
    //     // result pentru prima iteratie este [object, object]
    //     return `${result}
    //       <div class="search-item">
    //       <a href="./page1.html">
    //       <img class="search-item-img"
    //           src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" onClick="setMovieToStorage(${movie.id})" alt="No Photo" />
    //       </a>
    //           <div class="search-item-info">
    //           <p class="search-item-info-title">${movie.title}</p>
    //           <p class="search-item-info-alternatives">${movie.release_date}</p>
    //           <p class="search-item-info-directed-by">${movie.vote_average} rating</p>
    //       </div>
    //   </div>
    //       `;
    //   });
  
      $(".search").html(movie);
      generatePagination();
    } catch (error) {
      console.error(error);
    }
  };
  
  const generatePagination = () => {
    let pages = "";
    if (foundMovies.total_pages < 5) {
      for (let i = firstPage; i <= total_pages; i++) {
        pages += `
        <button class="pagination-page-btn" name="${i}" type="button" onclick="goToPage()">
          ${i}
        </button>`;
      }
    } else {
      for (let i = firstPage; i <= firstPage + 4; i++) {
        pages += `
        <button class="pagination-page-btn" name="${i}" type="button" onClick="goToPage()">
          ${i}
        </button>`;
      }
    }
  
    $(".pagination-page").html(pages);
    $(".pagination-page-btn").on("click", goToPage);
  };
  
  const determineFirstPage = (action) => {
    if (
      (firstPage === 1 && action === "-") ||
      (firstPage + 4 === foundMovie.total_pages && action === "+")
    )
      return;
    if (action === "+") {
      firstPage += 1;
    } else firstPage -= 1;
    generatePagination();
  };
  
  const goToPage = (event) => {
    console.log(event, "Enter");
    getData(event.target.name);
  };
  
  const setSearchQuery = (event) => {
    if (event.key === "Enter") {
      sessionStorage.setItem("search", event.target.value);
      window.location.replace("/search.html");
    }
  };
  
  const setMovieToStorage = (id) => {
    sessionStorage.setItem("id", id);
  };
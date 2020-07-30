$(document).ready(() => {
    getInitialMovie();
    $(".content-main-nav-menus--search").on("keypress", setSearchQuery);
  });
  
  const getInitialMovie = async () => {
    try {
      const id = sessionStorage.getItem("id")
      
      const BASE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=a89b0700b3e3de04639603191d2a8a5a&language=en-US`;
      const movieData = await axios.get(BASE_URL);
      const { data } = movieData;
      console.log("data",data)
  
      $(".movie-info-col1-cover").replaceWith(`
      <img class="movie-info-col1-cover"
      src="https://image.tmdb.org/t/p/w500/${data.poster_path}" />
      `);
  
      $(".movie-info-col2-info-title").replaceWith(`
      <p class="movie-info-col2-info-title">${data.original_title}</p>
      `);
  
      $(".movie-info-col2-info-year").replaceWith(`
      <p class="movie-info-col2-info-year">${data.release_date.substring(
        0,
        4
      )}</p>
      `);
  
      $(".movie-info-col2-description-title").replaceWith(`
      <p class="movie-info-col2-description-title">${data.tagline}</p>
      `);
  
      $(".movie-info-col2-description").replaceWith(`
      <p class="movie-info-col2-description">${data.overview}</p>
      `);
  
      $(".movie-info-col3-rating-chart-stars > p:eq(0)").replaceWith(`
      <p>${data.vote_average}</p>
      `);
  
      $(".movie-info-col3-rating-header > p:eq(1)").replaceWith(`
      <p>${data.vote_count} voters</p>
      `);
  
      $(".movie-info-col1-feedback-heart-count").replaceWith(`
      <p class="movie-info-col1-feedback-heart-count">${data.popularity}</p>
      `);
    } catch (error) {
      console.error(error);
    }
  };
  
  const setSearchQuery = (event) => {
    if (event.key === "Enter") {
      sessionStorage.setItem("search", event.target.value);
      window.location.replace("/search.html");
    }
  };
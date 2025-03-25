import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjgwOTZmZmQxYzE2ZDYyMDhmOTRlMTM5MTVmODRlYyIsIm5iZiI6MTcwNjU0NTIyNS42NzYsInN1YiI6IjY1YjdkMDQ5YTI4NGViMDE2MzBiMzE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MMCEZ4A4pHAgOHlTDX74aOC2Qy0zxNV26z5_kLCEeKE",
  },
};

export const fetchTrandingMov = async () => {
  const response = await axios.get(`/trending/movie/day`, {
    ...options,
    params: { page: 1 },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data;
};

export const fetchSearchMovies = async (query) => {
  const response = await axios.get("/search/movie", {
    ...options,
    params: { query, include_adult: false, language: "en-US" },
  });
  return response.data;
};

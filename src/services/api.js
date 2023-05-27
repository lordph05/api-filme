import axios from "axios";

// base da URL:https://api.themoviedb.org/3/
// URL API:https://api.themoviedb.org/3/movie/now_playing?api_key=bada18072595d0f33e8ec5fe08bcc5b4&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;
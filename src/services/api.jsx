import axios from 'axios'

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=5fb1f4d5f8ff21bc465bd4c62dff615e&language=pt-BR

const api = axios.create({
   baseURL: 'https://api.themoviedb.org/3/'
})

export default api
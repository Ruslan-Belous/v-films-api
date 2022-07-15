import axios from 'axios'

export default axios.create({
    baseURL: `https://www.omdbapi.com/?apiKey=cba49d12`,
})

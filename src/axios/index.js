import axios from 'axios'

export default axios.create({
    baseURL: `https://www.omdbapi.com/?apiKey=cba49d12`,
    // params: {
    //     apikey: 'cba49d12',
    // }
    // headers: {
    //     Authorization: 'cba49d12'
    // }
    // paramsSerializer: (params) => {
    //     const serializedParams = qs.stringify(params, { arrayFormat: 'repeat' });
    //     return `${serializedParams}&APPID=${APIconfig.apiKey}`;
    // }
})

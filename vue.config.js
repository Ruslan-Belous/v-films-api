module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/v-movie-api/'
        : '/'
}
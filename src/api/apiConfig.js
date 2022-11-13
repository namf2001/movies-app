const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '465cf8eefacfc5d0c97f08ef9efa8e1f',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    w780Image: (imgPath) => `https://image.tmdb.org/t/p/w780/${imgPath}`,
    w1280Image: (imgPath) => `https://image.tmdb.org/t/p/w1280/${imgPath}`,
    w1920Image: (imgPath) => `https://image.tmdb.org/t/p/w1920/${imgPath}`,
    // img poster
}

export default apiConfig;
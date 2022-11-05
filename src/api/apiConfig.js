const apiConfig = {
    apiKey: '465cf8eefacfc5d0c97f08ef9efa8e1f',
    baseUrl: 'https://api.themoviedb.org/3',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    backdropImage: (imgPath) => `https://image.tmdb.org/t/p/w1280${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;

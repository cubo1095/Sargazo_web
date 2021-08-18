document.addEventListener('DOMContentLoaded', () => {
    const elementosCarousel = document.querySelectorAll('.carousel');

    M.Carousel.init(elementosCarousel, {
        duration: 150,
        dist: -80,
        numVisible: 3,
        shift: 5,
        indicators: true,

    })
});
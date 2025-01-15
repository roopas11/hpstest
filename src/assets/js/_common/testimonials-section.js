//--------------------------------------------------
// Science

window.addEventListener('DOMContentLoaded', (event) => {

    let quotes = new Swiper(".quotes", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 10000,
            disableOnInteraction: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });    

});

//--------------------------------------------------
// Common - Phone Section

window.addEventListener('DOMContentLoaded', (event) => {

    let mm = gsap.matchMedia();

    mm.add("(min-width: 760px)", (context) => {

        let copySlider = new Swiper(".copy-slider", {
            direction: "vertical",
            slidesPerView: 1,
            speed: 600
        });

        const phoneSection = document.querySelector(".phone-section");
        const pinnedContainer = phoneSection.querySelector(".pinned-container");
        const slides = phoneSection.querySelectorAll(".swiper-slide");

        // Pin 
        ScrollTrigger.create({
            trigger: phoneSection,
            start: "top top", 
            end: "bottom bottom",
            pin: pinnedContainer,
            // markers: true,
        });

        slides.forEach((slide, i) => {

            ScrollTrigger.create({
                trigger: phoneSection,
                start: (pinnedContainer.offsetHeight * i) + " center",
                //markers: true,
                onEnter: function(){
                    copySlider.slideTo(i);
                    phoneSection.classList.add("slide-" + i);
                },
                onLeaveBack: function(){
                    copySlider.slideTo(i - 1);
                    phoneSection.classList.remove("slide-" + i);
                }
            });
        });

        return () => {
            // Cleanup section
            copySlider.destroy(true, true);
        };
    });


});
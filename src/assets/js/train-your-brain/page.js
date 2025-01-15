//--------------------------------------------------
// Consumer

window.addEventListener('DOMContentLoaded', (event) => {

    //--------------------------------------------------
    // Hero (Fade In/Out)

        let characters = new Swiper(".characters", {
            slidesPerView: 1,
            loop: true,
            speed: 2000,
            effect: "fade",
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
        });

    //--------------------------------------------------
    // Pin Benefits
      
        let mm = gsap.matchMedia();

        mm.add("(min-width: 760px)", () => {

            const benefits = document.querySelector('.benefits');
            let benefitsWidth = benefits.offsetWidth; 
            benefitsWidth = benefitsWidth + 3000; // help slow the scroll down a bit

            // Horizontal scrolling benefits 
            let horizontalSections = gsap.utils.toArray(".benefits .benefit");

            gsap.to(horizontalSections, {
                xPercent: -100 * (horizontalSections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: benefits,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (horizontalSections.length - 1),
                    end: "+=" + benefitsWidth,
                    // markers: true,
                }
            });

            return () => {
                benefits.removeAttribute("style");
            };

        });

        
});




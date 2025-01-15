//--------------------------------------------------
// Science

window.addEventListener('DOMContentLoaded', (event) => {

    let mm = gsap.matchMedia();

    mm.add("(min-width: 760px)", () => {

        const brainSection = document.querySelector('.brain-section');
        const pinnedContainer = brainSection.querySelector('.pinned-container');
        const panels = brainSection.querySelectorAll(".text-container");

        let sectionHeight = panels[0].offsetHeight;
        let totalHeight = sectionHeight * (panels.length - 1); 

        gsap.set(panels[0], {autoAlpha:1});
        let currentSection = panels[0];

        function updateClass(old, current){
            old.classList.remove('active');
            current.classList.add('active');
        }

        function scrollForwards(newSection){
            if (newSection !== currentSection) {
                gsap.fromTo(currentSection, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -100, duration: .4});
                gsap.fromTo(newSection, {autoAlpha: 0, y: 100}, {autoAlpha: 1, y: 0, duration: .6});
                updateClass(currentSection, newSection);
                currentSection = newSection;
            }
        }
        function scrollBackwards(newSection){
            if (newSection !== currentSection) {
                gsap.fromTo(currentSection, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 100, duration: .4});
                gsap.fromTo(newSection, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0, durration: .6});
                updateClass(currentSection, newSection);
                currentSection = newSection;
            }
        }
        
        ScrollTrigger.create({
            trigger: brainSection,
            start: 'top top',
            end: "+=" + totalHeight,
            pin: pinnedContainer,
            // markers: true,
        });
    
        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top top-=" + (i - 0.5)  * sectionHeight,
                end: "bottom top-=" + (i - 0.5)  * sectionHeight,
                onEnter: self => self.isActive && scrollForwards(panel),
                onEnterBack: self => self.isActive && scrollBackwards(panel),
            });
        });

        return () => {
            panels.forEach((panel) => {
                panel.removeAttribute("style");
            });
            
        };

    });

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

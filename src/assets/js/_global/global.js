//--------------------------------------------------
// Global

    //--------------------------------------------------
    // Cookies

        function getCookie(cName) {
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); //to be careful
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
            })
            return res;
        }

        function setCookie(cName, cValue, cExpires) {
            let date = new Date();
            date.setTime(date.getTime() + (cExpires * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = cName + "=" + cValue + ";"  + expires + "; path=/; SameSite=Strict;";
        }

        function deleteCookie(cName) {
            document.location.reload();
            document.cookie = cName + "=no; Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        }


//--------------------------------------------------
// On Load

    window.addEventListener('DOMContentLoaded', (event) => {

         //--------------------------------------------------
        // Add GA   

            function deployAnalyticsScript(status) {
                gtag('set', {'GA4_Active': status});

                // Create event to trigger in GTM to load GA script - this event checks the status of "GA4_Active". If true triggers the GA tracking
                window.dataLayer.push({
                    'event': 'ConsentConfiguredEvent'
                });
            }

        //--------------------------------------------------
        // Cookies Accepted  

            const cookies = document.getElementById('cookies');
            const acceptCookies = cookies.querySelector('.accept-cookies');
            const denyCookies = cookies.querySelector('.deny-cookies');
            let cookiesAccepted = getCookie("cookiesAccepted");

            if (cookiesAccepted) { 
                deployAnalyticsScript(cookiesAccepted);
            } else {
                cookies.classList.add('active');
            }

            acceptCookies.addEventListener('click', function(e) {
                e.preventDefault();
                setCookie('cookiesAccepted', true, 180);
                cookies.classList.remove('active');
                deployAnalyticsScript(true);
            });

            denyCookies.addEventListener('click', function(e) {
                e.preventDefault();
                setCookie('cookiesAccepted', false, 180);
                cookies.classList.remove('active');
                deployAnalyticsScript(false);
            });

        //--------------------------------------------------
        // Smooth scroll - using Lenis
        
            const lenis = new Lenis()
                
            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            
            requestAnimationFrame(raf);

        //--------------------------------------------------
        // JS Enabled / Disabled state

            document.getElementsByTagName("body")[0].className = document.getElementsByTagName("body")[0].className.replace("js-disabled", "js-enabled");

        //--------------------------------------------------
        // Mobile Menu Toggle

            const menuToggle = document.querySelector('.menu-toggle');

            if(menuToggle) {
                menuToggle.addEventListener("click", (event) => {
                    event.preventDefault();
                    menuToggle.classList.toggle('active');
                });
            }
            
        //--------------------------------------------------
        // Min 760

            let mm = gsap.matchMedia();

            mm.add("(min-width: 760px)", () => {

                //--------------------------------------------------
                // Main blur movement
            
                    const mainBlur = document.querySelector('.animated-blur');

                    gsap.to(mainBlur, {
                        xPercent: "random(-5, 5)",
                        yPercent: "random(-5, 5)",
                        rotate: "random(-10, 10)",
                        ease: "power1.inOut",
                        duration: 6,
                        repeat:-1,
                        repeatRefresh:true,
                    });

                //--------------------------------------------------
                // Connecting Lines

                    const connectors = document.querySelectorAll('.connect');

                    connectors.forEach(connector => {
                        const line = connector.querySelector('line');
                        const bullet = connector.querySelector('.bullet');
                        const pathLength = line.getTotalLength();

                        gsap.to(line, {
                            strokeDasharray: pathLength,
                            scrollTrigger: {
                                trigger: connector,
                                start: "top 80%",
                                end: "bottom 50%",
                                scrub: true,
                                // markers: true
                            }
                        });

                        gsap.to(bullet, {
                            scale: 1,
                            scrollTrigger: {
                                trigger: connector,
                                start: "90% 50%",
                                end: "bottom 20%",
                                scrub: true,
                                // markers: true
                            }
                        });
                    });

                //--------------------------------------------------
                // Animate Sections in

                    const animSection = gsap.utils.toArray('.animated-section');

                    animSection.forEach(section => {

                        gsap.from(section, { 
                            y: 100,
                            autoAlpha: 0,
                            scrollTrigger: {
                                trigger: section,
                                // start: "top 90%",
                                end: "top 70%",
                                scrub: true,
                                markers: false
                            }
                        })
                    });

                //--------------------------------------------------
                // Animate Staggered Elements

                    ScrollTrigger.batch(".animated-stagger", {
                        onEnter: elements => {
                            gsap.from(elements, {
                                autoAlpha: 0,
                                y: 100,
                                stagger: .3
                            });
                        }
                    });

            }); // min 760

        //--------------------------------------------------
        // Above the fold

            const animFirst = gsap.utils.toArray('.animated-first');

            animFirst.forEach(section => {

                gsap.from(section, { 
                    y: 100,
                    autoAlpha: 0,
                })
            });

        //--------------------------------------------------
        // Add class to animated element

            const animItems = gsap.utils.toArray('.animated-item');

            animItems.forEach(elem => {

                ScrollTrigger.create({
                    trigger: elem,
                    start: "top 60%",
                    end: "bottom 0",
                    toggleClass: "active",
                    // markers: true
                })

            });

        //--------------------------------------------------
        // Video Modals

            document.querySelectorAll(".video-trigger").forEach((d) => d.addEventListener("click", playVideos));
            const body = document.body;

            function playVideos(e) {
                
                e.preventDefault();
                video(e.currentTarget.dataset.url);

                // Save currently focused element
                focusedElementBeforeModal = document.activeElement;

                body.classList.add("video-active");

                var videoWrap = document.createElement("div");
                videoWrap.setAttribute("id", "video-wrapper");
                document.body.appendChild(videoWrap);

                const wrapper = document.getElementById("video-wrapper");
                wrapper.classList.add("active");

                const startModal = `<div class="video-container"><div class="video">`;
                const finishModal = `</div></div>`;

                // Get the video URL from data attribute
                const url = this.dataset.url;

                // Youtube
                if (url.indexOf("youtube") !== -1 || url.indexOf("youtu") !== -1) {
                    const ytUrl = [this.dataset.url];

                    var i,
                    r,
                    regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

                    for (i = 0; i < ytUrl.length; ++i) {
                    r = ytUrl[i].match(regExp);

                    document.getElementById(
                        "video-wrapper"
                    ).innerHTML = `${startModal}<iframe width="560" height="315" title="YouTube Video" src='https://www.youtube.com/embed/${r[1]}?rel=0&autoplay=1&playlist=${r[1]}' frameborder="0" allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>${finishModal}`;
                    }
                } else if (url.indexOf("vimeo") !== -1) {
                    const vimeoURL = this.dataset.url;
                    const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

                    const match = vimeoURL.match(regExp);

                    if (match) {
                        document.getElementById(
                            "video-wrapper"
                        ).innerHTML = `${startModal}<iframe title="Vimeo" src="https://player.vimeo.com/video/${match[2]}?autoplay=1&loop=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>${finishModal}`;
                    } 
                } else if (url.indexOf("mp4") !== -1 || url.indexOf("m4v") !== -1) {
                    document.getElementById(
                    "video-wrapper"
                    ).innerHTML = `${startModal}<video controls playsinline autoplay><source src='${this.dataset.url}' type="video/mp4"></video>${finishModal}`;
                }

                // Create a clickable overlay that can close the modal
                let overlay = document.createElement('div');
                overlay.setAttribute("class", "video-overlay");
                videoWrap.appendChild(overlay);

                overlay.addEventListener("click", (event) => {
                    event.preventDefault();
                    videoClose();
                });

                // Create button with click event
                let btn = document.createElement("button");
                btn.setAttribute("class", "js-close-modal video-close");
                btn.innerHTML = "<span class='off-screen'>Close modal</span>"

                let container = videoWrap.querySelector('.video-container');
                container.appendChild(btn);

                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    videoClose();
                });

                // Trap focus inside the modal
                const modal = wrapper.querySelector('.video-container');

                // Find all focusable elements inside the modal
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])');
                const firstFocusableElement = focusableElements[0];
                const lastFocusableElement = focusableElements[focusableElements.length - 1];

                modal.addEventListener('keydown', trapTabKey);

                function trapTabKey(e) {
                    if (e.key === 'Tab') {
                        // Shift + Tab
                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusableElement) {
                                e.preventDefault();
                                lastFocusableElement.focus();
                            }
                        } else {
                            // Tab
                            if (document.activeElement === lastFocusableElement) {
                                e.preventDefault();
                                firstFocusableElement.focus();
                            }
                        }
                    }
                }

                // Focus the first element inside the modal
                firstFocusableElement.focus();
            }

            // Close and cleanup modal
            function videoClose(){
                body.classList.remove("video-active");    
                const wrapper = document.getElementById("video-wrapper");
                wrapper.parentNode.removeChild(wrapper);

                // Restore focus to the element that had focus before the modal opened
                focusedElementBeforeModal.focus();
            };

            // Init
            function video(url){};
  
    });

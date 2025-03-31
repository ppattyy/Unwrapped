document.addEventListener("DOMContentLoaded", function () {

    ScrollReveal().reveal('#title1', { 
        duration: 1000, 
        origin: 'left', 
        distance: '80px' 
    });

    ScrollReveal().reveal('.index', { 
        duration: 5000, 
        origin: 'left', 
        distance: '80px' 
    });

    ScrollReveal().reveal('.hero-description', { 
        duration: 3000, 
        origin: 'bottom', 
        distance: '30px' 
    });

    ScrollReveal().reveal('.hero-buttons', { 
      duration: 2100, 
      origin: 'bottom', 
      distance: '0px' 
    });

    ScrollReveal().reveal('#features', {
        duration: 1000,
        origin: 'bottom',
        distance: '50px',
        delay: 200,
        reset: true
    });

    ScrollReveal().reveal('.tracks', {
        duration: 1500,
        origin: 'bottom',
        distance: '70px',
        reset: false
    });

    ScrollReveal().reveal('.artists', {
        duration: 1500,
        origin: 'bottom',
        distance: '70px',
        delay: 400,
        reset: false
    });

    ScrollReveal().reveal('.genre', {
        duration: 1500,
        origin: 'bottom',
        distance: '70px',
        reset: false,
        delay: 600
    });
});

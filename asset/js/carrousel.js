const carousels = {
    photo: {
        element: document.getElementById('photoCarousel'),
        dotsContainer: document.getElementById('photoCarouselDots'),
        currentIndex: 0,
        itemCount: 3
    },
    video: {
        element: document.getElementById('videoCarousel'),
        dotsContainer: document.getElementById('videoCarouselDots'),
        currentIndex: 0,
        itemCount: 3
    }
};

function initCarousels() {
    Object.keys(carousels).forEach(type => {
        createDots(type);
        updateCarousel(type);
    });
}

function createDots(type) {
    const carousel = carousels[type];
    for (let i = 0; i < carousel.itemCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(type, i);
        carousel.dotsContainer.appendChild(dot);
    }
}

function moveCarousel(type, direction) {
    const carousel = carousels[type];
    
    // Pause all videos in the current carousel
    if (type === 'video') {
        const videos = carousel.element.querySelectorAll('video');
        videos.forEach(video => video.pause());
    }
    
    carousel.currentIndex += direction;
    
    if (carousel.currentIndex < 0) {
        carousel.currentIndex = carousel.itemCount - 1;
    } else if (carousel.currentIndex >= carousel.itemCount) {
        carousel.currentIndex = 0;
    }
    
    updateCarousel(type);
}

function goToSlide(type, index) {
    const carousel = carousels[type];
    
    // Pause all videos in the current carousel
    if (type === 'video') {
        const videos = carousel.element.querySelectorAll('video');
        videos.forEach(video => video.pause());
    }
    
    carousel.currentIndex = index;
    updateCarousel(type);
}

function updateCarousel(type) {
    const carousel = carousels[type];
    const translateX = -carousel.currentIndex * 100;
    carousel.element.style.transform = `translateX(${translateX}%)`;
    
    const dots = carousel.dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === carousel.currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Support for swipe on mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe(type) {
    if (touchEndX < touchStartX - 50) {
        moveCarousel(type, 1);
    }
    if (touchEndX > touchStartX + 50) {
        moveCarousel(type, -1);
    }
}

Object.keys(carousels).forEach(type => {
    const container = type === 'photo' ? 
        document.querySelector('.carousel-container') : 
        document.querySelector('.video-carousel-container');
    
    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(type);
    });
});

// Initialize on page load
initCarousels();
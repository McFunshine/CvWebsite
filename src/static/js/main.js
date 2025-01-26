// Add any interactive functionality here
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site loaded');

    // Carousel functionality
    const carousel = document.querySelector('.project-carousel');
    const cards = Array.from(carousel.querySelectorAll('.project-card'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    let currentIndex = 0;
    const totalCards = cards.length;

    function getCardWidth() {
        // Get the actual computed width of a card including gap
        const firstCard = cards[0];
        const style = window.getComputedStyle(firstCard);
        const width = firstCard.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 32; // 2em gap
        return width + marginRight;
    }

    let cardWidth = getCardWidth();

    // Recalculate on window resize
    window.addEventListener('resize', () => {
        cardWidth = getCardWidth();
        moveToIndex(currentIndex);
    });

    function updateButtonStates() {
        prevButton.disabled = currentIndex <= 0;
        // Allow scrolling until the last card is fully visible
        nextButton.disabled = currentIndex >= totalCards - 2;
    }

    function moveToIndex(index) {
        carousel.style.transform = `translateX(-${index * cardWidth}px)`;
        updateButtonStates();
    }

    function moveCarousel(direction) {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        if (direction === 'next' && currentIndex < totalCards - 2) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }
        moveToIndex(currentIndex);
    }

    // Initial button states
    updateButtonStates();

    // Event listeners
    nextButton.addEventListener('click', () => {
        moveCarousel('next');
    });

    prevButton.addEventListener('click', () => {
        moveCarousel('prev');
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        carousel.style.transition = 'none';
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        carousel.style.transition = 'transform 0.5s ease-in-out';
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0 && currentIndex < totalCards - 2) {
                moveCarousel('next');
            } else if (diff < 0 && currentIndex > 0) {
                moveCarousel('prev');
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            moveCarousel('prev');
        } else if (e.key === 'ArrowRight' && currentIndex < totalCards - 2) {
            moveCarousel('next');
        }
    });

    // Optional: Auto-play
    // setInterval(nextSlide, 5000);
}); 
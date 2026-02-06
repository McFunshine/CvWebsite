// Add any interactive functionality here
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site loaded');

    // Format the job hunt end date
    const dateElement = document.querySelector('[data-auto-update="job-hunt-end"]');
    if (dateElement) {
        const date = new Date(dateElement.textContent);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
        dateElement.textContent = formattedDate;
    }

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

    // Endorsement Carousel functionality
    const endorsementCarousel = document.querySelector('.endorsement-carousel');
    if (endorsementCarousel) {
        const endorsementCards = Array.from(endorsementCarousel.querySelectorAll('.endorsement-card'));
        const endorsementPrevButton = document.querySelector('.endorsement-button.prev');
        const endorsementNextButton = document.querySelector('.endorsement-button.next');

        let endorsementIndex = 0;
        const totalEndorsements = endorsementCards.length;

        function getEndorsementCardWidth() {
            const firstCard = endorsementCards[0];
            const style = window.getComputedStyle(firstCard);
            const width = firstCard.offsetWidth;
            const gap = 32; // 2em gap
            return width + gap;
        }

        let endorsementCardWidth = getEndorsementCardWidth();

        window.addEventListener('resize', () => {
            endorsementCardWidth = getEndorsementCardWidth();
            moveEndorsementToIndex(endorsementIndex);
        });

        function updateEndorsementButtonStates() {
            const visibleCards = window.innerWidth <= 768 ? 1 : 2;
            endorsementPrevButton.disabled = endorsementIndex <= 0;
            endorsementNextButton.disabled = endorsementIndex >= totalEndorsements - visibleCards;
        }

        function moveEndorsementToIndex(index) {
            endorsementCarousel.style.transform = `translateX(-${index * endorsementCardWidth}px)`;
            updateEndorsementButtonStates();
        }

        function moveEndorsementCarousel(direction) {
            const visibleCards = window.innerWidth <= 768 ? 1 : 2;
            endorsementCarousel.style.transition = 'transform 0.5s ease-in-out';
            if (direction === 'next' && endorsementIndex < totalEndorsements - visibleCards) {
                endorsementIndex++;
            } else if (direction === 'prev' && endorsementIndex > 0) {
                endorsementIndex--;
            }
            moveEndorsementToIndex(endorsementIndex);
        }

        updateEndorsementButtonStates();

        endorsementNextButton.addEventListener('click', () => {
            moveEndorsementCarousel('next');
        });

        endorsementPrevButton.addEventListener('click', () => {
            moveEndorsementCarousel('prev');
        });

        // Touch support for endorsements
        let endorsementTouchStartX = 0;

        endorsementCarousel.addEventListener('touchstart', e => {
            endorsementTouchStartX = e.changedTouches[0].screenX;
            endorsementCarousel.style.transition = 'none';
        });

        endorsementCarousel.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = endorsementTouchStartX - touchEndX;
            const visibleCards = window.innerWidth <= 768 ? 1 : 2;

            endorsementCarousel.style.transition = 'transform 0.5s ease-in-out';
            if (Math.abs(diff) > 50) {
                if (diff > 0 && endorsementIndex < totalEndorsements - visibleCards) {
                    moveEndorsementCarousel('next');
                } else if (diff < 0 && endorsementIndex > 0) {
                    moveEndorsementCarousel('prev');
                }
            }
        });
    }
}); 
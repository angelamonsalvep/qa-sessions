document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const slideNumberEl = document.getElementById('slideNumber');
    const totalSlides = slides.length;

    function updateUI() {
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
        progressBar.style.width = `${((currentSlideIndex + 1) / totalSlides) * 100}%`;
        slideNumberEl.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }

    function changeSlide(direction) {
        if (currentSlideIndex + direction >= 0 && currentSlideIndex + direction < totalSlides) {
            slides[currentSlideIndex].classList.remove('active');
            if (direction > 0) {
                slides[currentSlideIndex].classList.add('previous');
            } else {
                slides[currentSlideIndex + direction].classList.remove('previous');
            }
            currentSlideIndex += direction;
            slides[currentSlideIndex].classList.remove('previous');
            slides[currentSlideIndex].classList.add('active');
            updateUI();
        }
    }

    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') changeSlide(1);
        else if (e.key === 'ArrowLeft') changeSlide(-1);
    });

    let touchstartX = 0;
    document.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX; });
    document.addEventListener('touchend', e => {
        const touchendX = e.changedTouches[0].screenX;
        if (touchendX < touchstartX - 50) changeSlide(1);
        if (touchendX > touchstartX + 50) changeSlide(-1);
    });

    updateUI();
});

(function() {
    window.initImageSlider = function(containerId, imageUrls, options) {
        const { slideSpeed = 0.5, autoPlayInterval = 3000, transitionEffect = 'fade' } = options;
        let imagesLoaded = 0;
        let index = 0;

        const sliderContainer = document.getElementById(containerId);
        if (!sliderContainer) {
            console.error(`No element found with id "${containerId}"`);
            return;
        }

        // Create and style the slider container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides-container';
        slidesContainer.style.display = 'flex';
        slidesContainer.style.transition = `transform ${slideSpeed}s ease-in-out`;
        slidesContainer.style.width = '100%';
        slidesContainer.style.position = 'relative';
        sliderContainer.appendChild(slidesContainer);

        function createSlide(imageUrl) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.minWidth = '100%';
            slide.style.boxSizing = 'border-box';
            slide.style.position = 'relative';
            slide.style.overflow = 'hidden';
            slide.style.transition = `opacity ${slideSpeed}s ease-in-out`;

            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100%';
            img.style.verticalAlign = 'middle';
            img.style.borderRadius = '10px';
            img.style.objectFit = 'cover';

            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded === imageUrls.length) {
                    showSlide(index);
                    autoPlay();
                }
            };

            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        }

        imageUrls.forEach(createSlide);

        const prevButton = document.createElement('button');
        prevButton.className = 'slider-button prev-button';
        prevButton.textContent = '‹';
        prevButton.style.position = 'absolute';
        prevButton.style.top = '50%';
        prevButton.style.left = '10px';
        prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        prevButton.style.color = 'white';
        prevButton.style.border = 'none';
        prevButton.style.padding = '10px';
        prevButton.style.cursor = 'pointer';
        prevButton.style.transform = 'translateY(-50%)';
        prevButton.style.borderRadius = '50%';
        prevButton.style.fontSize = '24px';
        prevButton.style.transition = 'background-color 0.3s, transform 0.3s';
        sliderContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.className = 'slider-button next-button';
        nextButton.textContent = '›';
        nextButton.style.position = 'absolute';
        nextButton.style.top = '50%';
        nextButton.style.right = '10px';
        nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        nextButton.style.color = 'white';
        nextButton.style.border = 'none';
        nextButton.style.padding = '10px';
        nextButton.style.cursor = 'pointer';
        nextButton.style.transform = 'translateY(-50%)';
        nextButton.style.borderRadius = '50%';
        nextButton.style.fontSize = '24px';
        nextButton.style.transition = 'background-color 0.3s, transform 0.3s';
        sliderContainer.appendChild(nextButton);

        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.style.position = 'absolute';
        pagination.style.bottom = '10px';
        pagination.style.left = '50%';
        pagination.style.transform = 'translateX(-50%)';
        pagination.style.display = 'flex';
        pagination.style.gap = '8px';
        sliderContainer.appendChild(pagination);

        function createPaginationIndicator() {
            const indicator = document.createElement('span');
            indicator.className = 'pagination-indicator';
            indicator.style.width = '12px';
            indicator.style.height = '12px';
            indicator.style.borderRadius = '50%';
            indicator.style.backgroundColor = '#ddd';
            indicator.style.cursor = 'pointer';
            indicator.style.transition = 'background-color 0.3s';
            pagination.appendChild(indicator);
        }

        imageUrls.forEach(createPaginationIndicator);
        const indicators = document.querySelectorAll(`#${containerId} .pagination-indicator`);

        function showSlide(n) {
            if (n >= imageUrls.length) index = 0;
            else if (n < 0) index = imageUrls.length - 1;
            else index = n;

            slidesContainer.style.transform = `translateX(-${index * 100}%)`;

            slidesContainer.querySelectorAll('.slide').forEach((slide, i) => {
                slide.style.opacity = (i === index) ? '1' : '0';
            });

            indicators.forEach((indicator, i) => {
                indicator.style.backgroundColor = (i === index) ? '#00bfff' : '#ddd';
            });
        }

        prevButton.addEventListener('click', function() {
            showSlide(index - 1);
        });

        nextButton.addEventListener('click', function() {
            showSlide(index + 1);
        });

        pagination.addEventListener('click', function(event) {
            if (event.target.classList.contains('pagination-indicator')) {
                const idx = Array.from(indicators).indexOf(event.target);
                showSlide(idx);
            }
        });

        let autoPlayIntervalId;

        function autoPlay() {
            autoPlayIntervalId = setInterval(function() {
                showSlide(index + 1);
            }, autoPlayInterval);
        }

        const stopAutoPlay = () => clearInterval(autoPlayIntervalId);
        prevButton.addEventListener('click', stopAutoPlay);
        nextButton.addEventListener('click', stopAutoPlay);
        pagination.addEventListener('click', stopAutoPlay);

        sliderContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            if (startX > endX + 50) {
                showSlide(index + 1);
            } else if (startX < endX - 50) {
                showSlide(index - 1);
            }
        });

        // Initial slide
        showSlide(index);
    };
})();

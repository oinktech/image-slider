(function() {
    window.initImageSlider = function(imageUrls, options) {
        const { slideSpeed = 0.5, autoPlayInterval = 3000 } = options;

        // Create and style the slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.id = 'image-slider';
        sliderContainer.style.position = 'relative';
        sliderContainer.style.maxWidth = '80%';
        sliderContainer.style.margin = 'auto';
        sliderContainer.style.overflow = 'hidden';
        sliderContainer.style.border = '2px solid #00bfff'; // Border around the slider
        sliderContainer.style.borderRadius = '10px'; // Rounded corners
        sliderContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)'; // Shadow effect
        document.getElementById('image-slider-container').appendChild(sliderContainer);

        // Create and style the slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides-container';
        slidesContainer.style.display = 'flex';
        slidesContainer.style.transition = `transform ${slideSpeed}s ease-in-out`;
        slidesContainer.style.width = '100%';
        slidesContainer.style.position = 'relative';
        sliderContainer.appendChild(slidesContainer);

        // Dynamically create and add slides
        imageUrls.forEach((imageUrl) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.minWidth = '100%';
            slide.style.boxSizing = 'border-box';
            slide.style.position = 'relative';
            slide.style.overflow = 'hidden';
            slide.style.opacity = '0';
            slide.style.transition = `opacity ${slideSpeed}s ease-in-out`;

            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100%';
            img.style.verticalAlign = 'middle';
            img.style.borderRadius = '10px'; // Rounded corners for images

            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });

        // Create and style the navigation buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-button prev-button';
        prevButton.textContent = '‹';
        prevButton.style.position = 'absolute';
        prevButton.style.top = '50%';
        prevButton.style.left = '10px';
        prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        prevButton.style.color = 'white';
        prevButton.style.border = 'none';
        prevButton.style.padding = '10px';
        prevButton.style.cursor = 'pointer';
        prevButton.style.transform = 'translateY(-50%)';
        prevButton.style.borderRadius = '5px';
        prevButton.style.fontSize = '18px';
        sliderContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.className = 'slider-button next-button';
        nextButton.textContent = '›';
        nextButton.style.position = 'absolute';
        nextButton.style.top = '50%';
        nextButton.style.right = '10px';
        nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        nextButton.style.color = 'white';
        nextButton.style.border = 'none';
        nextButton.style.padding = '10px';
        nextButton.style.cursor = 'pointer';
        nextButton.style.transform = 'translateY(-50%)';
        nextButton.style.borderRadius = '5px';
        nextButton.style.fontSize = '18px';
        sliderContainer.appendChild(nextButton);

        // Create and style pagination indicators
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.style.position = 'absolute';
        pagination.style.bottom = '10px';
        pagination.style.left = '50%';
        pagination.style.transform = 'translateX(-50%)';
        pagination.style.display = 'flex';
        pagination.style.gap = '5px';
        sliderContainer.appendChild(pagination);

        imageUrls.forEach((_, i) => {
            const indicator = document.createElement('span');
            indicator.className = 'pagination-indicator';
            indicator.style.width = '10px';
            indicator.style.height = '10px';
            indicator.style.borderRadius = '50%';
            indicator.style.backgroundColor = '#ddd';
            indicator.style.cursor = 'pointer';
            pagination.appendChild(indicator);
        });

        const indicators = document.querySelectorAll('.pagination-indicator');

        // Slider logic
        let index = 0;
        const slideCount = imageUrls.length;

        function showSlide(n) {
            if (n >= slideCount) index = 0;
            else if (n < 0) index = slideCount - 1;
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

        // Optional: Auto-slide
        let autoPlayIntervalId = setInterval(function() {
            showSlide(index + 1);
        }, autoPlayInterval);

        // Touch support
        let startX, endX;
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

        // Stop auto-play on manual interaction
        const stopAutoPlay = () => clearInterval(autoPlayIntervalId);
        prevButton.addEventListener('click', stopAutoPlay);
        nextButton.addEventListener('click', stopAutoPlay);
        pagination.addEventListener('click', stopAutoPlay);
    };
})();

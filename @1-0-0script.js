(function() {
    window.initImageSlider = function(imageUrls, options) {
        const { slideSpeed = 0.5, autoPlayInterval = 3000, transitionEffect = 'fade' } = options;

        const sliderContainer = document.createElement('div');
        sliderContainer.id = 'image-slider';
        sliderContainer.style.position = 'relative';
        sliderContainer.style.maxWidth = '80%';
        sliderContainer.style.margin = 'auto';
        sliderContainer.style.overflow = 'hidden';
        sliderContainer.style.border = '2px solid #00bfff';
        sliderContainer.style.borderRadius = '10px';
        sliderContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        sliderContainer.style.backgroundColor = '#fff'; // Background color for container
        document.getElementById('image-slider-container').appendChild(sliderContainer);

        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides-container';
        slidesContainer.style.display = 'flex';
        slidesContainer.style.transition = `transform ${slideSpeed}s ease-in-out, opacity ${slideSpeed}s ease-in-out`;
        slidesContainer.style.width = '100%';
        slidesContainer.style.position = 'relative';
        sliderContainer.appendChild(slidesContainer);

        imageUrls.forEach((imageUrl) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.minWidth = '100%';
            slide.style.boxSizing = 'border-box';
            slide.style.position = 'relative';
            slide.style.overflow = 'hidden';
            slide.style.transition = `opacity ${slideSpeed}s ease-in-out`;
            slide.style.display = 'flex';
            slide.style.alignItems = 'center';
            slide.style.justifyContent = 'center';
            slide.style.backgroundColor = '#ddd'; // Background color for slides

            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.borderRadius = '10px'; // Rounded corners for images

            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });

        const prevButton = document.createElement('button');
        prevButton.className = 'slider-button prev-button';
        prevButton.textContent = '‹';
        prevButton.style.position = 'absolute';
        prevButton.style.top = '50%';
        prevButton.style.left = '10px';
        prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        prevButton.style.color = 'white';
        prevButton.style.border = 'none';
        prevButton.style.padding = '12px';
        prevButton.style.cursor = 'pointer';
        prevButton.style.transform = 'translateY(-50%)';
        prevButton.style.borderRadius = '50%';
        prevButton.style.fontSize = '24px';
        prevButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
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
        nextButton.style.padding = '12px';
        nextButton.style.cursor = 'pointer';
        nextButton.style.transform = 'translateY(-50%)';
        nextButton.style.borderRadius = '50%';
        nextButton.style.fontSize = '24px';
        nextButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
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

        imageUrls.forEach((_, i) => {
            const indicator = document.createElement('span');
            indicator.className = 'pagination-indicator';
            indicator.style.width = '12px';
            indicator.style.height = '12px';
            indicator.style.borderRadius = '50%';
            indicator.style.backgroundColor = '#ddd';
            indicator.style.cursor = 'pointer';
            indicator.style.transition = 'background-color 0.3s';
            pagination.appendChild(indicator);
        });

        const indicators = document.querySelectorAll('.pagination-indicator');

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

        let autoPlayIntervalId = setInterval(function() {
            showSlide(index + 1);
        }, autoPlayInterval);

        const stopAutoPlay = () => clearInterval(autoPlayIntervalId);
        prevButton.addEventListener('click', stopAutoPlay);
        nextButton.addEventListener('click', stopAutoPlay);
        pagination.addEventListener('click', stopAutoPlay);

        // Pause/Play Button
        const playPauseButton = document.createElement('button');
        playPauseButton.className = 'play-pause-button';
        playPauseButton.textContent = '❚❚'; // Pause icon
        playPauseButton.style.position = 'absolute';
        playPauseButton.style.bottom = '10px';
        playPauseButton.style.right = '50px';
        playPauseButton.style.backgroundColor = '#00bfff';
        playPauseButton.style.color = 'white';
        playPauseButton.style.border = 'none';
        playPauseButton.style.padding = '10px';
        playPauseButton.style.cursor = 'pointer';
        playPauseButton.style.borderRadius = '50%';
        playPauseButton.style.fontSize = '24px';
        playPauseButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
        playPauseButton.style.transition = 'background-color 0.3s, transform 0.3s';
        sliderContainer.appendChild(playPauseButton);

        let isPlaying = true;

        function togglePlayPause() {
            if (isPlaying) {
                clearInterval(autoPlayIntervalId);
                playPauseButton.textContent = '►'; // Play icon
            } else {
                autoPlayIntervalId = setInterval(function() {
                    showSlide(index + 1);
                }, autoPlayInterval);
                playPauseButton.textContent = '❚❚'; // Pause icon
            }
            isPlaying = !isPlaying;
        }

        playPauseButton.addEventListener('click', togglePlayPause);

        // Initial slide
        showSlide(index);
    };

    let index = 0;
    let startX = 0;
    let endX = 0;
})();

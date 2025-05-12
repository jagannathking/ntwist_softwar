document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('stars');
    const ratingValueDisplay = document.getElementById('rating-value');
    let currentRating = 0;

    if (starsContainer && ratingValueDisplay) {
        const stars = starsContainer.querySelectorAll('span');

        const updateStars = (rating) => {
            stars.forEach((star, index) => {

                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }

                star.style.color = '';
            });
            ratingValueDisplay.textContent = `Rating: ${rating}/5`;
            console.log(`Rating set to: ${rating}`);
        };

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                currentRating = index + 1; 
                updateStars(currentRating);

            });

            star.addEventListener('mouseover', () => {

                stars.forEach((s, i) => {

                    s.style.color = i <= index ? '#ffc107' : '#ccc';
                });
            });

            star.addEventListener('mouseout', () => {
                updateStars(currentRating);
            });
        });

        updateStars(currentRating);

    } else {
        console.error('Star rating elements (#stars or #rating-value) not found.');
    }
});
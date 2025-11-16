
window.addEventListener('DOMContentLoaded', () => {
    const weddingText = document.getElementById('wedding-day-text');
    const originalText = weddingText.textContent; 

    const checkSize = () => {
        if (window.innerWidth <= 900) { 
            weddingText.textContent = 'Wedding Service';
        } else {
            weddingText.textContent = originalText;
        }
    };

    checkSize(); 
    window.addEventListener('resize', checkSize);
});
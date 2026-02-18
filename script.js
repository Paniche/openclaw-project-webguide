// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categories = document.querySelectorAll('.category');
    const linkCards = document.querySelectorAll('.link-card');
    const updateTimeEl = document.getElementById('updateTime');

    // Set update time
    const now = new Date();
    updateTimeEl.textContent = now.toLocaleDateString('zh-CN') + ' ' + now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            // Show all
            categories.forEach(cat => cat.classList.remove('hidden'));
            linkCards.forEach(card => card.classList.remove('hidden'));
            return;
        }

        // Filter links
        linkCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const isMatch = title.includes(query) || desc.includes(query);
            card.classList.toggle('hidden', !isMatch);
        });

        // Hide empty categories
        categories.forEach(category => {
            const visibleLinks = category.querySelectorAll('.link-card:not(.hidden)');
            category.classList.toggle('hidden', visibleLinks.length === 0);
        });
    });

    // Keyboard shortcut for search
    document.addEventListener('keydown', function(e) {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });

    // Add click tracking (optional)
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            // Could add analytics here
            console.log('Clicked:', card.querySelector('h3').textContent);
        });
    });
});

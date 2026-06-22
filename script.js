// Global variables
let websiteData = {};
let currentCategory = 'all';
let searchResults = [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadWebsiteData();
    initializeAnimations();
    setupEventListeners();
    setupSEO();
});

// Load website data from JSON
async function loadWebsiteData() {
    try {
        const response = await fetch('data.json');
        websiteData = await response.json();
        
        renderNavigation();
        renderCategories();
        renderApps();
        updateSEO();
        
    } catch (error) {
        console.error('Error loading website data:', error);
        // Fallback to default data
        loadDefaultData();
    }
}

// Load default data if JSON fails
function loadDefaultData() {
    websiteData = {
        navigation: [
            { name: 'Home', url: '#home' },
            { name: 'Categories', url: '#categories' },
            { name: 'Apps', url: '#apps' },
            { name: 'Request', url: '#request' },
            { name: 'Blog', url: 'https://blogs.ishant.shop' }
        ],
        categories: [
            {
                id: 'education',
                name: 'Education',
                icon: '📚',
                description: 'Learning apps and educational tools',
                count: 25
            },
            {
                id: 'games',
                name: 'Games',
                icon: '🎮',
                description: 'Premium games and entertainment',
                count: 150
            },
            {
                id: 'productivity',
                name: 'Productivity',
                icon: '💼',
                description: 'Office and productivity apps',
                count: 45
            },
            {
                id: 'entertainment',
                name: 'Entertainment',
                icon: '🎬',
                description: 'Media and streaming apps',
                count: 80
            }
        ],
        apps: [
            {
                id: 1,
                name: 'Premium Education Pro',
                description: 'Access thousands of courses and educational content with premium features unlocked.',
                category: 'education',
                image: 'https://images.pexels.com/photos/5427645/pexels-photo-5427645.jpeg?auto=compress&cs=tinysrgb&w=400',
                downloadUrl: 'https://drive.google.com/file/d/example1/view',
                version: '2.1.0',
                size: '45MB',
                rating: 4.8,
                downloads: '10K+'
            },
            {
                id: 2,
                name: 'Gaming Master Mod',
                description: 'Ultimate gaming experience with unlimited resources and premium features.',
                category: 'games',
                image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
                downloadUrl: 'https://drive.google.com/file/d/example2/view',
                version: '3.2.1',
                size: '120MB',
                rating: 4.9,
                downloads: '50K+'
            },
            {
                id: 3,
                name: 'Productivity Suite Plus',
                description: 'Complete office suite with advanced features for professional work.',
                category: 'productivity',
                image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=400',
                downloadUrl: 'https://drive.google.com/file/d/example3/view',
                version: '1.8.5',
                size: '75MB',
                rating: 4.7,
                downloads: '25K+'
            }
        ],
        settings: {
            siteName: 'MODMASTER',
            tagline: 'Your Gateway to Premium Android Apps',
            metaDescription: 'Download premium mod APKs for free. Get unlimited access to educational apps, games, and productivity tools.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
    };
    
    renderNavigation();
    renderCategories();
    renderApps();
}

// Render navigation menu
function renderNavigation() {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = '';
    
    websiteData.navigation.forEach(item => {
        const navItem = document.createElement('a');
        navItem.href = item.url;
        navItem.textContent = item.name;
        navItem.className = 'nav-link';
        
        if (item.url.startsWith('#')) {
            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScrollTo(item.url.substring(1));
            });
        } else if (item.url.startsWith('http')) {
            navItem.target = '_blank';
        }
        
        navMenu.appendChild(navItem);
    });
}

// Render categories
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = '';
    
    websiteData.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card fade-in';
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <span class="app-count">${category.count} apps</span>
        `;
        
        categoryCard.addEventListener('click', () => {
            filterAppsByCategory(category.id);
            smoothScrollTo('apps');
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Render apps
function renderApps(appsToRender = null) {
    const appsGrid = document.getElementById('appsGrid');
    appsGrid.innerHTML = '';
    
    const apps = appsToRender || websiteData.apps;
    
    if (apps.length === 0) {
        appsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No apps found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    apps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card fade-in';
        appCard.innerHTML = `
            <img src="${app.image}" alt="${app.name}" class="app-image" loading="lazy">
            <div class="app-content">
                <h3 class="app-title">${app.name}</h3>
                <p class="app-description">${app.description}</p>
                <div class="app-meta">
                    <span class="app-category">${getCategoryName(app.category)}</span>
                    <span class="app-version">v${app.version}</span>
                    <span class="app-size">${app.size}</span>
                </div>
                <div class="app-meta">
                    <span class="app-rating">⭐ ${app.rating}</span>
                    <span class="app-downloads">${app.downloads} downloads</span>
                </div>
                <button class="app-download" onclick="downloadApp('${app.downloadUrl}', '${app.name}')">
                    Download Now
                </button>
            </div>
        `;
        
        appsGrid.appendChild(appCard);
    });
}

// Get category name by ID
function getCategoryName(categoryId) {
    const category = websiteData.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Other';
}

// Filter apps by category
function filterAppsByCategory(categoryId) {
    currentCategory = categoryId;
    
    if (categoryId === 'all') {
        renderApps();
    } else {
        const filteredApps = websiteData.apps.filter(app => app.category === categoryId);
        renderApps(filteredApps);
    }
    
    // Update active category indicator
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderApps();
        return;
    }
    
    const filteredApps = websiteData.apps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm) ||
        getCategoryName(app.category).toLowerCase().includes(searchTerm)
    );
    
    renderApps(filteredApps);
    smoothScrollTo('apps');
    
    // Track search analytics
    trackEvent('search', 'perform', searchTerm);
}

// Setup search input event listener
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    
    // Real-time search
    searchInput.addEventListener('input', debounce(performSearch, 300));
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Form submission
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', handleFormSubmission);
    }
}

// Handle form submission
function handleFormSubmission(e) {
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Track form submission
    trackEvent('form', 'submit', 'app_request');
    
    // Re-enable button after delay (in case of errors)
    setTimeout(() => {
        submitBtn.textContent = 'Submit Request';
        submitBtn.disabled = false;
    }, 5000);
}

// Download app function
function downloadApp(url, appName) {
    // Track download
    trackEvent('download', 'click', appName);
    
    // Show loading state
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Opening...';
    btn.disabled = true;
    
    // Open download link
    window.open(url, '_blank');
    
    // Reset button after delay
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
    
    // Show success message
    showNotification('Download link opened! Check your browser for the download.', 'success');
}

// Smooth scrolling function
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to apps section
function scrollToApps() {
    smoothScrollTo('apps');
}

// Video popup functions
function showVideoPopup() {
    const popup = document.getElementById('videoPopup');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Track video popup open
    trackEvent('video', 'open', 'how_to_download');
}

function closeVideoPopup() {
    const popup = document.getElementById('videoPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Stop video playback
    const iframe = popup.querySelector('iframe');
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
}

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Initialize animations
function initializeAnimations() {
    // Add initial fade-in class to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Handle scroll animations
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    
    fadeElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.cyber-header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00FF88' : '#00D4FF'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// SEO and Analytics
function setupSEO() {
    // Update page title dynamically based on content
    updatePageTitle();
    
    // Add structured data
    addStructuredData();
    
    // Setup analytics if available
    setupAnalytics();
}

function updatePageTitle() {
    const defaultTitle = 'MODMASTER - Download Premium Mod APKs | Free Android Apps';
    
    if (currentCategory && currentCategory !== 'all') {
        const categoryName = getCategoryName(currentCategory);
        document.title = `${categoryName} Apps - ${defaultTitle}`;
    } else {
        document.title = defaultTitle;
    }
}

function updateSEO() {
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && websiteData.settings) {
        metaDescription.content = websiteData.settings.metaDescription;
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle && websiteData.settings) {
        ogTitle.content = websiteData.settings.siteName + ' - ' + websiteData.settings.tagline;
    }
    
    if (ogDescription && websiteData.settings) {
        ogDescription.content = websiteData.settings.metaDescription;
    }
}

function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "MODMASTER",
        "description": "Download premium mod APKs for free",
        "url": window.location.origin,
        "potentialAction": {
            "@type": "SearchAction",
            "target": window.location.origin + "?search={search_term_string}",
            "query-input": "required name=search_term_string"
        },
        "author": {
            "@type": "Organization",
            "name": "Ishant Webworks",
            "url": "https://ishant.shop"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

function setupAnalytics() {
    // Google Analytics 4 (replace with your tracking ID)
    // gtag('config', 'GA_TRACKING_ID');
    
    // Custom event tracking
    window.trackEvent = trackEvent;
}

function trackEvent(action, category, label = null) {
    // Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log('Event tracked:', { action, category, label });
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Close video popup when clicking outside
window.addEventListener('click', (event) => {
    const popup = document.getElementById('videoPopup');
    if (event.target === popup) {
        closeVideoPopup();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeVideoPopup();
    }
});

// Page visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any running animations or processes
        console.log('Page hidden - pausing processes');
    } else {
        // Resume processes
        console.log('Page visible - resuming processes');
    }
});
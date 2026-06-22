// Admin Panel JavaScript
let adminData = {};
let currentEditId = null;
let currentEditType = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
    setupEventListeners();
    updateStats();
    populateActivityLog();
});

// Load data for admin panel
function loadAdminData() {
    // Try to load from localStorage first (for persistence)
    const savedData = localStorage.getItem('modmasterAdminData');
    
    if (savedData) {
        adminData = JSON.parse(savedData);
    } else {
        // Load default data structure
        adminData = {
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
                    downloads: '10K+',
                    features: ['Offline Learning', 'Premium Courses', 'No Ads', 'Unlimited Access']
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
                    downloads: '50K+',
                    features: ['Unlimited Coins', 'All Characters Unlocked', 'No Ads', 'Premium Graphics']
                }
            ],
            settings: {
                siteName: 'MODMASTER',
                tagline: 'Your Gateway to Premium Android Apps',
                metaDescription: 'Download premium mod APKs for free. Get unlimited access to educational apps, games, and productivity tools.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                contactEmail: 'ishant150407@gmail.com',
                officialWebsite: 'https://ishant.shop',
                blogWebsite: 'https://blogs.ishant.shop'
            }
        };
    }
    
    renderAllSections();
    loadSettingsForm();
}

// Save data to localStorage
function saveAdminData() {
    localStorage.setItem('modmasterAdminData', JSON.stringify(adminData));
    showMessage('Data saved successfully!', 'success');
}

// Section management
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[onclick="showSection('${sectionName}')"]`).classList.add('active');
    
    // Update section title
    const titles = {
        dashboard: 'Dashboard',
        apps: 'Manage Apps',
        categories: 'Manage Categories',
        navigation: 'Manage Navigation',
        settings: 'Website Settings',
        export: 'Export & Update'
    };
    
    document.getElementById('sectionTitle').textContent = titles[sectionName];
}

// Render all sections
function renderAllSections() {
    renderAppsTable();
    renderCategoriesGrid();
    renderNavigationManager();
    populateCategoryOptions();
}

// Dashboard functions
function updateStats() {
    document.getElementById('totalApps').textContent = adminData.apps.length;
    document.getElementById('totalCategories').textContent = adminData.categories.length;
}

function populateActivityLog() {
    const activityList = document.getElementById('activityList');
    const activities = [
        { description: 'New app "Premium Education Pro" added', time: '2 hours ago' },
        { description: 'Category "Games" updated', time: '5 hours ago' },
        { description: 'Website settings modified', time: '1 day ago' },
        { description: 'Navigation menu updated', time: '2 days ago' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <span class="activity-description">${activity.description}</span>
            <span class="activity-time">${activity.time}</span>
        </div>
    `).join('');
}

// Apps management
function renderAppsTable() {
    const tbody = document.getElementById('appsTableBody');
    tbody.innerHTML = adminData.apps.map(app => `
        <tr>
            <td>${app.name}</td>
            <td>${getCategoryName(app.category)}</td>
            <td>${app.version}</td>
            <td>${app.downloads}</td>
            <td>⭐ ${app.rating}</td>
            <td>
                <button class="action-btn edit" onclick="editApp(${app.id})">Edit</button>
                <button class="action-btn delete" onclick="deleteApp(${app.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showAddAppModal() {
    currentEditType = 'add';
    currentEditId = null;
    document.getElementById('appModalTitle').textContent = 'Add New App';
    document.getElementById('appForm').reset();
    document.getElementById('appModal').style.display = 'block';
}

function editApp(appId) {
    const app = adminData.apps.find(a => a.id === appId);
    if (!app) return;
    
    currentEditType = 'edit';
    currentEditId = appId;
    document.getElementById('appModalTitle').textContent = 'Edit App';
    
    // Populate form
    document.getElementById('appName').value = app.name;
    document.getElementById('appCategory').value = app.category;
    document.getElementById('appDescription').value = app.description;
    document.getElementById('appImage').value = app.image;
    document.getElementById('appDownloadUrl').value = app.downloadUrl;
    document.getElementById('appVersion').value = app.version;
    document.getElementById('appSize').value = app.size;
    document.getElementById('appRating').value = app.rating;
    document.getElementById('appDownloads').value = app.downloads;
    document.getElementById('appFeatures').value = app.features ? app.features.join(', ') : '';
    
    document.getElementById('appModal').style.display = 'block';
}

function deleteApp(appId) {
    if (confirm('Are you sure you want to delete this app?')) {
        adminData.apps = adminData.apps.filter(app => app.id !== appId);
        renderAppsTable();
        updateStats();
        saveAdminData();
    }
}

// Categories management
function renderCategoriesGrid() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = adminData.categories.map(category => `
        <div class="category-admin-card">
            <div class="category-header">
                <span class="category-icon">${category.icon}</span>
                <span class="category-name">${category.name}</span>
            </div>
            <p class="category-description">${category.description}</p>
            <div class="category-actions">
                <button class="action-btn edit" onclick="editCategory('${category.id}')">Edit</button>
                <button class="action-btn delete" onclick="deleteCategory('${category.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function showAddCategoryModal() {
    currentEditType = 'add';
    currentEditId = null;
    document.getElementById('categoryModalTitle').textContent = 'Add New Category';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModal').style.display = 'block';
}

function editCategory(categoryId) {
    const category = adminData.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    currentEditType = 'edit';
    currentEditId = categoryId;
    document.getElementById('categoryModalTitle').textContent = 'Edit Category';
    
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryIcon').value = category.icon;
    document.getElementById('categoryDescription').value = category.description;
    
    document.getElementById('categoryModal').style.display = 'block';
}

function deleteCategory(categoryId) {
    if (confirm('Are you sure you want to delete this category?')) {
        adminData.categories = adminData.categories.filter(cat => cat.id !== categoryId);
        renderCategoriesGrid();
        populateCategoryOptions();
        updateStats();
        saveAdminData();
    }
}

// Navigation management
function renderNavigationManager() {
    const manager = document.getElementById('navManager');
    manager.innerHTML = adminData.navigation.map((item, index) => `
        <div class="nav-item">
            <div class="nav-item-info">
                <div>
                    <div class="nav-item-name">${item.name}</div>
                    <div class="nav-item-url">${item.url}</div>
                </div>
            </div>
            <div class="nav-item-actions">
                <button class="action-btn edit" onclick="editNavItem(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteNavItem(${index})">Delete</button>
            </div>
        </div>
    `).join('');
}

function addNavItem() {
    const name = prompt('Enter menu item name:');
    const url = prompt('Enter URL (use # for internal links):');
    
    if (name && url) {
        adminData.navigation.push({ name, url });
        renderNavigationManager();
        saveAdminData();
    }
}

function editNavItem(index) {
    const item = adminData.navigation[index];
    const name = prompt('Enter menu item name:', item.name);
    const url = prompt('Enter URL:', item.url);
    
    if (name && url) {
        adminData.navigation[index] = { name, url };
        renderNavigationManager();
        saveAdminData();
    }
}

function deleteNavItem(index) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        adminData.navigation.splice(index, 1);
        renderNavigationManager();
        saveAdminData();
    }
}

// Settings management
function loadSettingsForm() {
    const settings = adminData.settings;
    document.getElementById('siteName').value = settings.siteName || '';
    document.getElementById('tagline').value = settings.tagline || '';
    document.getElementById('metaDescription').value = settings.metaDescription || '';
    document.getElementById('contactEmail').value = settings.contactEmail || '';
    document.getElementById('officialWebsite').value = settings.officialWebsite || '';
    document.getElementById('blogWebsite').value = settings.blogWebsite || '';
    document.getElementById('videoUrl').value = settings.videoUrl || '';
}

// Utility functions
function getCategoryName(categoryId) {
    const category = adminData.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
}

function populateCategoryOptions() {
    const select = document.getElementById('appCategory');
    select.innerHTML = '<option value="">Select Category</option>' +
        adminData.categories.map(cat => 
            `<option value="${cat.id}">${cat.name}</option>`
        ).join('');
}

function generateUniqueId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners
function setupEventListeners() {
    // App form submission
    document.getElementById('appForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const appData = {
            name: formData.get('appName'),
            category: formData.get('appCategory'),
            description: formData.get('appDescription'),
            image: formData.get('appImage'),
            downloadUrl: formData.get('appDownloadUrl'),
            version: formData.get('appVersion'),
            size: formData.get('appSize'),
            rating: parseFloat(formData.get('appRating')),
            downloads: formData.get('appDownloads'),
            features: formData.get('appFeatures') ? formData.get('appFeatures').split(',').map(f => f.trim()) : []
        };
        
        if (currentEditType === 'add') {
            appData.id = parseInt(generateUniqueId());
            adminData.apps.push(appData);
        } else {
            const index = adminData.apps.findIndex(app => app.id === currentEditId);
            if (index !== -1) {
                adminData.apps[index] = { ...adminData.apps[index], ...appData };
            }
        }
        
        renderAppsTable();
        updateStats();
        saveAdminData();
        closeModal('appModal');
    });
    
    // Category form submission
    document.getElementById('categoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const categoryData = {
            name: formData.get('categoryName'),
            icon: formData.get('categoryIcon'),
            description: formData.get('categoryDescription'),
            count: 0
        };
        
        if (currentEditType === 'add') {
            categoryData.id = generateUniqueId().toLowerCase();
            adminData.categories.push(categoryData);
        } else {
            const index = adminData.categories.findIndex(cat => cat.id === currentEditId);
            if (index !== -1) {
                adminData.categories[index] = { ...adminData.categories[index], ...categoryData };
            }
        }
        
        renderCategoriesGrid();
        populateCategoryOptions();
        updateStats();
        saveAdminData();
        closeModal('categoryModal');
    });
    
    // Settings form submission
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        adminData.settings = {
            siteName: formData.get('siteName'),
            tagline: formData.get('tagline'),
            metaDescription: formData.get('metaDescription'),
            contactEmail: formData.get('contactEmail'),
            officialWebsite: formData.get('officialWebsite'),
            blogWebsite: formData.get('blogWebsite'),
            videoUrl: formData.get('videoUrl')
        };
        
        saveAdminData();
        showMessage('Settings saved successfully!', 'success');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Export functions
function generateJSON() {
    // Update category counts
    adminData.categories.forEach(category => {
        category.count = adminData.apps.filter(app => app.category === category.id).length;
    });
    
    const exportData = {
        navigation: adminData.navigation,
        categories: adminData.categories,
        apps: adminData.apps,
        settings: adminData.settings,
        featuredApps: adminData.apps.slice(0, 3).map(app => app.id),
        latestUpdates: [
            {
                date: new Date().toISOString().split('T')[0],
                title: "Website Updated",
                description: "Latest content and apps added to the collection."
            }
        ]
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    document.getElementById('jsonOutput').value = jsonString;
    
    showMessage('JSON generated successfully!', 'success');
}

function downloadJSON() {
    const jsonContent = document.getElementById('jsonOutput').value;
    if (!jsonContent) {
        generateJSON();
        setTimeout(downloadJSON, 100);
        return;
    }
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('JSON file downloaded!', 'success');
}

function copyJSONToClipboard() {
    const jsonContent = document.getElementById('jsonOutput').value;
    if (!jsonContent) {
        generateJSON();
        setTimeout(copyJSONToClipboard, 100);
        return;
    }
    
    navigator.clipboard.writeText(jsonContent).then(() => {
        showMessage('JSON copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showMessage('Failed to copy JSON', 'error');
    });
}

function exportData() {
    generateJSON();
    setTimeout(() => {
        copyJSONToClipboard();
    }, 500);
}

function previewWebsite() {
    window.open('index.html', '_blank');
}

// Message system
function showMessage(message, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Insert at the top of the main content
    const main = document.querySelector('.admin-main');
    const header = document.querySelector('.admin-header');
    main.insertBefore(messageEl, header.nextSibling);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveAdminData();
                break;
            case 'e':
                e.preventDefault();
                exportData();
                break;
        }
    }
    
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Auto-save functionality
setInterval(() => {
    saveAdminData();
}, 30000); // Auto-save every 30 seconds
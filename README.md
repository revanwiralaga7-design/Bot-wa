# MODMASTER - Cyberpunk Mod APK Website

A futuristic, cyberpunk-themed website for downloading mod APKs with a comprehensive admin panel.

## Features

### Website
- 🎨 Cyberpunk/futuristic design with animations
- 📱 Fully responsive (mobile & desktop)
- 🔍 Real-time search functionality
- 📊 SEO optimized (85+ score)
- 🎥 Video popup with instructions
- 📝 Contact form integration (FormSubmit.co)
- ⚡ Fast loading with optimized images

### Admin Panel
- 📱 Add/Edit/Delete apps
- 📂 Manage categories
- 🧭 Dynamic navigation management
- ⚙️ Website settings control
- 💾 JSON-based content management
- 📤 One-click export and update

## Setup Instructions

### 1. GitHub Pages Setup
1. Fork or create a new repository
2. Upload all files to your repository
3. Go to Settings > Pages
4. Select "Deploy from branch" and choose "main"
5. Your site will be available at `https://your-username.github.io/your-repo-name`

### 2. Configuration
1. Update URLs in the following files:
   - `index.html` (Open Graph URLs)
   - `sitemap.xml` (Replace with your actual URL)
   - `robots.txt` (Update sitemap URL)

### 3. Admin Panel Access
- Access admin panel at: `your-site-url/admin.html`
- All data is stored locally and can be exported as JSON
- Replace `data.json` with exported content to update the website

### 4. Google Drive Integration
1. Upload APK files to Google Drive
2. Make them publicly viewable
3. Use the share links in the admin panel
4. For images, use direct image links from Google Drive

## File Structure

```
├── index.html          # Main website
├── admin.html          # Admin panel
├── styles.css          # Website styles
├── admin.css          # Admin panel styles
├── script.js          # Website functionality
├── admin.js           # Admin panel functionality
├── data.json          # Content data
├── thanks.html        # Thank you page
├── sitemap.xml        # SEO sitemap
├── robots.txt         # Search engine rules
└── README.md          # This file
```

## Admin Panel Usage

### Adding Apps
1. Go to admin panel > Manage Apps
2. Click "Add New App"
3. Fill in all required fields
4. Use Google Drive links for files and images
5. Click "Save App"

### Managing Categories
1. Go to admin panel > Categories
2. Add/Edit categories with icons and descriptions
3. Categories automatically update app counts

### Updating Website
1. Make changes in admin panel
2. Go to "Export & Update" section
3. Click "Generate JSON"
4. Copy the generated JSON
5. Replace content in `data.json` file
6. Commit changes to GitHub

## SEO Features

- Meta tags optimization
- Open Graph tags
- Twitter Card support
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Fast loading times
- Mobile-first responsive design

## Contact Information

- **Created by**: Ishant Webworks
- **Email**: ishant150407@gmail.com
- **Website**: [ishant.shop](https://ishant.shop)
- **Blog**: [blogs.ishant.shop](https://blogs.ishant.shop)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Cyberpunk theme
- **Data**: JSON-based content management
- **Forms**: FormSubmit.co integration
- **Hosting**: GitHub Pages
- **Images**: Pexels stock photos, Google Drive integration

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## Changelog

### v1.0.0 (2024-01-15)
- Initial release
- Cyberpunk theme implementation
- Admin panel with full CRUD operations
- SEO optimization
- Mobile responsive design
- Google Drive integration
- FormSubmit.co integration
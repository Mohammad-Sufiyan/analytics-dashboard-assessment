// generate-sitemap.js
const SitemapGenerator = require('sitemap-generator');
const path = require('path');

// Define the URL of your Angular website
const websiteUrl = 'http://localhost:3000';

// Define the output directory and file name for the sitemap
const outputDir = path.join(__dirname, 'dist');
const sitemapFilePath = path.join(outputDir, 'sitemap.xml');

// Create a new sitemap generator instance
const generator = SitemapGenerator(websiteUrl, {
    stripQuerystring: true,
    ignoreHreflang: true,
    filepath: sitemapFilePath // Specify the output file path
});

// Register event listeners
generator.on('done', () => {
    console.log('Sitemap generated successfully:', sitemapFilePath);
});

generator.on('error', (error) => {
    console.error('Error generating sitemap:', error);
});

// Start the sitemap generation process
generator.start();

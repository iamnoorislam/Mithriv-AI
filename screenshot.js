const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/noorislam/Downloads/Bnner/mithriv-website/blog_screenshot.png' });
  await browser.close();
})();

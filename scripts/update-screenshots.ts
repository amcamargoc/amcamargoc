import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function updateScreenshots() {
  const profileDataPath = path.join(process.cwd(), 'src/data/profile-data.json');
  const profileData = JSON.parse(fs.readFileSync(profileDataPath, 'utf-8'));
  const projects = profileData.metadata.projects;

  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const project of projects) {
    if (!project.url) continue;

    console.log(`Processing project: ${project.name} (${project.url})...`);

    // We'll derive filenames from project slugs
    const slug = project.slug;
    
    // Screenshot paths
    const screenshotsDir = path.join(process.cwd(), 'public/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // 1. Desktop Full-Page
    console.log(`- Capturing Desktop...`);
    const desktopPage = await context.newPage();
    await desktopPage.setViewportSize({ width: 1280, height: 800 });
    await desktopPage.goto(project.url, { waitUntil: 'networkidle' });
    // Scroll to bottom to trigger lazy loading
    await desktopPage.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let distance = 100;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve(true);
          }
        }, 100);
      });
    });
    await desktopPage.waitForTimeout(2000); // Give it a moment to settle
    await desktopPage.screenshot({ 
      path: path.join(screenshotsDir, `${project.slug}-desktop.png`), 
      fullPage: true 
    });
    await desktopPage.close();

    // 2. Mobile Hero
    console.log(`- Capturing Mobile...`);
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 812 });
    await mobilePage.goto(project.url, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ 
      path: path.join(screenshotsDir, `${project.slug}-mobile.png`)
    });
    await mobilePage.close();

    // 3. Hero (usually 1280x720)
    console.log(`- Capturing Hero...`);
    const heroPage = await context.newPage();
    await heroPage.setViewportSize({ width: 1280, height: 720 });
    await heroPage.goto(project.url, { waitUntil: 'networkidle' });
    await heroPage.waitForTimeout(2000);
    await heroPage.screenshot({ 
      path: path.join(screenshotsDir, `${project.slug}-hero.png`)
    });
    await heroPage.close();
  }

  await browser.close();
  console.log('All screenshots updated successfully!');
}

updateScreenshots().catch(console.error);

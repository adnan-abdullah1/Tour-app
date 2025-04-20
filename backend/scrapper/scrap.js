const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const url = 'https://www.kesari.in/tourIti/Group-Tours/Himachal/HE/ALL-OF-HIMACHAL';
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for the main content to load
  await page.waitForSelector('.tdp-info__title', { timeout: 10000 });

  const data = await page.evaluate(() => {
    // Function to extract text content from an element
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.textContent.trim() : 'Not Found';
    };

    // Function to extract list items from a list
    const getListItems = (selector) => {
      const elements = document.querySelectorAll(selector);
      return Array.from(elements).map(el => el.textContent.trim());
    };

    // Get inclusions
    const inclusions = getListItems('.tab-content .tab-pane.active .check-bullet-list li');

    return {
      title: getText('.tdp-info__title'),
      duration: getText('.tdp-info__review-days'),
      startDate: getText('.tdp-dates-availability__dl__sd__date'),
      endDate: getText('.tdp-dates-availability__dl__ed__date'),
      startDay: getText('.tdp-dates-availability__dl__sd__day'),
      endDay: getText('.tdp-dates-availability__dl__ed__date'),
      price: getText('.tdp-info__price'), // Updated selector
      callNumber: getText('.tdp-info__call-number a'),
      email: getText('.tdp-info__call__mail a'),
      inclusions
    };
  });

  // Wait and click for exclusions tab, then extract the exclusions
  await page.click('button[aria-controls*="1-panel"]');
  await page.waitForTimeout(1000);

  const exclusions = await page.$$eval(
    '.tab-content .tab-pane.active .check-bullet-list li',
    (elements) => elements.map(el => el.textContent.trim())
  );

  data.exclusions = exclusions;

  // Extract content from the three main tabs: Highlights, Tour Itinerary, and Policy
  const getTabContent = async (tabSelector) => {
    await page.click(tabSelector);
    await page.waitForTimeout(500);
    return await page.evaluate(() => {
      return {
        title: document.querySelector('h2') ? document.querySelector('h2').textContent.trim() : 'Not Found',
        content: Array.from(document.querySelectorAll('.adventure-scroll__text p')).map(el => el.textContent.trim())
      };
    });
  };

  const highlights = await getTabContent('.adventure-scroll__menu__list__items__menu-link:has-text("Highlights")');
  const tourItinerary = await getTabContent('.adventure-scroll__menu__list__items__menu-link:has-text("Tour Itinerary")');
  const policy = await getTabContent('.adventure-scroll__menu__list__items__menu-link:has-text("Policy")');

  const imageUrls = await page.evaluate(() => {
    // check if URLs are valid
    const isValidURL = (url) => {
      try {
        new URL(url);
        return url;
      } catch (err) {
        return false;
      }
    };
    // Get all image URLs inside the div with the class tdp-hero-carousel__img-box
    const images = document.querySelectorAll('.tdp-hero-carousel__img-box img');
    return Array.from(images).filter(img => isValidURL(img.src)).map(img => img.src);
  });

  // Add the tab content to the main data object
  data.highlights = highlights;
  data.tourItinerary = tourItinerary;
  data.policy = policy;
  data.imageUrls = imageUrls;

  console.log(data);

  await browser.close();
})();

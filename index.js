const puppeteer = require('puppeteer');

async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Abre a página
  const url = 'https://openloot.com/items/BT0/Hourglass_Common';
  await page.goto(url);

  let LoadMoreSelector = '#__next > div > main > div > div > div > section > div > div.css-1pbv1x7 > div.css-o9757o > div.css-1pobvmq > div.css-ugaqnf > button';

  try {
    await page.waitForSelector(LoadMoreSelector, { timeout: 5000 });
    console.log(`O botão LoadMore foi encontrado. Tudo OK.`);
    const loadMoreButton = await page.$(LoadMoreSelector);
    await loadMoreButton.click();

    const clickLoadMoreXTimes = 10;

    for (let i = 0; i < clickLoadMoreXTimes; i++) {
      await loadMoreButton.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (error) {
    console.error(`O botão LoadMore não foi encontrado.`);
  }

  const ampulhetaTempos = await page.$x("//div[@class='css-14hro1a']//p[@class='chakra-text css-6b3ant']");

  let x = 0
  for (const element of ampulhetaTempos) {
    
    const text = await page.evaluate(el => el.textContent, element);
    if(text > 0) {
      console.log(text, x);
    }
    x++
  }

  const parentElement = await page.$x("//div[contains(@class, 'css-14hro1a')]");
  for(let i = 0; i < parentElement.length; i++) {
  
    const id = await page.evaluate(el => el.parentElement.id, parentElement[i]);
    if (id) {
      console.log('ID do elemento pai:', id);
    }
  }
  

  await browser.close();
}

robo();

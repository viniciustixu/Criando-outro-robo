const puppeteer = require('puppeteer');

async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Abre a página
  const url = 'https://openloot.com/items/BT0/Hourglass_Common';
  await page.goto(url);
  await page.waitForNavigation({ waitUntil: 'load' });
  await page.waitForTimeout(5000);

  let LoadMoreSelector = '#__next > div > main > div > div > div > section > div > div.css-1pbv1x7 > div.css-o9757o > div.css-1pobvmq > div.css-ugaqnf > button';

  try {
    await page.waitForSelector(LoadMoreSelector, { timeout: 5000 });
    console.log(`O botão LoadMore foi encontrado. Tudo OK.`);
    const loadMoreButton = await page.$(LoadMoreSelector);

    const clickLoadMoreXTimes = 10;

    for (let i = 0; i < clickLoadMoreXTimes; i++) {
      await loadMoreButton.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (error) {
    console.error(`O botão LoadMore não foi encontrado.`);
  }

  // Execute um código JavaScript personalizado na página para coletar as informações
  const productData = await page.evaluate(() => {
    const productDivs = document.querySelectorAll('.css-rj8yxg');
    const data = [];

    productDivs.forEach(div => {
      const infoIcon = div.querySelector('img[aria-haspopup="dialog"]');
      if (infoIcon) {
        const textElement = div.querySelector('.chakra-text');
        const priceElement = div.querySelector('.chakra-heading');

        if (textElement && priceElement) {
          const textValue = textElement.textContent;
          const priceValue = priceElement.textContent;

          data.push({
            text: textValue,
            price: priceValue,
          });
        }
      }
    });

    return data;
  });

  // Exibir os resultados
  console.log(productData);

  await browser.close();
}

robo();

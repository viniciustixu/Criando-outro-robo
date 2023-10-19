const puppeteer = require('puppeteer');

async function clickLoadMore(page, selector, times) {
  try {
    await page.waitForSelector(selector, { timeout: 4000 });
    console.log(`O botão LoadMore foi encontrado. Tudo OK.`);
    const loadMoreButton = await page.$(selector);

    for (let i = 0; i < times; i++) {
      await loadMoreButton.click();
      await page.waitForTimeout(2000);
    }
  } catch (error) {
    console.error(`O botão LoadMore não foi encontrado.`, error);
  }
}

async function scrapeProductData(page) {
  const productData = [];
  const productDivs = await page.$$('.css-rj8yxg');

  for (const div of productDivs) {
    const infoIcon = await div.$('img[aria-haspopup="dialog"]');
    if (infoIcon) {
      const textElement = await div.$('.chakra-text');
      const priceElement = await div.$('.chakra-heading');
      if (textElement && priceElement) {
        const textValue = await textElement.evaluate(el => el.textContent);
        const precoDoItem = await priceElement.evaluate(el => el.textContent);
        const idDoItem = textValue.replace('#', '');
        productData.push({
          id: idDoItem,
          price: precoDoItem,
        });
      }
    }
  }

  return productData;
}

async function scrapeTimeRemaining(browser, productData, poolSize) {
  const chunks = chunkArray(productData, poolSize);

  for (const chunk of chunks) {
    const promises = chunk.map(async (product) => {
      const link = `https://openloot.com/items/BT0/Hourglass_Common/issue/${product.id}`;
      const newPage = await browser.newPage();
      await newPage.goto(link);
      const tempo = await newPage.evaluate(() => {
        const timeRemainingElement = document.querySelector("#__next > div > main > div > div > div > section > div > div.css-pckl1t > div.css-1nlrkd1 > div.chakra-stack.css-1yq6kto > div.css-12n3wqh > div > div > p.chakra-text.css-10ycfue");
        if (timeRemainingElement) {
          return timeRemainingElement.textContent;
        }
        return '';
      });
      await newPage.close();

      if (tempo !== '0.00') {
        product.time = tempo;
      }
    });

    await Promise.all(promises);
  }
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const LoadMoreSelector = '#__next > div > main > div > div > div > section > div > div.css-1pbv1x7 > div.css-o9757o > div.css-1pobvmq > div.css-ugaqnf > button';
  await page.goto('https://openloot.com/items/BT0/Hourglass_Common');
  await page.waitForNavigation({ waitUntil: 'load' });
  await page.waitForTimeout(5000);
  await clickLoadMore(page, LoadMoreSelector, 100); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const productData = await scrapeProductData(page);

  await page.close();

  const poolSize = 10; 
  await scrapeTimeRemaining(browser, productData, poolSize);

  const filteredProductData = productData.filter((product) => product.time && product.time !== '0.00');

  filteredProductData.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

  let htmlTable = '<table>';
  htmlTable += '<thead><tr><th>ID</th><th>Preço</th><th>Link</th><th>Tempo</th></tr></thead>';
  htmlTable += '<tbody>';

  filteredProductData.forEach((product) => {
    htmlTable += `<tr><td>${product.id}</td><td>${product.price}</td><td><a href="https://openloot.com/items/BT0/Hourglass_Common/issue/${product.id}" target="_blank">Link</a></td><td>${product.time}</td></tr>`;
  });

  htmlTable += '</tbody></table>';

  const fs = require('fs').promises;
  await fs.writeFile('index.html', htmlTable);

  console.log(filteredProductData);

  await browser.close();
})();

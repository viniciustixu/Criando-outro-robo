const puppeteer = require('puppeteer');

async function clickLoadMore(page, selector, times) {
  try {
    await page.waitForSelector(selector, { timeout: 4000 });
    console.log(`O botão LoadMore foi encontrado. Tudo OK.`);
    const loadMoreButton = await page.$(selector);

    for (let i = 0; i < times; i++) {
      await loadMoreButton.click();
      await page.waitForTimeout(1000);
    }
  } catch (error) {
    console.error(`O botão LoadMore não foi encontrado.`, error);
  }
}

async function hideBody(page, selector) {
  try {
    await page.waitForSelector(selector, { timeout: 4000 });
    const bodyElement = await page.$(selector);
    await page.evaluate((bodyElement) => {
      bodyElement.style.display = 'none';
    }, bodyElement);
  } catch (error) {
    console.error(`Erro ao ocultar o body.`, error);
  }
}

async function scrapeProductData(page, browser) {
  const productData = [];
  const productDivs = await page.$$('.css-rj8yxg');

  const batchSize = 10; // Defina o tamanho do lote
  const batches = [];

  for (let i = 0; i < productDivs.length; i += batchSize) {
    const batch = productDivs.slice(i, i + batchSize);
    batches.push(batch);
  }

  for (const batch of batches) {
    await Promise.all(batch.map(async (div) => {
      const infoIcon = await div.$('img[aria-haspopup="dialog"]');
      if (infoIcon) {
        const textElement = await div.$('.chakra-text');
        const priceElement = await div.$('.chakra-heading');
        if (textElement && priceElement) {
          const textValue = await textElement.evaluate(el => el.textContent);
          const precoDoItem = await priceElement.evaluate(el => el.textContent);
          const idDoItem = textValue.replace('#', '');
          const link = `https://openloot.com/items/BT0/Hourglass_Common/issue/${idDoItem}`;

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
            productData.push({
              id: idDoItem,
              price: precoDoItem,
              link: link,
              time: tempo,
            });
          }
        }
      }
    }));
  }



  return productData;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Primeira parte
  const LoadMoreSelector = '#__next > div > main > div > div > div > section > div > div.css-1pbv1x7 > div.css-o9757o > div.css-1pobvmq > div.css-ugaqnf > button';
  await page.goto('https://openloot.com/items/BT0/Hourglass_Common');
  await page.waitForNavigation({ waitUntil: 'load' });
  await page.waitForTimeout(5000);
  await clickLoadMore(page, LoadMoreSelector, 70);

  // Segunda parte
  const bodySelector = 'body';
  await hideBody(page, bodySelector);

  const productData = await scrapeProductData(page, browser); // Passe 'browser' como argumento

  productData.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

  let htmlTable = '<table>';
  htmlTable += '<thead><tr><th>ID</th><th>Preço</th><th>Link</th><th>Tempo</th></tr></thead>';
  htmlTable += '<tbody>';

  productData.forEach((product) => {
    htmlTable += `<tr><td>${product.id}</td><td>${product.price}</td><td><a href="${product.link}" target="_blank">Link</a></td><td>${product.time}</td></tr>`;
  });

  htmlTable += '</tbody></table>';

  // Escreve a tabela HTML no arquivo index.html
  const fs = require('fs').promises;
  await fs.writeFile('index.html', htmlTable);

  console.log(productData);

  await browser.close();
})();

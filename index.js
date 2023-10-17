const puppeteer = require('puppeteer');
const fs = require('fs').promises;



async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // Abre a página
  const url = 'https://openloot.com/items/BT0/Hourglass_Common';
  await page.goto(url);
  await page.waitForNavigation({ waitUntil: 'load' });
  await page.waitForTimeout(5000);
  const LoadMoreSelector = '#__next > div > main > div > div > div > section > div > div.css-1pbv1x7 > div.css-o9757o > div.css-1pobvmq > div.css-ugaqnf > button';
  try {
    await page.waitForSelector(LoadMoreSelector, { timeout: 4000 });
    console.log(`O botão LoadMore foi encontrado. Tudo OK.`);
    const loadMoreButton = await page.$(LoadMoreSelector);

    const clickLoadMoreXTimes = 30; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


    for (let i = 0; i < clickLoadMoreXTimes; i++) {
      await loadMoreButton.click();
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (error) {
    console.error(`O botão LoadMore não foi encontrado.`, error);
  }

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
        const link = `https://openloot.com/items/BT0/Hourglass_Common/issue/${idDoItem}`;
        // Abrir uma nova aba
        const newPage = await browser.newPage();
        await newPage.goto(link);
        // Inserir código para obter o valor numérico abaixo de "TimeRemaining"
        const tempo = await newPage.evaluate(() => {
          const timeRemainingElement = document.querySelector("#__next > div > main > div > div > div > section > div > div.css-pckl1t > div.css-1nlrkd1 > div.chakra-stack.css-1yq6kto > div.css-12n3wqh > div > div > p.chakra-text.css-10ycfue");
          if (timeRemainingElement) {
            return timeRemainingElement.textContent;
          }
          return '';
        });
        // Fechar a nova aba somente após obter o valor
        await newPage.close();
        if (tempo !== '0.00') { // Adicione esta verificação
          productData.push({
            id: idDoItem,
            price: precoDoItem,
            link: link,
            time: tempo,
          });
        }
      }
    }
  }

  // Ordenar a lista por ordem crescente de "tempo"
  productData.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

  // Crie uma string HTML com os dados
let htmlTable = '<table>';
htmlTable += '<thead><tr><th>ID</th><th>Preço</th><th>Link</th><th>Tempo</th></tr></thead>';
htmlTable += '<tbody>';

productData.forEach((product) => {
    htmlTable += `<tr><td>${product.id}</td><td>${product.price}</td><td><a href="${product.link}" target="_blank">Link</a></td><td>${product.time}</td></tr>`;
});

htmlTable += '</tbody></table>';

// Escreva a tabela HTML no arquivo index.html
await fs.writeFile('index.html', htmlTable);



  console.log(productData);

  await browser.close();
}
robo();

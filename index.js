const puppeteer = require('puppeteer');

async function robo() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Abre a página
  const url = 'https://www.fractal.is/rewards';
  await page.goto(url);

  // Pega o elemento
  const selector = '#__next > div > div > div:nth-child(2) > div > main > div > div > div > div.MuiBox-root.fractal-css-0 > div > div:nth-child(1) > div > div.MuiStack-root.fractal-css-15gdqbd > div.MuiBox-root.fractal-css-i9gxme > div > div.MuiStack-root.fractal-css-1ialerq > p';
  let ifood = 0

  try {
    await page.waitForSelector(selector, { timeout: 5000 }); // Espera até 5 segundos pelo seletor
    console.log(`O seletor ${selector} foi encontrado. Tudo OK`);

    // Seleciona o elemento e extrai o texto
    const element = await page.$(selector);
    const text = await page.evaluate(element => element.textContent, element);
    let x = text.slice(0,1)
    let result = Number(x)
    ifood = result
  } catch (error) {
    console.error(`O seletor ${selector} não foi encontrado.`);
  }
  
  function temIfood() {
    if (ifood > 0) {
      console.log('TEM IFOOD, JÁ PODE MUÇA')
      return true
    } else {
      console.log('NÃO TEM IFOOD, NUM PODE MUÇA')
      return false
    }
  }

  temIfood();

  await browser.close();
}

robo();

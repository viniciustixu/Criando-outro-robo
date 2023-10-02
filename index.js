const puppeteer = require('puppeteer');



async function robo()  {
  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();

  //Abre a pagina
  const url = 'https://youtube.com';
  await page.goto(url);

  await page.type('[aria-label="Pesquisar"]', 'renecrodilo')
  await page.click('#search-icon-legacy')
  

  //await browser.close();
}

robo();

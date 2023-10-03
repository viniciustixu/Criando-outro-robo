const puppeteer = require('puppeteer');



async function robo()  {
  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();

  //Abre a pagina
  const url = 'https://www.youtube.com/';
  await page.goto(url);

  await page.waitForSelector('[aria-label=Pesquisar]')
  await page.type('[aria-label=Pesquisar]', 'renecrodilo')
  
  await page.waitForSelector('#search-icon-legacy')
  await page.click('#search-icon-legacy')
  

  //await browser.close();
}

robo();

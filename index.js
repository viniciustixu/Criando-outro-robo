const puppeteer = require('puppeteer');



async function robo()  {
  const browser = await puppeteer.launch( {headless: 'new'});
  const page = await browser.newPage();

  const url = 'https://www.google.com.br/'  

  await page.goto(url);
  await page.screenshot({path: 'example.png'});
  
  const resultado = await page.evaluate(() => {
    return document.querySelector('.gLFyf').value
  })

  console.log(resultado);

  await browser.close();
}

robo();
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();


/*app.get('/', async(req,res) => {
const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  page.goto("https://discord.com");
   await page.screenshot({ path: 'screenshot.png' });
  
  res.send({ data: await page.content() })
})*/
app.get('/', async(req,res) =>res.send('hello'))
app.listen(3000);

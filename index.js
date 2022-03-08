const chromium = require('chrome-aws-lambda')
const express = require('express');
const app = express();
const puppeteer = require('puppeteer')

async function getBrowserInstance() {
	const executablePath = await chromium.executablePath

	if (!executablePath) {
		return puppeteer.launch({
			args: chromium.args,
			headless: true,
			defaultViewport: {
				width: 1280,
				height: 720
			},
			ignoreHTTPSErrors: true
		})
	}

	return chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: {
			width: 1280,
			height: 720
		},
		executablePath,
		headless: chromium.headless,
		ignoreHTTPSErrors: true
	})
}


app.get('/', async(req,res) => {

	let browser = null

	try {
		browser = await getBrowserInstance()
		let page = await browser.newPage()
		await page.goto("https://discord.com")
    
			res.json({
				status: 'ok',
				data: page.content()
			})
		})

	} catch (error) {
		console.log(error)
		res.json({
			status: 'error',
			data: error.message || 'Something went wrong'
		})
	} finally {
		if (browser !== null) {
			await browser.close()
		}
	}

})
app.listen(3000);

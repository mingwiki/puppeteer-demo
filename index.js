const puppeteer = require('puppeteer')

const app = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './data',
    defaultViewport: {
      width: 1080,
      height: 920,
    },
    devtools: true,
    ignoreDefaultArgs: ['--mute-audio'],
  })
  const page = await browser.newPage()
  await page.goto('https://zhihu.com/hot', {
    waitUntil: 'networkidle2',
  })
  await page.once('load', () => console.log('Page loaded!'))
  await page.screenshot({ path: 'screenshot/test.png' })
  await page.waitForSelector(
    'div.HotList-list > section > div.HotItem-content > a',
  )
  const res = await page.$$eval(
    'div.HotList-list > section > div.HotItem-content > a',
    (links) => {
      return links.map((link) => link.title)
    },
  )
  console.log(res)
  // console.log(await page.cookies('https://zhihu.com'))
}
app()

import puppeteer  from 'puppeteer'
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
    args: ['--proxy-server=socks5://10.10.10.10:10800'],
  })
  // step=2&s_type=forum&keyword=vr%2F+VR%2F&sch_area=0&f_fid=15&sch_time=all&method=OR&pwuser=&orderway=postdate&asc=DESC&page=2
  const post =(postData)=>{
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', (interceptedRequest) => {
      const data = {
        method: 'POST',
        postData,
        headers: {
          ...interceptedRequest.headers(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      interceptedRequest.continue(data)
    })
    const response = await page.goto('https://t66y.com/search.php?')
    const responseBody = await response.text()
    return responseBody
  }
}
app()

// $$("tr a[target=_blank]").filter(i=>i.href.includes('htm_data')).map(i=>{return {href: i.href, text: i.innerText}})
// $$('.smalltxt').map(i=>i.innerText.split('\n')[1])      日期

// $$('a').filter(i=>i.innerHTML.includes('rmdown.com'))[0].innerText

// $$('button[type="submit"]')[0].click()
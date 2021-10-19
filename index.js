const puppeteer = require("puppeteer");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    let description = document.querySelector('#description').innerHTML;
    let title = document.querySelector('#detail-description-container > h2').innerHTML;
    let price = document.querySelector('#detail-title > div.price').innerHTML.split(';')[1];
    let address = document.querySelector('#detail-title > div.address').innerHTML;

    return {
      description,
      title,
      price,
      address,
    };
  });

  console.log(items);

  return items;
};

main().then((data) => console.log(data));

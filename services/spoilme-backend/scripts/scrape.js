const fetch = require("node-fetch");
const { scrapeFromSource } = require("../scraping/scraping");

const URLS = [
  "https://www.ozon.ru/context/detail/id/141977985",
  "https://www.ozon.ru/context/detail/id/168125487",
  "https://www.ozon.ru/context/detail/id/208565057",
  "https://www.ozon.ru/context/detail/id/205958752",
  "https://www.ozon.ru/context/detail/id/194084035",
  "https://www.ozon.ru/context/detail/id/191321443",
  "https://www.ozon.ru/context/detail/id/195145484",
];

async function main() {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  for(let url of URLS) {
    const result = await scrapeFromSource(url);
    console.log({ scrapedResult: result });
    const payload = { ...result, source: url };
    const rawResponse = await fetch('http://staging.spoilme.shop/api/v1/product/ozonSync', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const content = await rawResponse.json();

    console.log({content});
  }
};


// Run
(function(){main()})();
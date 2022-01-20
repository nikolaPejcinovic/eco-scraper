// Utils
const puppeteer = require("puppeteer");

// DB
const db = require("../models");

// Models
const Article = db.articles;

// Constants
const { messages } = require("../constants/messages");

exports.findAll = async (_, res) => {
  const articlesItems = [];

  try {
    const economist = {
      browser: null,
      page: null,
      initialize: async () => {
        try {
          economist.browser = await puppeteer.launch({
            headless: false,
          });
          economist.page = await economist.browser.newPage();
        } catch (e) {
          console.log(e);
        }
      },
      open: async (url) => {
        try {
          await economist.page.goto(url, {
            waitUntil: ["domcontentloaded"],
          });
        } catch (e) {
          console.log(e);
        }
      },
      getArticlesList: async () => {
        try {
          await economist.page.waitForSelector("body", { state: "visible" });

          const articlesData = await economist.page.evaluate(() =>
            Array.from(document.querySelectorAll(".e1yv2jhn0"), (el) => {
              const headline = el.querySelector("h3");
              const deck = el.querySelector("p");
              const anchor = el.querySelector("a");
              const image = el.querySelector("img");

              return {
                headline: headline.textContent,
                deck: deck?.textContent || null,
                link: anchor.href,
                textParagraphs: [],
                imgUrl: null,
                date: null,
              };
            })
          );

          articlesData.forEach(
            (a) =>
              ![
                "1843 magazine",
                "Checks and Balance",
                "Tracking Omicron",
                "Daily briefing | The Economist",
              ].includes(a.headline) && articlesItems.push(a)
          );
        } catch (e) {
          console.log(e);
        }

        economist.browser.close();
      },
      getArticles: async () => {
        for (let i = 0; i < articlesItems.length; i++) {
          try {
            await economist.open(articlesItems[i].link);
            await economist.page.waitForSelector("body", { state: "visible" });

            const textsData = await economist.page.evaluate(() =>
              Array.from(
                document.querySelectorAll(".article__body-text"),
                (el) => el.textContent
              )
            );

            const date = await economist.page.$eval(
              ".article__dateline-datetime",
              (el) => el.textContent
            );

            const img = await economist.page.$eval("img", (el) => el.src);

            textsData.forEach(
              (t) => t && articlesItems[i].textParagraphs.push(t)
            );
            articlesItems[i].date = date;
            articlesItems[i].imgUrl = img;
          } catch (e) {
            console.log(e);
          }
        }

        economist.browser.close();
      },
    };

    await Article.deleteMany({});

    await economist.initialize();
    await economist.open(process.env.NODE_APP_SCRAPER_URL);
    await economist.getArticlesList();
    await economist.initialize();
    await economist.getArticles();

    await Article.insertMany(articlesItems);

    const articles = await Article.find();

    return res.status(200).send(articles);
  } catch (e) {
    return res.status(500).send({
      message: e.message || messages.ARTICLES_ERROR_MESSAGE,
    });
  }
};

exports.findOne = async (req, res) => {
  Article.findById(req.params.id).exec((e, article) => {
    if (e) {
      return res.status(500).send({ message: e });
    }

    return res.status(200).send(article);
  });
};

// Utils
const puppeteer = require("puppeteer");

// DB
const db = require("../models");

// Models
const Article = db.articles;

// Constants
const { messages } = require("../constants/messages");

const economist = {
  browser: null,
  page: null,
  initialize: async () => {
    try {
      economist.browser = await puppeteer.launch();
      economist.page = await economist.browser.newPage();
    } catch (e) {
      throw new Error(e);
    }
  },
  open: async url => {
    try {
      await economist.page.goto(url, {
        waitUntil: ["domcontentloaded"]
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

exports.findAll = async (_, res) => {
  const articlesItems = [];

  try {
    async function getArticlesList() {
      try {
        await economist.page.waitForSelector("body", { state: "visible" });

        const articlesData = await economist.page.evaluate(() =>
          Array.from(document.querySelectorAll(".e1yv2jhn0"), el => {
            const headline = el.querySelector("h3");
            const deck = el.querySelector("p");
            const anchor = el.querySelector("a");
            const img = el.querySelector("img");

            return {
              headline: headline.textContent,
              deck: deck?.textContent,
              link: anchor?.href,
              textParagraphs: [],
              imgUrl: img?.src,
              date: null
            };
          })
        );

        articlesData
          .filter(a => a.headline)
          .forEach(
            a =>
              ![
                "1843 magazine",
                "Checks and Balance",
                "Tracking Omicron",
                "Daily briefing | The Economist",
                "The Economist explains",
                "The Intelligence",
                "The normalcy index"
              ].includes(a.headline) && articlesItems.push(a)
          );
      } catch (e) {
        throw new Error(e);
      }

      economist.browser.close();
    }

    await Article.deleteMany({});

    await economist.initialize();
    await economist.open(process.env.NODE_APP_SCRAPER_URL);
    await getArticlesList();

    await Article.insertMany(articlesItems);

    const articles = await Article.find();

    return res.status(200).send(articles);
  } catch (e) {
    return res.status(500).send({
      message: e.message || messages.ARTICLES_ERROR_MESSAGE
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    async function getArticle(article) {
      try {
        await economist.open(article.link);
        await economist.page.waitForSelector("body", { state: "visible" });

        const textsData = await economist.page.evaluate(() =>
          Array.from(
            document.querySelectorAll(".article__body-text"),
            el => el.textContent
          )
        );

        const date = await economist.page.$eval("time", el => el.textContent);

        const img = await economist.page.$eval("img", el => el.src);

        return {
          textParagraphs: textsData.map(t => t && t),
          date: date,
          imgUrl: img
        };
      } catch (e) {
        throw new Error(e);
      }

      economist.browser.close();
    }

    const article = await Article.findById(req.params.id);

    await economist.initialize();
    await economist.open(process.env.NODE_APP_SCRAPER_URL);
    const articleUpdate = await getArticle(article);

    article.textParagraphs = articleUpdate.textParagraphs;
    article.date = articleUpdate.date;
    article.imgUrl = articleUpdate.imgUrl;

    await article.save();

    return res.status(200).send(article);
  } catch (e) {
    return res.status(500).send({ message: e });
  }
};

const puppeteer = require("puppeteer");
const db = require("../models");

const Article = db.articles;

exports.findAll = async (req, res) => {
  const articlesItems = [];

  try {
    const economist = {
      browser: null,
      page: null,
      initialize: async () => {
        economist.browser = await puppeteer.launch({
          headless: false
        });
        economist.page = await economist.browser.newPage();
      },
      open: async url => {
        await economist.page.goto(url, {
          waitUntil: ["domcontentloaded"]
        });
      },
      getArticlesList: async () => {
        await economist.page.waitForSelector("body", { state: "visible" });

        const articlesData = await economist.page.evaluate(() =>
          Array.from(document.querySelectorAll(".e1yv2jhn0"), el => {
            const headline = el.querySelector("h3");
            const deck = el.querySelector("p");
            const anchor = el.querySelector("a");
            const image = el.querySelector("img");

            return {
              headline: headline.textContent,
              deck: deck?.textContent || null,
              link: anchor.href,
              textParagraphs: [],
              imgUrl: image?.src || null,
              date: null
            };
          })
        );

        articlesData.forEach(
          a =>
            ![
              "1843 magazine",
              "Checks and Balance",
              "Tracking Omicron"
            ].includes(a.headline) && articlesItems.push(a)
        );

        economist.browser.close();
      },
      getArticles: async () => {
        for (let i = 0; i < articlesItems.length; i++) {
          await economist.open(articlesItems[i].link);
          await economist.page.waitForSelector("body", { state: "visible" });

          const textsData = await economist.page.evaluate(() =>
            Array.from(
              document.querySelectorAll(".article__body-text"),
              el => el.textContent
            )
          );

          const date = await economist.page.evaluate(
            () => document.querySelector(".article__dateline-datetime"),
            el => el.textContent
          );

          textsData.forEach(t => t && articlesItems[i].textParagraphs.push(t));
          articlesItems[i].date = date;
        }

        economist.browser.close();
      }
    };

    let articles = await Article.find();

    if (!articles.length) {
      await economist.initialize();
      await economist.open(process.env.NODE_APP_SCRAPER_URL);
      await economist.getArticlesList();
      await economist.initialize();
      await economist.getArticles();

      await Article.insertMany(articlesItems);

      articles = await Article.find();
    }

    res.status(200).send(articles);
  } catch (e) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving articles."
    });
  }
};

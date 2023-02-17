import News from "../models/news.js";

const getNews = async (req, res) => {
  //const { page, limit, searchText } = req.body;
  console.log('getNews');
  try {
      const news = await News.find({ status: true });
      console.log(news);
      const count = news.length;

      res.json({
          news: news,
          count: count
      });
  } catch (err) {
      console.error(err.message);
  }
}

const newsController = {
  getNews,
}

export default newsController;
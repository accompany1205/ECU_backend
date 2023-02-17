import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import News from "../../models/news.js";

const getNews = async (req, res) => {
    //const { page, limit, searchText } = req.body;
    console.log('getNews');
    try {
        const news = await News.find();
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
const addNews = async (req, res) => {
    console.log('newscontroller: ',req.body);
    const news = new News({
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
    });
    try {
        const data = await news.save();
        res.json(data);
    } catch(e) {
        res.status(404).send('Request failed');
    }
}
const updateNews = async (req, res) => {
    
    try {
        const data = await News.findById(req.body._id);
        if(!data)
            return res.status(404).json({
            message: "news not found with id ",
          });
        console.log(req.body);
        data.title=req.body.title;
        data.content=req.body.content;
        data.imageUrl=req.body.imageUrl;
        data.status=req.body.status;
        await data.save();
        res.json(data);
    } catch(e) {
        res.status(404).send('Request failed');
    }
}
const deleteNews = (req, res) => {
    News.remove({_id: { $in: req.body.ids }})
      .then((news) => {
        if (!news) {
          return res.status(404).json({
            message: "news not found with id " + req.params.id,
          });
        }
        res.json({ message: "news deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).json({
            message: "news not found with id " + req.params.id,
          });
        }
        return res.status(500).json({
          message: "Could not delete news with id " + req.params.id,
        });
      });
  }

const vehicleController = {
    getNews,
    addNews,
    updateNews,
    deleteNews
};

export default vehicleController;
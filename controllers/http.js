const { request, response } = require("express");
const Hits = require("../models/http");

const hitsGet = async (req = request, res = response) => {
  let { limit = 5, skip = 0 } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  const hits = await Hits.find().limit(limit).skip(skip);
  const total = await Hits.countDocuments();
  res.json({
    Total: total,
    hits,
  });
};

const hitsGetAuthor = async (req = request, res = response) => {
  let { limit = 5, skip = 0, aut } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  const hits = await Hits.find({ author: aut }).limit(limit).skip(skip);
  const total = await Hits.countDocuments();
  res.json({
    Total: total,
    hits,
  });
};

const hitsGetTitle = async (req = request, res = response) => {
  let { limit = 5, skip = 0, tit } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  const hits = await Hits.find({ title: tit }).limit(limit).skip(skip);
  const total = await Hits.countDocuments();
  res.json({
    Total: total,
    hits,
  });
};
const hitsGetTags = async (req = request, res = response) => {
  let { limit = 5, skip = 0, tag } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  const hits = await Hits.find({ _tags: tag }).limit(limit).skip(skip);
  const total = await Hits.countDocuments();
  res.json({
    Total: total,
    hits,
  });
};

const hitsDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const hits = await Hits.findByIdAndDelete(id);
  res.json({
    msg: `the article: ${hits.story_title} whas deleted`,
  });
};
module.exports = {
  hitsGet,
  hitsGetAuthor,
  hitsGetTitle,
  hitsGetTags,
  hitsDelete,
};

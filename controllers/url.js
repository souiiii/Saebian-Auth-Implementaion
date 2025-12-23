import { nanoid } from "nanoid";

import URL from "../models/url.js";

export async function generateUrlShortner(req, res) {
  const body = req.body;
  if (body && body.url) {
    const url = body.url;
    const newId = nanoid(8);
    await URL.create({
      shortId: newId,
      redirectUrl: url,
      visitHistory: [],
    });
    // return res.status(201).json({
    //   url: `http://localhost:8001/saebian/${newId}`,
    // });
    return res.status(201).render("home", { id: newId });
  } else {
    return res.status(400).json({ error: "url is rquired" });
  }
}

export async function redirectFunc(req, res) {
  const id = req.params.id;
  console.log(id);
  const url = await URL.findOneAndUpdate(
    { shortId: id },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  console.log(url);
  if (!url) return res.status(400).json({ error: "No such url found" });
  const reUrl = url.redirectUrl;
  const target =
    reUrl.startsWith("http://") || reUrl.startsWith("https://")
      ? reUrl
      : `https://${reUrl}`;
  return res.redirect(`${target}`);
}

export async function getAnalytics(req, res) {
  const id = req.params.id;

  const url = await URL.findOne({ shortId: id });

  if (!url) return res.status(400).json({ error: "no such id was found" });

  return res.status(200).json({
    noOfTimesClicked: url.visitHistory.length,
  });
}

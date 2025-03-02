const shortid = require("shortid");
const { createURL, findURLByShortId, updateVisitHistory } = require("../models/urlModel");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid(); // Generate a unique short ID

  // Insert the new URL into the MySQL database
  try {
    await createURL(shortID, body.url, req.user._id);
    return res.render("home", {
      id: shortID,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error creating URL" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  try {
    const result = await findURLByShortId(shortId);
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory ? result.visitHistory.length : 0, // Handle case if visitHistory is empty
      analytics: result.visitHistory || [],
    });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching analytics" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};

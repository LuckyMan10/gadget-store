module.exports = function (req, res, next) {
  try {
    const secret_api_key = process.env.SECRET_API_KEY || "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf";
    const api_key = req.headers.api_key;
    if (!api_key || api_key !== secret_api_key) {
      return res.json({message: "Нет доступа."});
    };
    next();
  } catch (e) {
    return res.json({ message: e });
  }
};
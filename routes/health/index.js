module.exports = function (params) {
  const app = params.app;
  app.get("/", (req, res) => {
    res.status(200).json({
      status: true,
      message: "Welcome to i-web",
    });
  });
};

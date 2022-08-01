module.exports = function (params) {
  const app = params.app;
  const loginservice = require("./login.service");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");

  app.post("/login", async (req, res) => {
    try {
      const bodyInput = req.body;
      if (bodyInput.email == "") {
        return res.status(400).json({
          status: false,
          message: "Please enter emailid",
        });
      }
      if (bodyInput.password == "") {
        return res.status(200).json({
          status: false,
          message: "Please enter password",
        });
      }
      let user = await loginservice.getUserDetails({
        email: bodyInput.email,
      });

      if (!user) {
        return res.status(200).json({
          status: false,
          message: "Invalid email",
        });
      }
      console.log(bodyInput.password, user.password);
      let result = bcrypt.compareSync(bodyInput.password, user.password);
      if (!result) {
        return res.status(401).json({
          status: false,
          message: "please check password is wrong",
        });
      }
      const userToken = jwt.sign(
        {
          email_id: user.email,
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      return res.status(200).json({
        status: true,
        message: "Login success",
        data: {
          token: userToken,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        status: false,
        message: "Login Failed",
      });
    }
  });
};

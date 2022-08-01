const db = require("../../config/db/mongodb.connection").getDb();

let getUserDetails = async ({ ...data }) => {
  try {
    const result = await db.collection("users").findOne({ ...data });
    if (!result) {
      return false;
    }
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUserDetails,
};

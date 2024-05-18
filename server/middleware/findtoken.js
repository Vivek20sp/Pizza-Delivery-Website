import jwt from "jsonwebtoken";

const findtoken = async (req, res, next) => {
  try {
    const token = await req.header("auth-token" || "Auth-Token");

    if (!token) {
      return res.status(401).send({ error: "No Token Provided" });
    }

    const secreteKey = "VivekIsCollegeStudent";

    const decoded = jwt.verify(token, secreteKey);

    req.user = decoded.user.userId;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).send({ error: "Invalid Token" });
  }
};

export default findtoken;

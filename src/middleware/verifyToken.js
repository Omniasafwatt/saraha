import jwt from "jsonwebtoken";

export const verifytoken = async (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, "Sarah", async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token", err });
    req.user = decoded
    next();
  });
};

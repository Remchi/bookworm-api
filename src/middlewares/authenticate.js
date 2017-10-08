import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        req.userEmail = decoded.email;
        next();
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};

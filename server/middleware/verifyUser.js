import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);
    
    
    
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
    const decoded = jwt.verify(token, process.env.JWT);
    
    req.user = decoded; // Attach decoded user information to request object
    
    next();
  } catch (err) {
    return next(createError(401, "Invalid token!"));
  }
};

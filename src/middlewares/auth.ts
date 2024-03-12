import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Please Admin Logged In", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Admin Not Found", 401));

  if (user.role !== "admin")
    return next(new ErrorHandler("Admin Access Only", 401));

  next();
});

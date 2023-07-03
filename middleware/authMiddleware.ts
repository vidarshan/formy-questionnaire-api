import { Request } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IGetUserAuthInfoRequest } from "../definitions";

interface JwtPayload {
  _id: string;
}

const protect = expressAsyncHandler(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const { _id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        req.user = await User.findById({ _id, "tokens.token": token }).select(
          "-password"
        );

        next();
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };

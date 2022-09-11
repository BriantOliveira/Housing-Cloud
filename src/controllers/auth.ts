import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateUserPayload } from "../interfaces/user.interface";
import { UserService } from "../services/user.services";
import { hashPassword } from "../utils/ passwordHash";
import clientResponse from "../utils/clientResponse";
import { configuration } from "../config";
import logger from "../utils/logger";

const config = configuration();

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userServices = new UserService();

    // Check if User already exists
    const doesUserExist = await userServices.checkIfUserExist(req.body.email);
    if (doesUserExist === true) {
      return clientResponse(res, 409, {
        message: "User already exists.",
      });
    }

    const hash = (await hashPassword(req.body.password)) as string;
    const newUserData: CreateUserPayload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hash,
      privilege: req.body.privilege,
    };

    const user = await userServices.createUser(newUserData);
    if (!user || user === undefined) {
      logger.error(`An error occurred attempting to create User: ${req.body}`);
      return clientResponse(res, 400, {
        message: "An error occurred while attempting to create user.",
        success: false,
      });
    }

    const token = jwt.sign(
      { _id: user.id, privilege: user.privilege },
      config.jwtToken,
      { expiresIn: "24 hours" }
    );

    return clientResponse(res, 201, {
      message: "User created successfully.",
      success: true,
      data: { token, user },
    });
  } catch (error) {
    logger.error(`An unexpected error has occurred: ${error}`);
    return clientResponse(res, 500, {
      message: "An unexpected error has occurred. Please try again!",
      success: false,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userServices = new UserService();

    const user = await userServices.getUserByEmail(req.body.email);
    if (!user) {
      return clientResponse(res, 400, {
        message: "Invalid credentials.",
      });
    }

    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatched) {
      return clientResponse(res, 400, {
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      { _id: user.id, privilege: user.privilege },
      config.jwtToken,
      { expiresIn: "24 hours" }
    );

    return clientResponse(res, 200, {
      message: "User successfully logged in.",
      data: { token, user },
    });
  } catch (error) {
    logger.error(`An unexpected error has occurred: ${error}`);
    return clientResponse(res, 500, {
      message: "An unexpected error has occurred. Please try again!",
      success: false,
    });
  }
};

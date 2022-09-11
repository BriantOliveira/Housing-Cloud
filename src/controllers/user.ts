/*
 * User Controller
 */
// Importing dependencies
import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import clientResponse from "../utils/clientResponse";
import logger from "../utils/logger";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userServices = new UserService();
    const user = await userServices.getUserById(req.params.id);
    if (!user) {
      return clientResponse(res, 404, {
        message: "User not found.",
        success: false,
      });
    }

    return clientResponse(res, 200, {
      message: "User successfully found.",
      success: true,
      data: { user },
    });
  } catch (err) {
    logger.error(`An unexpected error has occurred: ${err}`);
    return clientResponse(res, 500);
  }
};

export const patchUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { body } = req;
    const userServices = new UserService();

    const user = await userServices.updateUser(id, body);
    if (!user) {
      return clientResponse(res, 400, {
        message: "An error occurred while updating user.",
      });
    }

    return clientResponse(res, 200, {
      message: "User successfully updated.",
      success: true,
      data: { user },
    });
  } catch (err) {
    logger.error(`An unexpected error has occurred: ${err}`);
    return clientResponse(res, 500, {
      message: "An unexpected error has occurred, please try again!",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const userServices = new UserService();

    await userServices.deleteUser(id);

    return clientResponse(res, 200, {
      message: "User successfully deleted.",
      success: true,
    });
  } catch (err) {
    logger.error(`An unexpected error has occurred: ${err}`);
    return clientResponse(res, 500, {
      message: "An unexpected error has occurred, please try again!",
    });
  }
};

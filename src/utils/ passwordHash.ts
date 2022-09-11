import bcrypt from "bcrypt";
import logger from "./logger";

export const hashPassword = async (
  password: string
): Promise<string | undefined> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (err) {
    logger.error("An error occurred while hashing new user password.");
    return undefined;
  }
};

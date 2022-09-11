import { getRepository, Repository, UpdateResult, DeleteResult } from "typeorm";

import User from "../entity/user";
import {
  CreateUserPayload,
  UserUpdateParams,
} from "../interfaces/user.interface";
import { createChildLogger } from "../utils/logger";

export class UserService {
  logger = createChildLogger("user-service");

  userRepository: Repository<User>;

  constructor(userRepository: Repository<User> = getRepository(User)) {
    this.userRepository = userRepository;
  }

  /**
   * @name getUserById - This method retrieves a User by the id.
   * @param id - UUID of the user.
   * @returns { Promise<User> } - Returns the User found or error.
   */
  async getUserById(id: string): Promise<User> {
    this.logger.debug(`Fetching user with id: ${id}`);
    const user = this.userRepository.findOneOrFail({ id });

    return user;
  }

  /**
   * @name createUser - This method creates a new user.
   * @param userData - The payload required to create new user.
   * @returns { Promise<User> } - Returns the new User or error.
   */
  async createUser(userData: CreateUserPayload): Promise<User> {
    this.logger.debug("Creating new user.");
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    return user;
  }

  /**
   * @name updateUser - This method updates a given user by the id.
   * @param id - The UUID of the user.
   * @param updates - The payload to be updated.
   * @returns { Promise<User | UpdateResult> } - Returns the updated User.
   */
  async updateUser(
    id: string,
    updates: UserUpdateParams
  ): Promise<User | UpdateResult> {
    this.logger.debug(`Updating user with id: ${id}`);
    const user = this.userRepository.update(id, updates);

    if (await user) {
      return this.getUserById(id);
    }
    return user;
  }

  /**
   * @name deleteUser - Returns the deleted User by the id.
   * @param id - The UUID of the user to be deleted.
   * @returns { Promise<DeleteResult> } - Returns the deleted result.
   */
  async deleteUser(id: string): Promise<DeleteResult> {
    this.logger.debug(`Deleting user with id: ${id}`);

    const deletedUser = this.userRepository.softDelete(id);

    return deletedUser;
  }
}

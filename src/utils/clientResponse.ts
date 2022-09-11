import { Response } from "express";

import {
  ResponseOptions,
  ResponsePayload,
} from "../interfaces/clientResponse.interfaces";

type Dict = { [key: number]: string };

const StatusCodes: Dict = {
  200: "Success",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  409: "Conflict",
  404: "Not Found",
  500: "Internal Server Error",
};

const StatusMessages: Dict = {
  200: "Request succeeded.",
  201: "Resource successfully created.",
  202: "The request is being processed and may take some time.",
  204: "There is nothing to return.",
  400: "Request failed, please try again.",
  401: "Please check credentials and try again.",
  403: "You must be logged in to access this resource.",
  404: "Nothing to see here ¯/_(ツ)_/¯.", // eslint-disable-line no-useless-escape
  409: "The request could not be completed, resource already exists.",
  500: "Something has gone wrong, please try again.",
};

/**
 * @description Takes an Express response object, an http status code, as well
 * as an options object. Using these parameters, it returns
 * a formatted Express response with a JSON payload configured with the optional
 * parameters. This function is useful for standardizing API responses.
 * @param {Response} res An Express Response object
 * @param {number} code An HTTP Status Code
 * @param {Options} opts An options object that accepts 'message', and 'data'.
 * All opts properties are optional.
 *
 * - message<string> A string containing a message for the response
 * - data<any> An object containing data to be returned in the response
 * @returns {Response} The modified response object.
 */
const clientResponse = (
  res: Response,
  code: number,
  opts?: ResponseOptions
): Response => {
  let message = "";
  let success: boolean | undefined;
  let data: Record<string, unknown> | undefined;

  // Check if opts were included
  if (opts) {
    // Add message to the payload
    message = opts.message || StatusMessages[code];
    success = opts.success || undefined;
    data = opts.data || undefined;
  }

  const payload: ResponsePayload = {
    status: StatusCodes[code],
    success,
    message,
    data,
  };

  // Return the composed response
  return res.status(code).json(payload);
};

export default clientResponse;

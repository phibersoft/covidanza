import {printError} from "./dom";

export interface ApiSuccess<T = any> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiFailure;

export const successResult = <T = any>(data: T): ApiSuccess<T> => {
  return {
    success: true,
    data,
  };
};

export const failureResult = (message: string): ApiFailure => {
  printError(message);

  return {
    success: false,
    message,
  };
};

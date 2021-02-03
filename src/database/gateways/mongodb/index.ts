import { Observable } from "rxjs";

export default abstract class MongodbGateway<T, X> {
  abstract getAll(): Observable<Array<T>>;
  abstract getById(id: X): Observable<T>;
  abstract getBy(param: X): Observable<Array<T>>;
  abstract create(param: T): Observable<T>;
  abstract delete(id: X): Observable<T>;
  abstract update(param: T): Observable<T>;
}

export interface errorModel {
  code: string
  message: string,
  errors: Array<any>,
}

export interface resultModel {
  code: string
  message: string,
  data: Array<any>,
}

export enum errorType {
  enum = 'enum',
  required = 'required'
}

export enum methods {
  PUT = 'PUT',
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export enum requestMessage {
  error = 'error',
  success = 'success',
}

export const handleErrorRequest = (error) => {
  const errorMessage: errorModel = {
    code: '',
    message: '',
    errors: []
  }

  if (error.errors) {
    errorMessage.errors = Object.keys(error.errors).map(
      (item: string) => {
        switch (error.errors[item].kind) {
          case errorType.enum:
            return handleErrorEnum(error.errors[item]);
          case errorType.required:
            return handleErrorRequire(error.errors[item]);
          default:
            return;
        }
      }
    )
  } else if (error.code === 11000) {
    errorMessage.errors.push(handleErrorUnique(error))
  }

  errorMessage.message = requestMessage.error;
  return errorMessage;
}

export const handleSuccessRequest = (data, method?: string) => {
  const result: resultModel = {
    code: '',
    message: '',
    data: []
  }

  if (method !== methods.DELETE) {
    result.data = data;
  }

  result.message = requestMessage.success
  return result;
}


export const handleErrorEnum = (error) => {
  const { value, path, properties } = error;

  return {
    name: path,
    message: `${value} is not a valid value for ${path}.`,
    acceptValue: properties.enumValues
  };
}

export const handleErrorUnique = (error) => {
  const { keyValue, name } = error;

  return {
    name: name,
    message: `${keyValue.name} is exist.`,
  };
}

export const handleErrorRequire = (error) => {
  const { path, properties } = error;

  return {
    name: path,
    message: properties.message,
  };
}
import { Observable } from "rxjs";

export default abstract class MongodbGateway<T, X> {
  abstract getAll(): Observable<Array<T>>;
  abstract getById(id: X): Observable<T>;
  abstract getBy(param: X): Observable<Array<T>>;
  abstract create(param: T): Observable<T>;
  abstract delete(id: X): Observable<T>;
  abstract update(param: T): Observable<T>;
}

export const handleErrorRequest = (error) => {
  const errorMessage: errorModel = {
    code: '',
    message: '',
    errors: []
  }

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

  return errorMessage;
}

export const handleSuccessRequest = (data) => {
  const result: resultModel = {
    code: '',
    message: '',
    data: []
  }

  result.data = data;
  return result;
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

export const handleErrorEnum = (error) => {
  const { value, path, properties } = error;

  return {
    name: path,
    message: `${value} is not a valid value for ${path}.`,
    acceptValue: properties.enumValues
  };
}

export const handleErrorRequire = (error) => {
  const { path, properties } = error;

  return {
    name: path,
    message: properties.message,
  };
}
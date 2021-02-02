import { Observable } from "rxjs";

export default abstract class MongodbGateway<T, X> {
  abstract getAll(): Observable<Array<T>>;
  abstract getById(id: X): Observable<T>;
  abstract getBy(param: X): Observable<Array<T>>;
  abstract create(param: T): Observable<T>;
  abstract delete(param: X): Observable<T>;
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

export interface errorModel {
  code: string
  message: string,
  errors: Array<any>,
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
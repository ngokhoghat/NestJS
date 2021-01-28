import { Observable } from "rxjs";

export default abstract class MongodbGateway<T, X> {
  abstract getAll(): Observable<Array<T>>;
  abstract getById(): Observable<T>;
  abstract getBy(param: X): Observable<Array<T>>;
  abstract create(param: T): Observable<T>;
  abstract delete(param: X): Observable<T>;
}
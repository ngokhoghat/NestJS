export default abstract class MysqldbGateway<T, X> {
  abstract getAll(): T;
  abstract getById(): T;
  abstract getBy(param: X): T;
  abstract create(param: T): T;
  abstract delete(param: T): T;
}
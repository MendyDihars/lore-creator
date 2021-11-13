export default class Decorator {
  public toKey(entity: any, field: string = 'id'): string {
    return entity[field].toLowerCase().replace(/\s/g, '_');
  }
}
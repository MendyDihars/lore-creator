export const toKey = (entity: any, field: string = 'id'): string =>
  entity[field].toLowerCase().replace(/\s/g, '_');
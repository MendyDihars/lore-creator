import type { Period } from '../types/period';

export const createPeriod = (period: Period, loreId: string): Promise<Period[]> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/periods/lores/${loreId}`, {
      method: 'POST',
      body: JSON.stringify(period)
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}

export const fetchPeriods = (loreId: string): Promise<Period[]> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/periods/lores/${loreId}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}
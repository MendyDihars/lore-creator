import type { Lore } from "../types/lore";

export const fetchLores = (): Promise<Lore[]> => {
  return new Promise((resolve, reject) => {
    fetch('/api/lores')
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  })
}

export const findLore = (id: string): Promise<Lore> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/lores/${id}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}
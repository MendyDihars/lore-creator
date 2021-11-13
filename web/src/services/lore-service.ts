import type { Lore } from "../types/lore";

export default class LoreService {
  public fetchLores(): Promise<Lore[]> {
    return new Promise((resolve, reject) => {
      fetch('/api/lores')
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    })
  }
}
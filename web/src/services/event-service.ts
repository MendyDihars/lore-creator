import type { Event } from "../types/event";

export const createEvent = (id: string, event: Event): Promise<Event> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/events/lore/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}

export const fetchEvents = (lore_id: string): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/events/lore/${lore_id}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}
export interface Event {
  id?: string;
  name: string;
  image?: string;
}

export interface EventState {
  events: Event[];
  event?: Event;
  loading: boolean;
}
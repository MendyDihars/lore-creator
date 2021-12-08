export interface Event {
  id?: string;
  name: string;
  content?: string;
  image?: string;
  period?: string;
}

export interface EventState {
  events: Event[];
  event?: Event;
  loading: boolean;
}
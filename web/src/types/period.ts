export interface Period {
  id?: string;
  name: string;
  position: number;
}

export interface PeriodState {
  periods: Period[];
  period?: Period;
  loading?: boolean;
}
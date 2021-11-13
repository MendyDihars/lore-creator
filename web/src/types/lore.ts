export interface Lore { 
  name: string;
  url?: string;
}

export interface LoreState {
  lores: Lore[];
  loading?: boolean;
}

export interface LoreAction {
  lores?: Lore[];
  type: string;
}

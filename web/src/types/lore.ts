export interface Lore { 
  id: string;
  name: string;
  image?: string;
}

export interface LoreState {
  lores: Lore[];
  loading?: boolean;
  current?: Lore;
}

export interface LoreAction {
  lores?: Lore[];
  type: string;
}

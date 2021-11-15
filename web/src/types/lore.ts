export interface Lore { 
  name: string;
  image?: string;
}

export interface LoreState {
  lores: Lore[];
  loading?: boolean;
}

export interface LoreAction {
  lores?: Lore[];
  type: string;
}

export interface Lore { 
  id?: string;
  name: string;
  image?: string;
}

export interface LoreState {
  lores: Lore[];
  loading?: boolean;
  lore?: Lore;
}

export interface LoreAction {
  lores?: Lore[];
  type: string;
}

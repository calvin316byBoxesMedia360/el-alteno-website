export type MenuCategoryId =
  | "seafood"
  | "specialties"
  | "enchiladas"
  | "burritos"
  | "fajitas"
  | "appetizers"
  | "vegetarian"
  | "parrilladas"
  | "tacos"
  | "salads"
  | "seafoodCocktails"
  | "alacarta"
  | "lunch"
  | "desserts";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  labelEs: string;
  icon: string;
  order: number;
  /** Optional line shown above the grid, e.g. "All plates served with rice, beans & corn tortillas" */
  note?: string;
  noteEs?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  price: number;
  category: MenuCategoryId;
  image: string | null;
  tags: string[];
  available: boolean;
}

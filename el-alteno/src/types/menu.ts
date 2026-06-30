export type MenuCategoryId =
  | "appetizers"
  | "seafood"
  | "specialties"
  | "enchiladas"
  | "burritos"
  | "fajitas"
  | "vegetarian"
  | "cocktails"
  | "salads"
  | "breakfast"
  | "lunch";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  labelEs: string;
  icon: string;
  order: number;
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

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadMenu() {
  const source = await readFile(new URL("../src/data/menu.ts", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const url = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(url);
}

const approvedPrices = {
  "camarones-diabla": 17.99,
  "huachinango-empanizado": 18.99,
  "camarones-empanizados": 17.99,
  "camarones-mojo-ajo": 17.99,
  "camarones-vegetales": 17.99,
  "camarones-tres-chiles": 17.99,
  "camarones-vallarta": 17.99,
  "huachinango-plancha": 17.99,
  "mariscada-caldo": 23.99,
  "mariscada-parrilla": 23.99,
  "caldo-camaron": 17.99,
  "caldo-7-mares": 19.99,
  salmon: 19.99,
  "caldo-res": 15.99,
  "caldo-pollo": 14.99,
  "caldo-birria": 18.99,
  "molcajete-chicken": 21.99,
  "molcajete-steak": 22.99,
  "molcajete-shrimp": 22.99,
  "molcajete-mixto": 23.99,
  sopes: 15.99,
  "chiles-rellenos": 17.99,
  "mole-puebla": 17.99,
  "pipian-mole-verde": 17.99,
  "tacos-dorados": 15.99,
  "new-york-steak": 21.99,
  "pechuga-carmelitas": 17.99,
  "carne-asada": 19.99,
  "chile-colorado": 17.99,
  "chile-verde": 17.99,
  pozole: 15.99,
  "tortilla-soup": 14.99,
  "enchiladas-mole-rojo": 17.99,
  "enchiladas-mole-verde": 17.99,
  "enchiladas-camaron-aguacate": 18.99,
  "enchiladas-verdes-cangrejo": 18.99,
  "enchiladas-mariscos": 20.99,
  "burrito-charbroiled-steak": 11.99,
  "burrito-rock-shrimp": 13.99,
  "burrito-chile-verde": 11.99,
  "burrito-chile-colorado": 11.99,
  "burrito-al-pastor": 10.99,
  "burrito-pork-carnitas": 10.99,
  "burrito-pollo-rojo": 10.99,
  "burrito-parrilla-chicken-guajillo": 12.99,
  "burrito-mango-tango-shrimp": 13.99,
  "burrito-rock-shrimp-verde": 13.99,
  "fajitas-chicken": 21.99,
  "fajitas-steak": 21.99,
  "fajitas-chicken-steak": 23.99,
  "fajitas-chicken-shrimp": 24.99,
  "fajitas-chicken-steak-prawns": 24.99,
  "tostadas-camaron": 7.99,
  "tostada-ceviche": 7.99,
  "orden-guacamole": 12,
  "flautas-pollo": 10.99,
  aguachile: 21.99,
  "nachos-mexicanos": 16.99,
  "dos-sopes-guacamole": 15.99,
  "dos-cheese-enchiladas": 17.99,
  "veggie-burrito": 12.99,
  "veggie-fajitas": 18.99,
  "parrillada-2-3": 67.99,
  "parrillada-3-5": 89.99,
  "taco-charbroiled-steak": 3.5,
  "taco-red-snapper": 5,
  "taco-pollo-rojo": 3.5,
  "taco-pork-carnitas": 3.5,
  "taco-al-pastor": 3.5,
  "ensalada-canasta": 14.99,
  "ensalada-camaron-aguacate": 18.99,
  "coctel-camaron": 18.99,
  "coctel-camaron-pulpo": 19.99,
  "alacarta-cheese-enchilada": 4.99,
  "alacarta-chicken-enchilada": 4.99,
  "alacarta-beef-enchilada": 5.99,
  "alacarta-queso-quesadilla": 7.99,
  "lunch-flautas-pollo": 11.99,
  "lunch-cheese-enchilada": 11.99,
  "lunch-chicken-enchilada": 11.99,
  "lunch-quesadilla-pollo-chipotle": 12.99,
  "lunch-quesadilla-camaron": 13.99,
  "lunch-chile-relleno": 12.99,
  "lunch-enchilada-asada": 12.99,
  "lunch-quesadilla-carne-asada": 13.99,
  flan: 7,
};

const { categories, menuItems } = await loadMenu();
const byId = new Map(menuItems.map((item) => [item.id, item]));

test("approved August prices are exact", () => {
  for (const [id, price] of Object.entries(approvedPrices)) {
    assert.equal(byId.get(id)?.price, price, `${id} must cost $${price.toFixed(2)}`);
  }
});

test("removed dishes stay absent", () => {
  for (const id of ["filete-limon", "alacarta-fish-fillet", "helado"]) {
    assert.equal(byId.has(id), false, `${id} must be removed`);
  }
});

test("menu identifiers and prices remain valid", () => {
  assert.equal(byId.size, menuItems.length, "menu item IDs must be unique");
  assert.equal(new Set(categories.map((category) => category.id)).size, categories.length);
  assert.deepEqual(categories.map((category) => category.order), categories.map((_, index) => index + 1));
  for (const item of menuItems.filter((candidate) => candidate.available)) {
    assert.equal(Number.isFinite(item.price) && item.price >= 0, true, `${item.id} needs a valid price`);
  }
});

test("new dishes use their approved categories and facts", () => {
  assert.equal(byId.get("caldo-res")?.category, "soups");
  assert.equal(byId.get("caldo-pollo")?.category, "soups");
  assert.equal(byId.get("caldo-birria")?.category, "specialties");
  assert.match(byId.get("caldo-birria")?.description ?? "", /weekends only/i);
  assert.match(byId.get("caldo-birria")?.descriptionEs ?? "", /fines de semana/i);
  assert.match(byId.get("mariscada-parrilla")?.description ?? "", /hot skillet/i);
  assert.match(byId.get("mariscada-parrilla")?.descriptionEs ?? "", /sart[eé]n caliente/i);
});

test("approved names and ingredient corrections are bilingual", () => {
  const chickenTaco = byId.get("taco-pollo-rojo");
  assert.equal(chickenTaco?.name, "Grilled Chicken Taco");
  assert.equal(chickenTaco?.nameEs, "Taco de Pollo a la Parrilla");

  const canasta = byId.get("ensalada-canasta");
  assert.doesNotMatch(canasta?.description ?? "", /green beans/i);
  assert.doesNotMatch(canasta?.descriptionEs ?? "", /ejotes?/i);

  const shrimpSalad = byId.get("ensalada-camaron-aguacate");
  assert.doesNotMatch(shrimpSalad?.description ?? "", /jicama/i);
  assert.doesNotMatch(shrimpSalad?.descriptionEs ?? "", /j[ií]cama/i);

  for (const id of [
    "burrito-parrilla-chicken-guajillo",
    "burrito-mango-tango-shrimp",
    "burrito-rock-shrimp-verde",
  ]) {
    const text = `${byId.get(id)?.description ?? ""} ${byId.get(id)?.descriptionEs ?? ""}`;
    assert.doesNotMatch(text, /spinach flour tortilla|sun-dried tomato flour tortilla|tortilla de espinaca|tortilla de tomate deshidratado/i);
  }

  const mango = byId.get("burrito-mango-tango-shrimp");
  assert.doesNotMatch(`${mango?.description ?? ""} ${mango?.descriptionEs ?? ""}`, /j[ií]cama/i);
});

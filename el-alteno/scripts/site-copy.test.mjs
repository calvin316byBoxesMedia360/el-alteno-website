import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [menuSection, location, footer] = await Promise.all([
  readFile(new URL("../src/components/sections/MenuSection.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/sections/Location.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/layout/Footer.tsx", import.meta.url), "utf8"),
]);

test("the menu section contains the approved bilingual slogan", () => {
  assert.match(menuSection, /Sabor a/);
  assert.match(menuSection, /México/);
  assert.match(menuSection, /con sazón de la casa/);
  assert.match(menuSection, /A taste of/);
  assert.match(menuSection, /seasoned in our kitchen/);
});

test("both public hours surfaces show Monday closed", () => {
  for (const [name, source] of [["Location", location], ["Footer", footer]]) {
    assert.match(source, /Tuesday – Saturday/iu, `${name} needs the open English day range`);
    assert.match(source, /Martes – Sábado/iu, `${name} needs the open Spanish day range`);
    assert.match(source, /Monday(?: — Closed|", "Lunes")/u, `${name} needs Monday as the closed day`);
    assert.doesNotMatch(source, /Tuesday — Closed|Martes — Cerrado/u, `${name} still closes Tuesday`);
    assert.doesNotMatch(source, /Monday, Wednesday|Lunes, Miércoles/u, `${name} still opens Monday`);
  }
});

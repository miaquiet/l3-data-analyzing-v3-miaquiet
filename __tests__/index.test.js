// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';

import { execSync } from 'child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { encoding: 'utf8', cwd: path.join(__dirname, '..') };
const result1 = execSync(
  'bin/heroes.js __fixtures__/heroes1.csv',
  // @ts-ignore
  options,
);
const result2 = execSync(
  'bin/heroes.js __fixtures__/heroes2.csv',
  // @ts-ignore
  options,
);
const rows1 = result1.trim().split('\n');
const rows2 = result2.trim().split('\n');

test('step1', () => {
  assert.strictEqual(rows1[0], 'Count: 10');
  assert.strictEqual(rows2[0], 'Count: 9');
});

test('step2', () => {
  assert.strictEqual(rows1[1], 'Castles: Замок, Оплот');
  assert.strictEqual(rows2[1], 'Castles: Башня, Замок, Оплот');
});

test('step3', () => {
  assert.strictEqual(rows1[2], 'Largest hp: ангел');
  assert.strictEqual(rows2[2], 'Largest hp: дракон');
});

test('step4', () => {
  assert.strictEqual(rows1[3], 'Average damage: кентавр: 2.5, копейщик: 2, лучник: 2.5, грифон: 4.5, рыцарь: 7.5, единорог: 20, дракон: 47.5, монах: 11, кавалерист: 20, ангел: 50');
  assert.strictEqual(rows2[3], 'Average damage: мастер-гремлин: 1.5, лучник: 2, титан: 50.5, кентавр: 2.5, единорог: 20, дракон: 45, монах: 11, кавалерист: 20, королева-нага: 30');
});

test('step5', () => {
  assert.strictEqual(rows1[4], 'Strongest creature: ангел');
  assert.strictEqual(rows2[4], 'Strongest creature: дракон');
});

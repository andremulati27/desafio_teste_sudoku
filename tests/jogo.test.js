const test = require('node:test');
const assert = require('node:assert/strict');
const { validar, estaResolvido, resolver, candidatos } = require('../src/jogo.js');

const solucao = [
  [1, 1, 0, 1, 0, 0],
  [1, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 1],
  [0, 0, 1, 0, 1, 1]
];
const vazia = () => Array.from({ length: 6 }, () => Array(6).fill(null));
const copia = grade => grade.map(linha => [...linha]);

test('SB01: grade vazia ou parcial é válida, mas não resolvida', () => {
  const grade = vazia(); grade[0][0] = 1;
  assert.equal(validar(vazia()), true);
  assert.equal(validar(grade), true);
  assert.equal(estaResolvido(grade), false);
});

test('SB02: solução completa satisfaz todas as regras', () => {
  assert.equal(validar(solucao), true);
  assert.equal(estaResolvido(solucao), true);
});

test('SB03: dimensão e símbolos inválidos são erros de entrada', () => {
  assert.throws(() => validar(vazia().slice(1)), TypeError);
  const grade = vazia(); grade[2][3] = 2;
  assert.throws(() => validar(grade), TypeError);
  assert.throws(() => resolver('000000'), TypeError);
});

test('SB04: cada linha e coluna pode conter no máximo três de cada valor', () => {
  const linha = vazia(); [0, 2, 4, 5].forEach(c => { linha[0][c] = 0; });
  assert.equal(validar(linha), false);
  const coluna = vazia(); [0, 2, 4, 5].forEach(l => { coluna[l][0] = 1; });
  assert.equal(validar(coluna), false);
});

test('SB05: trincas horizontais e verticais são proibidas', () => {
  const linha = vazia(); linha[0].splice(0, 3, 1, 1, 1);
  assert.equal(validar(linha), false);
  const coluna = vazia(); [0, 1, 2].forEach(l => { coluna[l][0] = 0; });
  assert.equal(validar(coluna), false);
});

test('SB06: linhas e colunas completas não podem ser iguais', () => {
  const linhas = vazia(); linhas[0] = [...solucao[0]]; linhas[1] = [...solucao[0]];
  assert.equal(validar(linhas), false);
  const colunas = vazia(); for (let l = 0; l < 6; l++) { colunas[l][0] = solucao[0][l]; colunas[l][1] = solucao[0][l]; }
  assert.equal(validar(colunas), false);
});

test('SB07: candidatos excluem trinca e casa ocupada', () => {
  const grade = vazia(); grade[0][0] = 0; grade[0][1] = 0;
  assert.deepEqual(candidatos(grade, 0, 2), [1]);
  assert.deepEqual(candidatos(grade, 0, 0), []);
  assert.throws(() => candidatos(grade, 6, 0), RangeError);
});

test('SB08: resolver preserva pistas e não modifica a entrada', () => {
  const grade = copia(solucao); grade[0][2] = null; grade[2][4] = null; grade[5][0] = null;
  const antes = copia(grade);
  const resolvida = resolver(grade);
  assert.deepEqual(grade, antes);
  assert.equal(estaResolvido(resolvida), true);
  assert.equal(resolvida[0][0], grade[0][0]);
  assert.equal(resolvida[1][3], grade[1][3]);
});

test('SB09: grade contraditória não possui solução', () => {
  const grade = vazia(); grade[0][0] = 0; grade[0][1] = 0; grade[0][2] = 0;
  assert.equal(resolver(grade), null);
});

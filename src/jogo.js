function forma(tabuleiro) {
  if (!Array.isArray(tabuleiro) || tabuleiro.length !== 6 || tabuleiro.some(linha => !Array.isArray(linha) || linha.length !== 6 || linha.some(v => v !== 0 && v !== 1 && v !== null))) throw new TypeError('Tabuleiro deve ser 6 × 6, com 0, 1 ou null');
}

function validar(tabuleiro) {
  forma(tabuleiro);
  const linhas = tabuleiro;
  const colunas = Array.from({ length: 6 }, (_, c) => tabuleiro.map(linha => linha[c]));
  for (const grupo of [linhas, colunas]) {
    const completas = new Set();
    for (const seq of grupo) {
      const zeros = seq.filter(v => v === 0).length, uns = seq.filter(v => v === 1).length;
      if (zeros > 3 || uns > 3) return false;
      if (seq.every(v => v !== null)) {
        if (zeros !== 3 || uns !== 3) return false;
        const chave = seq.join('');
        if (completas.has(chave)) return false;
        completas.add(chave);
      }
      for (let i = 0; i < 4; i++) if (seq[i] !== null && seq[i] === seq[i+1] && seq[i] === seq[i+2]) return false;
    }
  }
  return true;
}

function estaResolvido(tabuleiro) { return validar(tabuleiro) && tabuleiro.every(linha => linha.every(v => v !== null)); }

function candidatos(tabuleiro, linha, coluna) {
  forma(tabuleiro);
  if (![linha, coluna].every(Number.isInteger) || linha < 0 || linha > 5 || coluna < 0 || coluna > 5) throw new RangeError('Coordenada inválida');
  if (tabuleiro[linha][coluna] !== null) return [];
  return [0, 1].filter(valor => {
    const copia = tabuleiro.map(l => [...l]); copia[linha][coluna] = valor;
    return validar(copia);
  });
}

function resolver(tabuleiro) {
  forma(tabuleiro);
  const grade = tabuleiro.map(l => [...l]);
  if (!validar(grade)) return null;
  function buscar() {
    if (estaResolvido(grade)) return grade.map(l => [...l]);
    let melhor = null;
    for (let l = 0; l < 6; l++) for (let c = 0; c < 6; c++) if (grade[l][c] === null) {
      const opcoes = candidatos(grade, l, c);
      if (!opcoes.length) return null;
      if (!melhor || opcoes.length < melhor.opcoes.length) melhor = { l, c, opcoes };
    }
    if (!melhor) return null;
    for (const valor of melhor.opcoes) {
      grade[melhor.l][melhor.c] = valor;
      const achada = buscar();
      if (achada) return achada;
    }
    grade[melhor.l][melhor.c] = null;
    return null;
  }
  return buscar();
}

module.exports = { validar, estaResolvido, resolver, candidatos };

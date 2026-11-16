# Desafio: testes de Sudoku binário

## Colaboradores

- André Filipe Caetano Mulati 24011149-2
- Pedro Massaki Carnelossi 24036481-2

## Especificação adotada

Tabuleiro **6 × 6** com `0`, `1` e `null` (casa vazia). Solução válida: cada linha e coluna tem três zeros e três uns; não há três valores iguais consecutivos na horizontal ou vertical; não há duas linhas iguais nem duas colunas iguais. Pistas dadas não podem ser modificadas ao resolver. Um tabuleiro parcial é válido quando ainda pode respeitar as regras locais; a solução só é aceita se todas as casas estiverem preenchidas e todas as regras forem satisfeitas. Entradas com dimensão ou símbolos incorretos lançam `TypeError`.

## API implementada em `src/jogo.js`

Exportações CommonJS:

- `validar(tabuleiro)`: retorna `boolean` para tabuleiros parciais ou completos bem formados; retorna `false` para violação de regra.
- `estaResolvido(tabuleiro)`: retorna `boolean`.
- `resolver(tabuleiro)`: retorna uma solução 6 × 6 sem alterar a entrada, ou `null` se não houver solução.
- `candidatos(tabuleiro, linha, coluna)`: retorna uma lista ordenada de valores (`[0]`, `[1]`, `[0,1]` ou `[]`) que podem ocupar uma casa vazia sem violação imediata. Coordenadas inválidas lançam `RangeError`; casa preenchida retorna `[]`.

## Casos de teste

| ID | Cenário e resultado esperado |
| --- | --- |
| SB01 | Grade vazia e parcial consistente são válidas, mas não resolvidas. |
| SB02 | Grade completa correta é válida e resolvida. |
| SB03 | Forma 5 × 6, valor `2` ou string lança `TypeError`. |
| SB04 | Quatro ocorrências do mesmo valor em uma linha/coluna invalidam. |
| SB05 | Três zeros ou uns consecutivos na linha/coluna invalidam. |
| SB06 | Linhas completas idênticas ou colunas completas idênticas invalidam. |
| SB07 | Candidatos refletem restrições; casa preenchida não tem candidatos. |
| SB08 | Resolver preserva pistas, não altera entrada e entrega grade válida. |
| SB09 | Grade sem solução retorna `null`. |

## Como os testes funcionam

`tests/jogo.test.js` executa `src/jogo.js` com grades fixas para cada regra e usa `node:test`/`node:assert/strict`. Execute `npm test` com Node.js 20 ou superior. **Resultado verificado: 9 testes aprovados.**

const Blockchain = require('./blockchain');

function imprimirCadeia(cadeia) {
  for (const bloco of cadeia) {
    console.log(`#${bloco.indice} | ${bloco.dados} | ${bloco.hash.slice(0, 10)}...`);
  }
}

const registro = new Blockchain();

// 1) Cadastro de entregas
registro.adicionar('Entrega E-001 para Ji-Paraná: em rota');
registro.adicionar('Entrega E-002 para Ariquemes: entregue');
registro.adicionar('Entrega E-003 para Vilhena: aguardando coleta');

console.log('--- Cadeia ---');
imprimirCadeia(registro.cadeia);
console.log('Cadeia válida?', registro.ehValida());

// 2) Dados inválidos não derrubam o programa
console.log('\n--- Dados inválidos ---');
for (const invalido of ['ab', 'x'.repeat(81), undefined]) {
  try {
    registro.adicionar(invalido);
  } catch (erro) {
    console.log('Erro:', erro.message);
  }
}
console.log('Blocos na cadeia:', registro.cadeia.length);

// 3) Adulteração
console.log('\n--- Adulteração ---');
registro.cadeia[1].dados = 'Entrega E-001 para Ji-Paraná: CANCELADA';
imprimirCadeia(registro.cadeia);
console.log('Cadeia válida?', registro.ehValida());

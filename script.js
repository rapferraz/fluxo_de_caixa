let entradaTotal = 0;
let saidaTotal = 0;

document.getElementById('incluir').addEventListener('click', () => {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    if (!descricao || isNaN(valor)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    adicionarTransacao(descricao, valor, tipo);
    atualizarTotais(tipo, valor);
    limparCampos();
});

function adicionarTransacao(descricao, valor, tipo) {
    const transacoes = document.getElementById('transacoes');
    const transacao = document.createElement('div');
    transacao.classList.add('transacao');

    const descricaoElem = document.createElement('span');
    descricaoElem.textContent = descricao;

    const valorElem = document.createElement('span');
    valorElem.textContent = `R$ ${valor.toFixed(2)}`;

    const tipoElem = document.createElement('span');
    tipoElem.textContent = tipo === 'entrada' ? 'Entrada' : 'Saída';
    tipoElem.classList.add(tipo === 'entrada' ? 'tipo-entrada' : 'tipo-saida');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '🗑️';
    deleteButton.onclick = () => {
        transacoes.removeChild(transacao);
        atualizarTotais(tipo, -valor);
    };

    transacao.appendChild(descricaoElem);
    transacao.appendChild(valorElem);
    transacao.appendChild(tipoElem);
    transacao.appendChild(deleteButton);
    transacoes.appendChild(transacao);
}

function atualizarTotais(tipo, valor) {
    if (tipo === 'entrada') {
        entradaTotal += valor;
    } else {
        saidaTotal += valor;
    }

    const total = entradaTotal - saidaTotal;

    document.getElementById('valor_entrada').textContent = entradaTotal.toFixed(2);
    document.getElementById('valor_saida').textContent = saidaTotal.toFixed(2);
    document.getElementById('valor_total').textContent = total.toFixed(2);
}

function limparCampos() {
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('tipo').value = 'entrada';
}

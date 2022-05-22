const express = require('express');
const uuid = require('uuid');
const fs = require('fs');

const app = express();

app.use(express.json());

let produtos = [];

fs.readFile('produtos.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        produtos = JSON.parse(data);
    }
})

app.post('/produtos', (req, res) => {
    const { name, price } = body = req.body;

    const novoProduto = {
        name,
        price,
        id: uuid(),
    }
    produtos.push(novoProduto);

    arquivoProdutos();

    return res.json(novoProduto);
});

app.get('/produtos', (req, res) => {
    return res.json(produtos)
})

app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const product = produtos.find(product => product.id === id);
    return res.json(product)
})

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const prodIndex = produtos.findIndex((produto) => produto.id === id);
    produtos[prodIndex] = {
        ...produtos[prodIndex],
        name,
        price
    }

    arquivoProdutos();

    return res.json('Produto alterado com sucesso!');
})

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const prodIndex = produtos.findIndex((produto) => produto.id === id);

    produtos.splice(prodIndex, 1);

    arquivoProdutos();

    return res.json('Produto deletado com sucesso!')
})

function arquivoProdutos() {
    fs.writeFile('produtos.json', JSON.stringify(produtos), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Produto inserido');
        }
    });
}

app.listen(3000, () => console.log('Running on port 3000'));
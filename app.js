const exprss = require('express');

const app = exprss();

app.get('/', (req, res) => {
    return res.json(
        {
            messege: 'Primeira rota',
        }
    );
})

app.listen(3000, () => console.log('Running on port 3000'));
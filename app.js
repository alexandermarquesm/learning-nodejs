const exprss = require('express');

const app = exprss();

app.get('/', (req, res) => {
    return res.send('Hello World in express');
})

app.listen(3000, () => console.log('Running on port 3000'));
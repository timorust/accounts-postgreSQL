const express = require('express')
const path = require('path')
const acc_repo = require('./account_repo')


const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname, '/')))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/accounts', async(req, res) => {
  const account = await acc_repo.getAllAccount(); 
  res.status(200).json({account})
});

app.get('/accounts/:acc_id', async(req, res) => {
  const id = req.params.acc_id;
  const account = await acc_repo.getAccountById(id); 
  res.status(200).json({account})
});



app.post('/accounts', async (req, res) => {
    try
    {
        acc = req.body
        const result = await acc_repo.addAccount(acc)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/accounts/${acc}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})

app.put('/accounts/:acc_id', async(req, res) => {
    try
    {
        const acc_id = req.params.acc_id
        acc = req.body
        const result = await acc_repo.updateAccount(acc, acc_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/accounts/${acc_id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.delete('/accounts/:acc_id', async(req, res) => {
    try
    {
        const acc_id = req.params.acc_id
        const result = await acc_repo.deleteAccount(acc_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/accounts/${acc_id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});


app.listen(port, () => console.log(`Listening to port ${port}`))








// app.post('/books', async (req, res) => {
//     try
//     {
//         bks = req.body
//         console.log(bks)
//         const result = await bks_repo.addBook(bks)
//         res.status(201).json({
//             res: 'success',
//             url: `localhost:8080/books/${bks.ID}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// })

// app.put('/books/:bks_id', async(req, res) => {
//     try
//     {
//         const bks_id = req.params.bks_id
//         bks = req.body
//         const result = await bks_repo.updateBook(bks, bks_id)
//         res.status(200).json({
//             res: 'success',
//             url: `localhost:8080/books/${bks.ID}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// });

// app.delete('/books/:bks_id', async(req, res) => {
//     try
//     {
//         const bks_id = req.params.bks_id
//         const result = await bks_repo.deleteBook(bks_id)
//         res.status(200).json({
//             res: 'success',
//             url: `localhost:8080/books/${bks_id}`,
//             result
//         })
//     }
//     catch(e) {
//         res.status(400).send({
//             status: 'fail',
//             message: e.message
//         })
//     }
// });


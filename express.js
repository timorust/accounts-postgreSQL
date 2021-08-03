const express = require('express')
const path = require('path')
const acc_repo = require('./account_repo')

const port = 8080;
const app = express();

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

app.use(express.static(path.join(__dirname, '/')))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))



const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

const logger = createLogger({
  format: combine(
    label({ label: 'main logger!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console(),
    new transports.File({
        filename: 'example.log',
        level: 'info'})
    ]
})


logger.log({
  level: 'info',
  message: '*********** starting app ***********'
});


app.get('/pg_accounts', async(req, res) => {
  pool.query('SELECT * FROM account', (error, results) => {
          if (error) {
           logger.log({
               level: 'error',
               message: `Error: ${error}`
           });
           res.status(500).json({'error': error.toString()})
        }
        else 
        res.status(200).json(results.rows)
    })
});

app.get('/accounts/:acc_id', async(req, res) => {
    // log debug --
    // starting function: app.get('/accounts/:acc_id',...)
    // parameters: req, res, req.params.acc_id 
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
            url: `localhost:8080/accounts/${result}`,
            result
        })
    }
    catch(e) {

        logger.log({
               level: 'error',
               message: `app.post('/accounts'). Error: ${e}`
           });
           logger.log({
               level: 'error',
               message: `sql dump: sql insert for object ${JSON.stringify(acc)}`
           });
           
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
        // failed to write to db
        // write all the db info for the operation
    const logger = createLogger({
    format: combine(
        label({ label: 'main logger!' }),
        timestamp(),
        prettyPrint()
     ),
    transports: [new transports.Console(),
    new transports.File({
        filename: 'example.log',
        level: 'info'})]
    })
    res.status(400).send({
        status: 'fail',
        message: e.message
    })
   }
});


// app.delete('/accounts/:acc_id', async(req, res) => {
//     try
//     {
//         const acc_id = req.params.acc_id
//         const result = await acc_repo.deleteAccount(acc_id)
//         res.status(200).json({
//             res: 'success',
//             url: `localhost:8080/accounts/${acc_id}`,
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


app.listen(port, () => console.log(`Listening to port ${port}`))
const express = require('express')
const { handler } = require('./app/index')
const newman = require('newman')

const app = express();
const port = 9000;

let server = null;

app.post('/2015-03-31/functions/function/invocations', async (req, res) => {
  try {
    const body = req.body ? JSON.parse(req.body) : req;
    handler(body, {}).then(result => {
      res.send(result);
    }).catch(error => console.error(error));
  } catch(error) {
    console.error(error);
  }
})

app.all('/api', async (req, res) => {
  handler(req, {}).then(result => {
    res.send(result);
  }).catch(error => console.error(error));
});

server = app.listen(port, () => {
  console.log(`
  Example app listening at: 
    POST http://localhost:${port}/2015-03-31/functions/function/invocations
  `);

  if (process.argv[2]) {
    const testFilename = process.argv[3] || 'service-collection.postman_collection.json'

    console.log('Running Newman tests');
    if (!existsSync(`./${testFilename}`)) {
      console.error(`Error: test collection not found
        ./${testFilename}
      
        Skipping tests. Running dev server only.
      `);

      return;
    }
    console.log('Test collection:', testFilename);

    newman.run({
      collection: require(`./${testFilename}`),
      reporters: 'cli',
    }, 
    (err, summary) => {
      if (err) {
        console.log(err);
        process.exit(1)
      }
      process.exit();
    })
  }
})
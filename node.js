const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Weeorld!')
})


app.get('/blog/:slug', (req, res) => {
    res.send(`hello ${req.params.slug}`)

  })


  app.use(express.static("public"));

  app.get('/', (req, res) => {
      console.log("Hey its a get request");
      res.send('Hello World2!');
  });
  
  app.post('/', (req, res) => {
      console.log("Hey its a post request");
      res.send('Hello World post!');
  });
  
  app.put('/', (req, res) => {
      console.log("Hey its a put request");
      res.send('Hello World put!');
  });
  

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
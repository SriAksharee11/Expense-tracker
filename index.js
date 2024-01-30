const express = require('express');
const mongoose =require('mongoose');
const app = express()
const port = 3000
const Expense = require('./models/expense');
mongoose.connect('mongodb+srv://sriaksharee_11:XmTvvglJSodVkurP@cluster0.jzj4xsi.mongodb.net/newDb?retryWrites=true&w=majority',{

    useUnifiedTopology:true
});
app.use(express.json());   //middle ware
app.get('/expenses', async (req, res) => {
   const result = await Expense.find();
  res.send(result);
})

app.delete('/expenses/:id', async (req, res) => {
    try{
      const id= req.params.id;
      const result = await Expense.findByIdAndDelete(id);
      if(result)
      res.send(result)
    else
       res.send("No expense with that id");
    }catch(err){
        res.send(err);
    }
  })
   /* app.delete('/expenses/:id', async (req, res) => {
      try{
        const id= req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if(result)
            res.send(reult);
          else 
          res.send("no expense with that id")
      }catch(err){
          res.send(err);
      }
    const id = req.params.id;

    const result = await Expense.findById(id);
    if(result)
    res.send(result);
    else
    res.send("No expense with that id");
   //  res.send(result);
   res.send('req.params');
 })
 */

app.post('/expenses', async(req, res) => {
  console.log(req.body);
  const newExpense =req.body;
  await Expense.create(newExpense);
  res.send('Created')
  })

  app.put('/expense/:id', async(req,res) => {
    const id =req.params.id;
     const updateObject = req.body;
     const updatedObject =await Expense.findByIdAndUpdate(id,{$set: updateObject},{
    new: true
  })
  res.send(updateObject);

})
const port1=process.env.PORT || 8000

app.listen(port1, () => {
  console.log(`Example app listening on port ${port}`)
})

//create retrieve update delete CRUD

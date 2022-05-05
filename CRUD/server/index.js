const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routes")
const cors = require("cors");
const Food = require("./food.js")
const app = express();


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://root:root@crud.bjgm0.mongodb.net/CRUD?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");


});



app.post("/insert", async (request, response) => {
  const foodName = request.body.foodName;
  const Price = request.body.Price;
  const food = new Food({name:foodName,price:Price});
  


  try {
    await food.save();
    response.send("Data Saved");
  } catch (error) {
    response.status(500).send(error);
  }
});


app.put("/update", async (request, response) => {
  const id = request.body.id;
  const foodName = request.body.upfoodName;

  try {
   await Food.findById(id,(err,updatedFood)=>{
      updatedFood.name = foodName
      updatedFood.save(); 
    })
    response.send("Data  Updated");
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/updateprice", async (request, response) => {
  const id = request.body.id;
  const newPrice = request.body.upPrice;

  try {
   await Food.findById(id,(err,upprice)=>{
      upprice.price = newPrice
      upprice.save(); 
    })
    response.send("Data  Updated");
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/delete/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await Food.findByIdAndRemove(id).exec();
    
    response.send("Data Deleted");
  } catch (error) {
    response.status(500).send(error);
  }
});



app.get("/read",  (req, res) => {
  Food.find({},(err,result)=>{
    if(err)
    {
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
});

app.listen(3001,()=>{
    console.log("server sun raha h 3001")
})
const { error } = require("console");
const express= require("express");
const app= express();
const fs = require('fs');
const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Calculator-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = 'mydb';

const uri = `mongodb://${Saly}:${Saly2020}@mongo:27017/${mydb}?authSource=admin`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));



//Arithmetic Function
const add= (n1,n2) => 
{
    return n1+n2;
}
const subtract = (n1, n2) =>
{
  return n1-n2;
}
const multiply = (n1,n2) =>
{
  return n1*n2;
}
const division = (n1,n2) =>
{
  if (n2 === 0)
  {
    throw new Error("Cannot divided by zero")
  }
  return n1/n2;
}

//Checking n1 and n2 is a valid number, log a new messsages if not or return n1 and n2
const ValidInput = (req) =>
{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  return [n1, n2];
}


app.get("/add", (req,res)=>{
    try{ const [n1, n2] = ValidInput(req);
    
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    console.log(`Addition Result: ${n1} + ${n2} = ${result}`);
    res.status(200).json({statuscocde:200, data: result }); 
    } 
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});


app.get("/sub", (req, res) =>
  {
    try{
    const [n1, n2] = ValidInput(req);
    logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
    const result = subtract(n1,n2);
    console.log(`Subtraction Result: ${n1} - ${n2} = ${result}`);
    res.status(200).json({statuscocde:200, data: result }); 
    } 
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
  
  });


  app.get("/mul", (req, res) =>
  {
    try{
    const [n1, n2] = ValidInput(req);
    logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
    const result = multiply(n1,n2);
    console.log(`Multiplication Result: ${n1} * ${n2} = ${result}`);
    res.status(200).json({statuscocde:200, data: result }); 
    } 
    catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }

  });


  app.get("/div", (req, res) =>
    {
      try{
      const [n1, n2] = ValidInput(req);
      logger.info('Parameters '+n1+' and '+n2+' received for division');
      const result = division(n1,n2);
      console.log(`Division Result: ${n1} / ${n2} = ${result}`);
      res.status(200).json({statuscocde:200, data: result }); 
      } 
      catch(error) { 
          console.error(error)
          res.status(500).json({statuscocde:500, msg: error.toString() })
        }
    
      });
const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port " + port);
})
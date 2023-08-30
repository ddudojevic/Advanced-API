const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoDB } = require("./keys/keys");
const currentUser = require("./middlewares/curret-user");

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(cors());
app.use(currentUser);

//models
require("./models/user");
require("./models/business");
require("./models/expense");

//middlewares
const signUp = require("./routes/auth/signup");
const signIn = require("./routes/auth/signin");
const ceoSignUp = require("./routes/auth/ceo-signup");
const employeeSignUp = require("./routes/auth/employee-signup");
const createBusiness = require("./routes/business/create-business");
const createPart = require("./routes/business/create-part");
const showBusiness = require("./routes/business/show-business");
const showBusinesses = require("./routes/business/show-businesses");
const createExpense = require("./routes/expesnse/create-expense");
const showExpenses = require("./routes/expesnse/show-expenses");
const showBusinessExpenses = require("./routes/expesnse/businesses-expenses");
const showParts = require("./routes/business/show-parts");

app.use(signUp);
app.use(signIn);
app.use(ceoSignUp);
app.use(employeeSignUp);

app.use(createBusiness);
app.use(showBusiness);
app.use(showBusinesses);

app.use(createPart);
app.use(showParts);

app.use(createExpense);
app.use(showExpenses);
app.use(showBusinessExpenses);



const start = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log("Listening on port ") + port);
};

start();

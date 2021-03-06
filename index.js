import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT || "4000";
const db_url = 'mongodb://127.0.0.1:27017/shop';
// Connect to MongoDB with Mongoose.
mongoose.set('useFindAndModify', false);    //Prevent buggy error log
mongoose
    .connect(
        db_url,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("ERROR connecting with DB: \n", err));

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL({
        schema,
        graphiql: true
    }),
    function(){
        console.log(bodyParser.json())
    }
);
    
app.listen(PORT, () => {
    console.log('\n');
    console.log('##########################################################');
    console.log('#####               STARTING SERVER                  #####');
    console.log('##########################################################\n');
    console.log(`Server running on port ${PORT}`)
});
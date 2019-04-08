import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT || "4000";
const db_url = 'mongodb+srv://accesoDB:chachiwachi@test-ut0wm.gcp.mongodb.net/forum?retryWrites=true';

// Connect to MongoDB with Mongoose.
mongoose
    .connect(
        db_url,
        {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

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

var router = express.Router();
router.post('/', function(req, res, next) {
    return res.json();
})
app.use('/users', router);

    
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import createError from 'http-errors';
import express from 'express';
import path from 'path';
const cookieParser = require("cookie-parser");
import logger from "morgan"; 

const usersRoute = require("./routes/index");



// import indexRouter from "./routes/index";


const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade")


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));


//@desc GET all users info
app.use('/api/users', usersRoute)


//@desc GET a single user info
app.use('/api/users/:id', usersRoute)

//@desc POST user info
app.use('/api/users', usersRoute)


//@desc UPDATE user info
app.use('/api/users/:id', usersRoute)

//@desc DELETE user information
app.use('/api/users/:id', usersRoute)

// catch 404 and forward to error handler
// app.use(function (req:Request, res:Response, next) {
//     next(createError(404));
//   });
  
//   error handler
//   app.use(function( err: createError.HttpError, req:Request, res:Response, next:Function) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });


// app.use("*", (req, res) => {
//     res.status(404).json({
//      error: 'invalid route',
//      msg: "the page you're looking for doesnt exist"
//     })
// })
  
app.listen(3000, ()=> console.log(("listening on port 3000")));
  

export default app
import controller from '../controllers/productController';

import express, {Request, Response} from "express";
 
const router = express.Router();


// app.use(express.json());


// const router = express.Router();



router.get("/", controller.getUsers)


router.get('/:id', controller.getUser);



router.post('/', controller.createUser)



router.put('/:id', controller.updateUser)



router.delete('/:id', controller.deleteUser)


module.exports = router;









// router.get('/', controller.getUsers)

// router.get('/', function (req, res, next) {
//  res.status(200).json({
//   status: 'success!',
//   msg: "Cool stuff"
//   })
// });


// export default router
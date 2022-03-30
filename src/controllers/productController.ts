import User from "../model/productModel";
import { Request, Response } from 'express';
import {UserObj} from "../utils";

//@Desc: Get all users information

async function getUsers(req: Request, res: Response) {
  const users = await User.findAll();

  if (!users) {
    res.status(404).send({ message: "DataBase Not Found make a post" })
  } else {
    res.status(200).send(users)
  }
}

//@Desc Get a user information by Id
async function getUser(req: Request, res: Response) {
  // console.log(typeof +req.params.id)
  try {
    const user = await User.findById(+req.params.id);
    if (!user) {
      res.status(404).send({message: 'user information does not exist in the database'});
    } else {
      res.status(200).send(user)
    }
  } catch (error) {
    console.log(error);
  }
}

//@desc Create a user
//@route POST /api/users
async function createUser(req: Request, res: Response) {

  // console.log(req.body);
  
  
  const Joi = require('joi');
  const schema = Joi.object({
    organization:Joi.string().required(),
    products:Joi.array().items(),
    marketValue:Joi.string().required(),
    address:Joi.string().required(),
    ceo:Joi.string().required(),
    country:Joi.string().required(),
    noOfEmployees:Joi.number().required(),
    employees:Joi.array().items(Joi.string())


  })

 

 
  // console.log(validatedEntries);

  try {
    const validatedEntries = schema.validate(req.body);
    if(validatedEntries.error){
      res.status(400).send(validatedEntries.error.details[0].message);
    }else{
      const {
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees
      } = req.body;

      const user: UserObj = {
        organization,
        createdAt: new Date().toISOString(),
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees
      };
      const newUser = await User.create(user);
      res.status(201).send(newUser)
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(req: Request, res: Response) {
  try{
   const user = await User.findById(+req.params.id)
   if(!user){
      res.status(404).send({ message: "User not found" })
    }else{
      const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = req.body;
      const UserData: UserObj = {
        organization: organization || user.organization,
        createdAt: user.createdAt,
        updatedAt: new Date().toISOString(),
        products: products || user.products,
        marketValue: marketValue || user.marketValue,
        address: address || user.address,
        ceo: ceo || user.ceo,
        country: country || user.country,
        noOfEmployees: noOfEmployees || user.noOfEmployees,
        employees: employees || user.employees
      }
      const updUser = await User.update(+req.params.id, UserData)
      res.status(200).send ({updUser })

    }
  }catch(error) {
  console.log(error)
 }
}
//@desc Delete User
//@route DELETE /api/user/:id
async function deleteUser(req: Request, res:Response) {
  try {
    const user = await User.findById(+req.params.id)
    
    if (!user) {
      res.status(404).send({message: "User Not Found"} )
    } else {
      await User.remove(+req.params.id)
      res.status(200).send({ message: `User ${+req.params.id} removed`}) 
    }
   
  } catch (error) {
   console.log(error)
  }
}

export = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

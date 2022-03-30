import { writeDataToFile, UserObj } from "../utils";
import fs from 'fs';
// import {v4 as uuidv4} from 'uuid';
let users: UserObj[];

try {
  users = require("../../database/users.json");
} catch (err) {
  console.log("no database information at this moment");
}

function findAll(): Promise<UserObj[]> {
   if(fs.existsSync("./database/users.json")){
    return new Promise((resolve, reject) => {
        try {
          resolve(users);
        } catch (err) {
          reject(err);
        }
      });
   }else{
       return new Promise((resolve, reject) => {
           resolve([])
       })
   }
}

function findById(id: number): Promise<UserObj | any> {
    if(fs.existsSync("./database/users.json")){
        return new Promise((resolve, reject) => {
            const user = users.find((p) => p.id == id);
            resolve(user);
        });
    }else{
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }

}

function create(user: UserObj): Promise<UserObj|any> {
    if(fs.existsSync("./database/users.json")){
        return new Promise((resolve, reject) => {
            let output = fs.readFileSync("./database/users.json");
            let users = JSON.parse(output.toString())
            //  const newUser = {id:uniid(), ...user}
            const newUser = { id: uniid(), ...user };
            users.push(newUser);
            writeDataToFile("./database/users.json", users);
            resolve(newUser);
        });
    }else{
        return new Promise((resolve, reject) => {
            // if (!user) {
            //   users = [];
            // }
            // const newUser = {id:uniid(), ...user}
            const newUser = [{ id: uniid(), ...user }];
            writeDataToFile("./database/users.json", newUser);
            resolve(newUser);
        });
    }
  
}

function update(id: number, user: UserObj): Promise<UserObj | any> {
    if(fs.existsSync("./database/users.json")){
        return new Promise((resolve, reject) => {
            const index = users.findIndex((p: UserObj) => p.id == id);
            users[index] = { id, ...user };
            writeDataToFile("./database/users.json", users);
            resolve(users[index]);
        });
    }else{
        return new Promise((resolve, reject) => {
            resolve([])
        })
    }
  
}

function remove(id:number) {
    if(fs.existsSync("./database/users.json")){
        return new Promise((resolve, reject) => {
            users = users.filter((p)=> p.id != id)
            writeDataToFile('./database/users.json', users)
            resolve(null)
        })
    }
}
    

function uniid() {
  return Math.floor((Math.random() * 100) + 1);
}


export = {findAll, findById, create, update, remove};

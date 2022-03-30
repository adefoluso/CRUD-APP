// const Joi = require('joi');

// interface Validator{
//     organization:string,
//     products:string[],
//     marketValue:string,
//     address:string,
//     ceo:string,
//     country:string,
//     noOfEmployees:number,
//     employees:string[]
// }

// module.exports = {
    
//         Validator: (schema:any, name:any) => {
//           return (req, res, next) => {
//             const result = Joi.validate({ param: req.params[name] }, schema);
//             if (result.error) {
//               return res.status(400).send(result.error.details[0].message);
//             }
//             next();
//           };
//         },
//     schemas: Joi.object({
//         organization:Joi.string().required(),
//         products:Joi.array().items(),
//         marketValue:Joi.string().required(),
//         address:Joi.string().required(),
//         ceo:Joi.string().required(),
//         country:Joi.string().required(),
//         noOfEmployees:Joi.number().required(),
//         employees:Joi.array().items(Joi.string())
    
    
//     })
// }
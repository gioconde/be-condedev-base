import { createUserController } from "./useCases/createUser"
import {authMiddleware} from "./helpers/AuthMiddleware"
const routes = [   
    {
        method: "post",
        path: "/singin", 
        middleware: (req,res,next)=>authMiddleware(req,res,next),
        handle:(req,res)=>createUserController.handle(req,res)
    },
    {
        method: "post",
        path: "/users/create", 
        middleware: (req, res, next) => {
            console.log("middleware /users/create")
            next()
        },
        handle:(req,res)=>createUserController.handle(req,res)
    }
]
export { routes }

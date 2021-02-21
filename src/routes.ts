import { createUserController } from "./useCases/createUser"

const routes = [   
    {
        method: "post",
        path: "/users/create", middleware: (req, res, next) => {
            console.log("middleware /users/create")
            next()
        },
        handle:(req,res)=>createUserController.handle(req,res)
    }
]
export { routes }



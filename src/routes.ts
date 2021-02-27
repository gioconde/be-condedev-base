import { createUserController } from "./useCases/createUser"
import { readUserController } from "./useCases/readUser"
import { updateUserController } from "./useCases/updateUser"
import { deleteUserController } from "./useCases/deleteUser"
import { searchUserController } from "./useCases/searchUser"
import { signInController } from "./useCases/signIn"
import { refreshTokenController } from "./useCases/refreshToken"
import { authMiddleware } from "./helpers/"
const routes = [
    {
        method: "post",
        path: "/refresh-token",        
        handle: (req, res) => refreshTokenController.handle(req, res)
    }, 
     {
        method: "post",
        path: "/signin",        
        handle: (req, res) => signInController.handle(req, res)
    }, 
    {
        method: "post",
        path: "/users",
        handle: (req, res) => createUserController.handle(req, res)
    },
    {
        method: "put",
        path: "/users/:id",
        middleware: (req, res, next) => authMiddleware.handle(req, res, next),
        handle: (req, res) => updateUserController.handle(req, res)
    },
    {
        method: "get",
        path: "/users/:id",
        middleware: (req, res, next) => authMiddleware.handle(req, res, next),
        handle: (req, res) => readUserController.handle(req, res)
    },
    {
        method: "delete",
        path: "/users/:id",
        middleware: (req, res, next) => authMiddleware.handle(req, res, next),
        handle: (req, res) => deleteUserController.handle(req, res)
    },
    {
        method: "get",
        path: "/users",
        middleware: (req, res, next) => authMiddleware.handle(req, res, next),
        handle: (req, res) => searchUserController.handle(req, res)
    }
]
export { routes }

import { createUserController } from "./useCases/createUser"
import { readUserController } from "./useCases/readUser"
import { updateUserController } from "./useCases/updateUser"
import { deleteUserController } from "./useCases/deleteUser"
import { searchUserController } from "./useCases/searchUser"
import { authMiddleware } from "./helpers/AuthMiddleware"
const routes = [
    /* {
        method: "post",
        path: "/singin",
        middleware: (req, res, next) => authMiddleware(req, res, next),
        handle: (req, res) => createUserController.handle(req, res)
    }, */
    {
        method: "post",
        path: "/users/create",
        handle: (req, res) => createUserController.handle(req, res)
    },
    {
        method: "post",
        path: "/users/update",
        handle: (req, res) => updateUserController.handle(req, res)
    },
    {
        method: "get",
        path: "/users/read",
        handle: (req, res) => readUserController.handle(req, res)
    },
    {
        method: "delete",
        path: "/users/delete",
        handle: (req, res) => deleteUserController.handle(req, res)
    },
    {
        method: "get",
        path: "/users/search",
        handle: (req, res) => searchUserController.handle(req, res)
    }
]
export { routes }

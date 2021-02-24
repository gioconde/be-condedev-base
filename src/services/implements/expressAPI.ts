import { IAPI, IRoute } from './../IAPI';
import express from "express";
import { Router } from "express";
export class expressAPI implements IAPI {
    app = express()
    start(port: number) {
        this.app.use(express.json())
        this.app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    }
    routes(routes: IRoute[]) {
        const router = Router()
        const routeFactory = routes.map(route => {
            return router[route.method](route.path, route.middleware?route.middleware:route.handle, route.middleware?route.handle:()=>{})
        })
        this.app.use(routeFactory)
    }
}

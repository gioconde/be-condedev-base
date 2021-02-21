export interface IAPI{
    start(port:number):void;
    routes(routes:IRoute[]):void;
}
export type IRoute = {
    method:string;
    path:string;
    middleware?(req:any,res:any,next:handle):any;
    handle:handle;
}
type handle = (req:any,res:any) => any;
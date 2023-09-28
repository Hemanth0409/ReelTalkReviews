export interface UserDetail{
    message(message: any): unknown
    userId:number,
    userName:string,
    email:string,
    password:string,
    displayPic:string, 
    bio:string,
    isDeleted:boolean,
    createdDate:Date,
    modifiedDate:Date,
    roleId:number
    isLogged:boolean
}
import { StatusCodes } from "http-status-codes"
import { CustomAPIError } from "../errors/index.js"

export const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'Something went wrong try again later'

    }

    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    

    return res.status(customError.statusCode).json({msg:customError.msg})
}
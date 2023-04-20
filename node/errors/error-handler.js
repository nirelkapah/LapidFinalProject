const ErrorType = require("./error-type");
const ServerError = require("./server-error");


let errorHandler = (error, request, response, next) => {
    // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
    if(error.status === 401){

        error = new ServerError(ErrorType.UNAUTHORIZED_TOKEN);
        response.status(error.errorType.httpCode).json({ error: error.errorType.message });
        return;

    }
    

    if (error.errorType != undefined) {
        
        if (error.errorType.isShowStackTrace) {
            console.error(error);
        }
        
        response.status(error.errorType.httpCode).json({ error: error.errorType.message });
        return;
    }

    error = new ServerError(ErrorType.GENERAL_ERROR);
    response.status(error.errorType.httpCode).json({ error: error.errorType.message });
}

module.exports = errorHandler;
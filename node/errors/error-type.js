let ErrorType = {
    
    GENERAL_ERROR : 
    {id: 1,
    httpCode: 600, 
    message : "Error Occured , Please Refresh The Page", 
    isShowStackTrace: true},

    USER_NAME_ALREADY_EXIST : 
    {id: 2, 
    httpCode: 601, 
    message : "User Name Already Exist", 
    isShowStackTrace: false},

    UNAUTHORIZED : 
    {id: 3, 
    httpCode: 401, 
    message : "Login Failed, Invalid User Name Or Password", 
    isShowStackTrace: false},

    INVALID_FILE_TYPE_UPLOADED : 
    {id: 4, 
    httpCode: 415, 
    message : "Invalid File Type Uploaded", 
    isShowStackTrace: false},

    UNAUTHORIZED_TOKEN : 
    {id: 5, 
    httpCode: 401, 
    message : "Unauthorized Token", 
    isShowStackTrace: false},

    
    USER_ID_ALREADY_EXIST : 
    {id: 6, 
    httpCode: 601, 
    message : "User Id Already Exist", 
    isShowStackTrace: false},

    NO_PRODUCTS_DATA:
    { id: 7,
    httpCode: 500, 
    message: "Sorry , No Products Available , Please Return Later", 
    isShowStackTrace: false },

    NO_ORDERS_DATA:
    { id: 8, 
    httpCode: 500, 
    message: "Sorry , No Orders Found", 
    isShowStackTrace: false },

    NO_CARTS_DATA:
    { id: 9, 
    httpCode: 500, 
    message: "Sorry , No Cart Available", 
    isShowStackTrace: false },

    INVALID_INPUT_FIELD: {
    id: 10, 
    httpCode: 400, 
    message: "Some Of The Input Fields Are Not Valid , Please Fix", 
    isShowStackTrace: false },


}

module.exports = ErrorType;
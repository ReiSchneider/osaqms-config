function CreateResult(result, createTime, message){
    return {
        message: message,
        resultData: result,
        timestamp: Math.floor(createTime / 1000)
    };
}

function UpdateResult(updateTime, message){
    return {
        message: message,
        timestamp: Math.floor(updateTime / 1000)
    };
}

function DeleteResult(result, message) {
    return {
        message: message,
        resultData: result,
        timestamp: Math.floor(new Date() / 1000)
    };
}

function ReadResult(result, message) {
    return {
        message: message,
        totalCount: result.length,
        resultData: result,
        timestamp: Math.floor(new Date() / 1000)
    };
}

function AuthResult(token, message){
    return {
        message: message,
        token: token,
        timestamp: Math.floor(new Date() / 1000)
    };
}

module.exports = {
    CreateResult,
    UpdateResult,
    ReadResult,
    DeleteResult,
    AuthResult
}
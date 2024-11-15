export const sendSuccessResponse = (success, statusCode, message, data) =>{
    return new Response(JSON.stringify({success, statusCode, message, data}), { status: 200 });
}

export const sendErrorResponse = (success, statusCode, message, data) =>{
    return new Response(JSON.stringify({success, statusCode, message, data}), { status: 500 });
}
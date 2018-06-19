
class SendResponse{
    constructor(){

    }

    sendJSONNotF(result, response) {
        if (typeof result !== "string") {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(result, "", 2));
            response.end();
        } else {
            this.notFound(result,response);
        }
    }
    
    okNotFound(result, response) {
        if (typeof result !== "string") {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end();
        } else {
            this.notFound(result,response);
        }
    }
    
    notFound(result, response) {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write(`404 ${result}`);
        response.end();
    }

}

module.exports = SendResponse;
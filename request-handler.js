/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var messages = [];
// exports.handleRequest =
exports.handleRequest = function(request, response) {
  /* Request is an http.ServerRequest object containing various data
   * about the client request - such as what URL the browser is
   * requesting. */
  //console.log("Serving request type " + request.method + " for url " + request.url);

  /* These headers will allow Cross-Origin Resource Sharing.
   * This CRUCIAL code allows this server to talk to websites that
   * are on different domains. (Your chat client is running from a url
   * like file://your/chat/client/index.html, which is considered a
   * different domain.) */
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };
  request.setEncoding('utf8');

  /* "Status code" and "headers" are HTTP concepts that you can
   * research on the web as and when it becomes necessary. */
  var statusCode = 200;

  /* Without this line, this server wouldn't work.  See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

  // If the URL doesn't match the expected URL, reutrn a 404
    var desiredResponse = {
      results: messages
    };
  if(request.method === "OPTIONS"){
    response.writeHead(200, headers);
    response.end();
  }
  else if(request.method === 'GET'){
    if(request.url.indexOf('classes')!==-1){
      response.writeHead(200, headers);
      response.end(JSON.stringify(desiredResponse));
    }
    else{
      response.writeHead(404, headers);
      response.end();
    }
    console.log(request.url);

  }
  else if(request.method === 'POST'){
    console.log('posting');
    response.writeHead(201, headers); // Doesn't happen after 'end' event (async)
    var message = '';
    request.on('data', function(data){
      message += data;
    });
    request.on('end', function(){
      messages.push(JSON.parse(message));
      response.end('\n');
    });
  }

};



  /* Response is an http.ServerRespone object containing methods for
   * writing our response to the client. Documentation for both request
   * and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html*/
  // response.writeHead(statusCode, headers);
  /* .writeHead() tells our server what HTTP status code to send back
   * to the client, and what headers to include on the response. */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  // response.end('some text!');

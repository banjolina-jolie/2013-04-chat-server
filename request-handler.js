var messages = [];
exports.handleRequest = function(request, response) {

  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };
  request.setEncoding('utf8');

  var statusCode = 200;

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";

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

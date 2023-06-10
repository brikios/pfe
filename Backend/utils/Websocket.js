import http from 'http';
import { server as WebSocketServer } from 'websocket';

const server = http.createServer((request, response) => {
  // Handle HTTP requests if needed
});

const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  console.log('WebSocket connection established');

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      const { utf8Data } = message;
      const data = JSON.parse(utf8Data);

      if (data.type === 'newContract') {
        const { propertyId, senderName } = data;
      }
    }
  });

  connection.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.listen(9000, () => {
  console.log('WebSocket server is listening on port 8800');
});

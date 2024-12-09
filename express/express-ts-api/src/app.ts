import Server from './server';

const port: number = 8000;

const server: Server = Server.getInstance(port);
server.listen();
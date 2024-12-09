import Server from './server';
import Router from './router';

const port: number = 8000;

const init = (): void => {
  const server: Server = new Server(port, Router);
  server.listen();
}
init();
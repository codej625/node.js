import * as express from 'express';
import routers from './router';

class Server {
  private portNumber: number;
  private app: express.Application = express();
  private routers: express.Router[] = routers;
  private static instance: Server;

  constructor(port: number) {
    this.portNumber = port;
  }

  public static getInstance(port: number): Server {
    if (!Server.instance) {
      Server.instance = new Server(port);
    }
    return Server.instance;
  }

  private setRouter(): void {
    this.routers.forEach(router => {
      this.app.use(router);
    });
  }

  private setMiddleware(): void {
    // Apply the middleware globally
    this.app.use(express.json());

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Logs the request headers
      console.log('\nRequest logging -> ', req.headers);
      next();
    });

    this.setRouter();

    // 404 Page not found
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('HTTP 404');
      res.send('404 Page not found');
    });
  }

  public listen(): void {
    this.setMiddleware();

    // Port number
    this.app.listen(this.portNumber, () => {
      console.log(`App listening at http://localhost:${this.portNumber}`);
    });
  }
}

export default Server;
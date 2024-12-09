import * as express from 'express';

class Server {
  private app: express.Application;
  private port: number;
  private routers: express.Router[];

  constructor(portNumber: number, routers: express.Router[]) {
    this.app = express();
    this.port = portNumber;
    this.routers = routers;
  }

  private setMiddleware() {
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

  private setRouter() {
    this.routers.forEach(router => {
      this.app.use(router);
    });
  }

  public listen() {
    this.setMiddleware();

    // Port number
    this.app.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`);
    });
  }
}

export default Server;
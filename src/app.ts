import "reflect-metadata";
import "module-alias/register";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from "sequelize";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

// import all services

// Import all repositories interfaces

// Import all repositories

// Import all controllers

type CONNECTION_OPTIONS = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | undefined;

class App {
	private container: Container;
	private app: express.Application;

    private static readonly APP_PORT: number = 3000;  
    
    private static readonly DB_CONNECTION: CONNECTION_OPTIONS = process.env.DB_CONNECTION === "mysql" ? "mysql" : undefined;
    private static readonly DB_HOST: string = process.env.DB_HOST || "";
    private static readonly DB_PORT: string = process.env.DB_PORT || "";
    private static readonly DB_DATABASE: string = process.env.DB_DATABASE || "";
    private static readonly DB_USERNAME: string = process.env.DB_USERNAME || "";
    private static readonly DB_PASSWORD: string = process.env.DB_PASSWORD || "";

    constructor() {
		this.container = new Container();

		this.initServer();
		this.listenServer();
		this.setMysqlConfig();
	}
	
	private initServer(): void {
		// const server = new InversifyExpressServer(this.container);
		// server.setConfig((application: express.Application) => {
		// 	application.use(bodyParser.urlencoded({extended: true}));
		// 	application.use(bodyParser.json());
		// 	application.use(cors());
		// });

		this.app = express();
	}

	private listenServer(): void {
		this.app.listen(App.APP_PORT, () => console.log(`Server started on *:${App.APP_PORT}`));		
	}
      
    private async setMysqlConfig() {
        const sequelize = new Sequelize(App.DB_DATABASE, App.DB_USERNAME, App.DB_PASSWORD, {
            host: App.DB_HOST,
            dialect: App.DB_CONNECTION
        });

        try {
            await sequelize.authenticate();
            console.log(`Connection has been established successfully to database ${App.DB_DATABASE}`);
        } catch (error) {
            throw Error(error);
        }
  	}
}

export default new App();

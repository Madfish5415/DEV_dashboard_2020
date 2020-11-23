import {
    Database,
    ServiceSettingRepository,
    UserRepository,
} from "@dashboard/database";
import { Mailer } from "@dashboard/mailer";
import { Service } from "@dashboard/service";
import express, { Express } from "express";
import { Server } from "http";
import { v1Router } from "../routes/v1";
import { Configuration } from "../types";
import { useMiddlewares, useServices, useStrategies } from "../use";

export class Core {
    hostname: string;
    port: number;
    services: Service[];

    database: Database;
    repository: UserRepository;

    mailer: Mailer;
    express: Express;
    server?: Server;

    constructor(configuration: Configuration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.services = configuration.services || [];

        this.database = new Database(configuration.database);
        this.mailer = new Mailer(configuration.mailer);

        this.repository = new UserRepository();

        this.express = express();

        useMiddlewares(this.express, this.mailer, this.services);
        useServices(this.services);
        useStrategies(this.repository);
    }

    initialize(): void {
        for (const service of this.services) {
            const repository = new ServiceSettingRepository(service.id);

            service.initialize(repository);
        }
    }

    async start(): Promise<void> {
        await this.database.connect();

        return new Promise((resolve) => {
            this.server = this.express.listen(this.port, this.hostname, () => {
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        await this.database.disconnect();

        return new Promise((resolve, reject) => {
            this.server?.close((err) => {
                err ? reject(err) : resolve();
            });
        });
    }
}

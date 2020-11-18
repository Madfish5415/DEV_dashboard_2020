import { ServiceModel } from "@dashboard/service";

export class PostModel implements ServiceModel {
    id: number;
    userId: number;
    title: string;
    body: string;

    constructor(id: number, userId: number, title: string, body: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }
}

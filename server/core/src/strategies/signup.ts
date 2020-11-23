import { UserRepository } from "@dashboard/database";
import { UserAccount } from "@dashboard/types";
import { Strategy } from "passport-custom";
import { v4 } from "uuid";
import {
    badRequestStatus,
    internalServerErrorStatus,
    userExists,
} from "../constants";

export function signUpStrategy(repository: UserRepository) {
    return new Strategy(async (req, done) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;

            if (!username || !password || !email || !firstName || !lastName) {
                return done(badRequestStatus);
            }

            const exists = await repository.read(username);

            if (exists) {
                return done(userExists);
            }

            const user: UserAccount = {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                verification: v4(),
            };

            await repository.create(user);

            return done(null, user);
        } catch (e) {
            console.error(e);

            return done(internalServerErrorStatus);
        }
    });
}

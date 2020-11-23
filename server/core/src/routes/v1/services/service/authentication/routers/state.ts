import { ServiceOAuth, ServiceOAuth2 } from "@dashboard/service";
import { Response, ServiceResponse, User } from "@dashboard/types";
import { Router } from "express";
import passport from "passport";
import {
    internalServerErrorStatus,
    jwtStrategyName,
    serviceAuthenticationStateRoute,
} from "../../../../../../constants";

export const serviceAuthenticationStateRouter = Router();

serviceAuthenticationStateRouter.get(
    serviceAuthenticationStateRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user as User;

            let serviceResponse: ServiceResponse = {
                code: 200,
            };

            if (req.service instanceof ServiceOAuth) {
                serviceResponse = await req.service.oauthState({
                    user: user,
                });
            } else if (req.service instanceof ServiceOAuth2) {
                serviceResponse = await req.service.oauth2State({
                    user: user,
                });
            }

            const responseBody: Response = {
                data: serviceResponse.data,
            };

            res.status(serviceResponse.code).json(responseBody);
        } catch (e) {
            console.error(e);

            return next(internalServerErrorStatus);
        }
    }
);
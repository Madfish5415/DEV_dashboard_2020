import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    CssBaseline,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import { SignInSignUp } from "../../components/authentication/signin/buttons/signup";
import { SignInTwitter } from "../../components/authentication/signin/buttons/twitter";
import { SignInForm } from "../../components/authentication/signin/form";
import { useUser } from "../../hooks/user/user";

const useBaseStyle = makeStyles({
    "@global": {
        html: {
            height: "100%",
        },
        body: {
            height: "100%",
        },
        "#__next": {
            height: "100%",
        },
    },
});

const useStyle = makeStyles({
    main: {
        height: "100%",
    },
    backdrop: {
        color: "#ffffff",
        zIndex: 100,
    },
});

const SignInPage: React.FC = () => {
    const baseClasses = useBaseStyle();
    const classes = useStyle();

    const { error } = useUser("/", true);

    if (!error) {
        return (
            <Backdrop open={!error} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Container component={"main"} maxWidth={"xs"} className={classes.main}>
            <CssBaseline classes={baseClasses} />
            <Box
                display={"flex"}
                height={"100%"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <SignInForm />
                <SignInTwitter />
                <SignInSignUp />
            </Box>
        </Container>
    );
};

export default SignInPage;

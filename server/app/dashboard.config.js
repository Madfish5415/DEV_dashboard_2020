const FacebookService = require("@dashboard/service-facebook").default;
const GitHubService = require("@dashboard/service-github").default;
const TwitterService = require("@dashboard/service-twitter").default;

/**
 * @type {import("@dashboard/core").Configuration}
 */
module.exports = {
    port: "4242",
    mailer: {
        hostname: "smtp.gmail.com",
        port: 465,
        user: "noreply.dashboard.project@gmail.com",
        password: "7$ER*Q9gT@9u5B",
    },
    services: [FacebookService, GitHubService, TwitterService],
    database: {
        hostname: "db.madfish.fr",
        port: 27017,
        database: "db",
    },
};

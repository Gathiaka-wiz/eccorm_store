import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";

import { ARCJET_API_KEY } from "../config/env.config.js"; // Ensure you have your Arcjet key in config.js

const aj = arcjet({
    // Get your site key from https://app.arcjet.com and set it as an environment
    // variable rather than hard coding.
    key: ARCJET_API_KEY ,//localhost:3000_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                "CATEGORY:MONITOR", // Uptime monitoring services
                "CATEGORY:PREVIEW",
                "POSTMAN" //! Common API testing tool Remove before production
            ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
        mode: "LIVE",
        refillRate: 10, // Refill 5 tokens per interval
        interval: 10, // Refill every 10 seconds
        capacity: 20, // Bucket capacity of 10 tokens
    }),
],
});


const arcjetMiddleware =  async (req, res,next) => {
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            res.status(429).json({
                success: false,
                message: "Too Many Requests : You have exceeded the rate limit. Please try again later.",
            });
        } else if (decision.reason.isBot()) {
            res.status(403).json({
                success: false,
                message: "Forbidden : Bots are not allowed to access this resource.",
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Forbidden :   Access denied.",
            });
        }
    } else if (decision.results.some(isSpoofedBot)) {
        res.status(403).json({
            success: false,
            message: "Forbidden : Access denied due to spoofed bot detection.",
        });
    }
    next()
};

export default arcjetMiddleware ;
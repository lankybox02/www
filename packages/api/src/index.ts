import fastifyInit from "fastify";
import fastifyMongodb from "@fastify/mongodb";

const fastify = fastifyInit({
    logger: process.env.NODE_ENV === "development"
})

fastify.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017'
})

fastify.get("/", (req, reply) => {
    reply.send({ ok: true, uptime: process.uptime() })
});

fastify.listen(3000, (err, addr) => {
    if (typeof err !== "undefined") {
        throw new Error("Error starting server " + err)
    }
    console.log(`Server listening on ${addr}`)
})
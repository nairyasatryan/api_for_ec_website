import pkg from "pg";
const { Client } = pkg;
const client = new Client ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "nairi2005",
    database:"postgres"

})

export default client
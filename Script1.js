// server.js


const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;

        // Enable CORS for all routes
        this.app.use(cors());

        // MySQL connection configuration
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Lokum2011*',
            database: 'hw2',
        });

        // Initialize routes
        this.initRoutes();
    }

    async initRoutes() {
        // Example API endpoint to fetch data from MySQL
        this.app.get('/api/data', (req, res) => {


            const number = req.query.number;

            let run_query = null;

            if (number == 1) {
                run_query = 'select country.code, country.name, city.name, city.population from country, city where country.code = city.countrycode and country.lifeexpectancy > 75 and country.population < 1000000;';
            }
            else {
                run_query = 'select country.code, country.name, city.name, city.population from country, city where country.code = city.countrycode and country.lifeexpectancy > 80 and country.population < 1000000;';
            }



            this.connection.query(run_query, (err, results) => {
                if (err) {
                    console.error('Error executing MySQL query:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.json(results);
            });
        });
    }

    start() {
        // Start the server
        this.app.listen(this.port, () => {
            console.log("Server is running on port ${ this.port }");
        });
    }
}

// Create an instance of the Server class and start it
const server = new Server();
server.start();
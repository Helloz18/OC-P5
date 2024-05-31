# Yoga

This is a web application for yoga teachers to create sessions and for users to select sessions to participate.

## Start the project

Git clone:

> git clone https://github.com/Helloz18/OC-P5.git


❗
<strong>Place yourself on develop branch</strong>

> git checkout develop

You will find three folders

- back: it is a backend Java Spring Boot
- front: it is a frontend Angular
- ressources: contains sql scripts and postman collection

## Install the backend

In the back folder, you will find a README.md file, follow instructions

You will need a MySQL database, a script : scriptTest.sql is provided in ressources/sql folder

## Install the frontend

In the front folder, you will find a README.md file, follow instructions



## Ressources

### Postman collection

For Postman import the collection

> ressources/postman/yoga.postman_collection.json 

by following the documentation: 

https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman

This will allow you to check the responses of the endpoints.


### MySQL

If you want to <strong>use</strong> the application with a database containing only an admin and two teachers, use script.sql

SQL script for creating the schema is available `ressources/sql/script.sql`

By default the admin account is:
- login: yoga@studio.com
- password: test!1234

For <strong>testing purpose</strong>, use scriptTest.sql available `ressources/sql/scriptTest.sql` as it is describe in README.md in folder back.
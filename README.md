# HowMuchIsMyPension

HowMuchIsMyPension is a project where you can register your pension plan fees and get all the details in the quotation process like the pension you are getting today and number of months left to get the expected amount. This is only useful if you are in Colombia using the pension system of colsubsidios.

<br>
## Requirements

NodeJs
Previous installation of Nodejs is required. If you don't have it, go to <a>https://nodejs.org/es/download/</a>.

MongoDb
Expects a Mongo Server to be running on Mongo Atlas DataBase, and it uses a database called "PensionDB" with the collections "ipcs", "usuarios", "cotizaciones".
If running locally, install MongoDB. To install it just go to: <a href="https://www.mongodb.com/download-center/community">MongoDB Community Server</a>

Once installed, on the project's root run npm install mongodb --save to install the MongoDB driver as well as its dependencies.
<br>

## Installation

1. Get in the folder of the project
2. Install dependencies with the package manager [yarn](https://yarnpkg.com/)
3. Deploy the project

```bash
cd HowMuchIsMyPension
yarn install
yarn start
```
Server runs on http://localhost:8080

<br>

## Usage
<h2> Link </h2>
<a> https://how-much-is-my-pension.herokuapp.com/</a>
<br>
## Authors
[Allan Roy Corinaldi Castaño](https://github.com/ar-corinaldi)

[Daniella Arteaga Mendoza](https://github.com/dartm05)

<br>

## License
[MIT](https://choosealicense.com/licenses/mit/)

# Crypto Portfolio Tracker 
This project allow you to create portfolio of cryptocurriencies. Backend: https://github.com/soowson/crypto-portfolio-back.git

## General Information
The main goal of this project is to allow you to create your own portfolio of cryptocurrencies. Once we create an account and log in, this application allows us to see the current prices of cryptocurrencies, the current score of individual transactions and the score of the entire portfolio.

https://user-images.githubusercontent.com/108904000/231561509-a6d8362c-7a3d-4fdd-b8f2-1655718df293.mp4


## Technologies used
- TypeScript: version 4.9
- react: version 18.2
- formik: version 2.2

## Features
- registration with hashed user’s password
- authentication with passport-jwt
- an overview of the current prices of the top 100 cryptocurrencies
- adding executed transactions with the following information: name of cryptocurrency, price, amount, date of transaction, notes
- list of individual transactions with current profit 
- portfolio - a list of aggregated transactions of a particular cryptocurrency
- editing a transaction 
- deleting a transaction
- compatible with smartphones

## Future application development
- addition of history of completed transactions
- addition of portfolio status in the form of a chart
- addition of description and historical charts of cryptocurrencies

## What doesn't work
- UnauthorizedException is deliver as Internal Server Error (I have not encountered this problem in Nest v7)

## Setup
1) cd into project folder
2) npm install
3) this API has types connected with backend: https://github.com/soowson/crypto-portfolio-back.git - check in the tsconfig.paths.json file if the path to backend is correct 
3) start the app: right-click on the package.json file => show npm scripts => start

## Contact
email: jakubsowinski94@gmail.com

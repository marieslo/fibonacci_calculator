# Fibonacci Calculator

## Overview
The Fibonacci Calculator is a web-based tool designed to calculate the Fibonacci sequence for a given number.

## Features
- **Fibonacci Calculation**: Calculate the Fibonacci number for any input.
- **Error Handling**: Displays error messages if the input exceeds allowed limits or if the server is down.
- **Results Table**: Displays the last three Fibonacci calculations, fetched from a remote server.
- **Checkbox Toggle**: Allows the user to switch between local and server-side calculations.
- **Sorting Options**: Sorts the displayed results by number or date.

## Technologies Used
- **HTML**: Structure of the page.
- **CSS**: Styling for a clean and responsive layout.
- **JavaScript**: Logic for Fibonacci calculations, AJAX calls, and dynamic DOM manipulation.
- **Bootstrap**: For responsive design and components.
- **jQuery**: For event handling and DOM manipulation.
- **Bootstrap Table**: For displaying and sorting results in a table format.

## The core logic of the application

- **Checkbox Logic**: Switches between local and remote calculations based on user input.
- **Local Fibonacci Calculation**: Recursively calculates the Fibonacci number for inputs less than or equal to 50.
- **Remote Fibonacci Calculation**: Fetches the Fibonacci result from a remote server API and updates the UI accordingly.
- **Error Handling**: Displays appropriate error messages if the input is invalid or if the server is down.
- **Sorting**: Provides the ability to sort the results in ascending or descending order based on the number or date.

<img width="400" alt="fibonacci" src="https://github.com/user-attachments/assets/dfea64a7-c9c8-47d1-ad51-d8001cdec73a" />

## Project Setup

- Client side:
Clone or download *this* repository.
Open `index.html` in your browser to see the calculator in action.

- Server side ([MIT](https://choosealicense.com/licenses/mit/)):


```bash
> git clone https://github.com/israeltechchallenge/fibonacci-server
```

Then enter to the created folder

```bash
> cd fibonacci-server
```

Install the required dependencies with npm (make sure you have [Node.js](https://nodejs.org/) installed, npm comes with that)

```bash
> npm install
```

Then you can run the server

```bash
> node app.js
```

You should see something like this:

```bash
App listening on port 5050
Press Ctrl+C to quit.
```

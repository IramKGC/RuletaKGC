# Spinning Wheel Generator

## Overview
The Spinning Wheel Generator is a web application that allows users to dynamically add or remove sectors for a spinning wheel game. Users can input the number of sectors and their corresponding labels, which will be rendered on the spinning wheel.

## Features
- Dynamically add and remove sectors.
- User-friendly interface for inputting sector labels.
- Visual representation of the spinning wheel.

## Project Structure
- `src/index.html`: The main HTML file containing the structure of the application.
- `src/js/wheel.js`: Contains the `SpinWheel` class for rendering the wheel and handling spinning logic.
- `src/js/sectorManager.js`: Manages the addition and removal of sectors.
- `src/js/eventEmitter.js`: Handles event registration and emission.
- `src/css/styles.css`: Styles for the application.
- `src/types/index.ts`: TypeScript types and interfaces for type safety.

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd spinning-wheel-generator
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Open `src/index.html` in a web browser to run the application.

## Usage
- Enter the number of sectors you want to add.
- Input the labels for each sector.
- Click the button to generate the spinning wheel.

## License
This project is licensed under the MIT License.
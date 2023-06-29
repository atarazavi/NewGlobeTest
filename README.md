# Battery Issues Detector

This project is a tool for detecting and reporting on e-ink device battery health in different schools. The main goal of this application is to identify schools with the highest number of battery issues so that field teams can effectively plan their visits.

# Design and Assumptions

The application is designed using Angular, with a focus on scalability and optimization.
The data is fetched from a provided JSON file, treated as an API.
The battery consumption is calculated based on battery readings. We assumed a battery is in need of replacement if it uses more than 30% of its battery per day on average.
If the battery level increases between measurements, it is assumed that the device was charged, and this increase is excluded from the daily usage calculation.
If there is only one data point for a device, its battery consumption is marked as "unknown", and it's not included in the final output.
The final output is a list of schools, each with their own list of devices that have battery issues.

# Instructions to Run the Application

Clone the repository to your local machine.
Navigate to the cloned repository in your terminal.
Run npm install to install all the necessary dependencies.
Run ng serve to start the application.
Open http://localhost:4200 in your web browser to view the application.

# Instructions to Run the Tests

Navigate to the project directory in your terminal.
Run ng test to start the test suite.
A new tab will open in your default web browser showing the test results.

# Folder Structure

The application is organized into the following folders:

src/app/: Contains the main application features and shared components ,services, and models.
features/: Contains main features including its related Angular components/models/services/ngrx-store for displaying data.
features/schools/: Contains the SchoolsComponent for displaying the list of schools.
features/services/: Contains service for fetching data.
data.service.ts: Contains the DataService for fetching battery data.

shared/: Contain whatever that can be used by different features
shared/services/data-analyzer.service.ts: Contains app config model.
shared/models/: Contains TypeScript classes for School and Device objects.

src/assets/: Contains static assets, such as the provided JSON data file and Logo image.

Please note that you must have Node.js and Angular CLI installed on your machine to run this application and its tests.

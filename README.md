# Anthesi CWF Application Setup Instructions

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- Git
- Node.js (which includes npm)

## Step 1: Clone the Repository
First, you need to clone the repository to your local machine. Open your terminal or command prompt and run the following command:
```
git clone https://github.com/Parth-Manektech/Anthesi-CWF.git
```
This command creates a local copy of the repository.

## Step 2: Navigate to the Project Directory
Change your directory to the project folder:
```
cd Anthesi-CWF
```

## Step 3: Install Dependencies
Install the necessary packages using npm. Run the following command:
```
npm install
```
This command installs all the dependencies listed in the package.json file.

## Step 4: Run the Application
Once the dependencies are installed, you can run the application. Use the following command to start the application:
```
npm start
```
This command starts the development server and you should see output similar to:
```
Compiled successfully!
You can now view Anthesi-CWF in the browser.

Local:            http://localhost:8080
On Your Network:  http://192.168.0.101:8080
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Step 5: Run All Test Cases
To ensure that everything is working correctly, you should run all the test cases. Use the following command to run the test cases:

```
npm test
```
```
 PASS  src/App.test.js
 PASS  src/App.test.js
 PASS  src/Pages/Home/__test__/home.test.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        6.201 s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.

```


After running the test command, you'll be prompted with options. Type `a` to run all test cases.


```
 PASS  src/App.test.js
 PASS  src/Pages/Home/__test__/home.test.js
 PASS  src/App.test.js
 PASS  src/Components/Footer/__test__/Footer.test.js
 PASS  src/Components/Header/__tests__/Header.test.js
 PASS  src/Components/SelectAddress/__test__/SelectAddress.test.js

Test Suites: 5 passed, 5 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        3.669 s, estimated 5 s
Ran all test suites.

Watch Usage: Press w to show more.
```
This will execute all the tests in the project and give you feedback on the results.

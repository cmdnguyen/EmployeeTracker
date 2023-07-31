# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Description

This is an employee managing application where you can view, add and update an employee, roles or departments. This database is used to track employee and their job information. You can view or manage their roles, departments, salary and managers.

This app uses MySQL and Node inquirer to run the database. Using these two packages was difficult. I was trying multiple queries to add data and view tables in a way people can understand. I ran into syntax errors in the query while developing this app. After debugging and asking for help, I was able have a running application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To get started, users will have to use a terminal and clone the GitHub repository in their own directory.

	git clone git@github.com:cmdnguyen/EmployeeTracker.git

Once cloned, users will need [VSCode](https://code.visualstudio.com/download) and open up the directory. In the terminal, you can use the following commands:

	cd EmployeeTracker
	code .

Users will also need [NodeJS](https://nodejs.org/en) & [MySQL](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) installed. I used the LTS version for Node.

Users will need to initizalize npm and install the packages needed to run the program. Input the following commands in the terminal:

	npm init -y
	npm install

You should have a `package.json` file in the directory. When you go in the `package.json` file, you should see "inquirer" and "mysql2" in "dependencies." 
You should also see "start" in "scripts," which will be used to run the program.

Before starting the application, you will need to get the database into MySQL.

## Usage


## Credits

Boot Camp Tutor, Alexis Gonzales

Boot Camp TA, Ben Lin

AskBCS

[Stack Overflow](https://stackoverflow.com/questions/75420796/mysql-results-for-inquirer-prompt)

## License

MIT License

Copyright (c) 2023 Catherine Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

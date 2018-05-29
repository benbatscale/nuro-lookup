# Nuro Tasks Lookup

Nuro Tasks Lookup helps with looking up error reports for Nuro Tasks that have been returned.

## Getting Started

QA: Enter the TaskID into the input box and press enter!  

If the taskID is valid, it will render the report,  
Otherwise, it will render an error message.

Go to https://nuro-tasks.herokuapp.com to test the live/production version

## Diagrams

### Process
![Process](/diagrams/Process.png)
### Homepage
![Homepage](/diagrams/Homepage.png)

### Table Example
![Table Example](/diagrams/TableExample.png)

## To-do
[ ] Everytime an email comes in from Nuro [QA Report], automatically update database onto production site   
[ ] Send an email notifying QA team that there is a new report available  

### Prerequisites

Node version ^10.1.0  
NPM version ^5.6.0

Dependencies:  
  * Axios  
  * Express  
  * JsonExport  
  * Lodash  
  * Papaparse  
  * Pug  

## Authors

* **Ben Basuni** - *Initial work* 

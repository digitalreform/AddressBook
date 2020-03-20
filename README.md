# AddressBook
An Address Book App to show various skills

## Requirements: 
Implement a web application where a user can manage an address book

A user must be able to see a list of their contacts
A user must be able to search their contacts
A user must be able to create a new contact
A user must be able to update an existing contact
A user must be able to delete a contact
A contact consists of a first name and a last name
A contact can have unlimited contact numbers and email addresses

Use any database/datastore
Use any backend technology/framework that is appropriate
Use any UI technology/framework that is appropriate

Login/logout is not required

## Implementation

Backend: Django is used to create an API and Database.
Frontend: HTML/CSS/JS/Bootstrap Stack is used to create a simple client user interface.

Using an API enables a centralised DB that can be accessed from multiple cross platform Clients.

## Considerations

The code is used to showcase various skills, therefor in some cases different methods are used to perform similar tasks illustrating the methods specifically.

The web UI is simple and does not include validation to improve freedom.

Development and testing options (ie. allowing CORS) have been left enabled to make testing easier.

Security was not a specification therefor is not implemented.

## Usage

1. Run the backend server:

    `python mangage.py runserver`
  
This command runs the server on default 127.0.0.1:8000

2. Run the frontend client on a local webserver and open `index.html`.


Considering the above, any constructive comments are welcome.
This is a simple Node.js CRUD application that allows users to manage their contacts.

The application uses MongoDB as the database and Express as the web framework.

To run the application, clone the repository and install the dependencies using npm:

```
npm install
```

Then, start the server using the following command:

```
npm start
```

The application will be running on port 5001.

## Endpoints

The application exposes the following endpoints:

* `/api/contacts`: Get all contacts for the current user.
* `/api/contacts/:id`: Get a specific contact by id.
* `/api/contacts`: Create a new contact.
* `/api/contacts/:id`: Update a contact.
* `/api/contacts/:id`: Delete a contact.

## Authentication

The application requires authentication to access the protected endpoints. To authenticate, send a `POST` request to the `/api/users/login` endpoint with the following body:

```
{
  "email": "user@example.com",
  "password": "password"
}
```

The response will contain a JWT token that can be used to access the protected endpoints.

## Example

The following is an example of how to create a new contact:

```
curl -X POST -H "Authorization: Bearer <token>" -d '{"name": "John Doe", "email": "john.doe@example.com", "phone": "123-456-7890"}' http://localhost:5001/api/contacts
```

The response will be a JSON object containing the details of the newly created contact.
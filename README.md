# README

To run the tests, simply open `index.html` in a browser. Enjoy the greenery :)

### My assumptions about the project:

- I took the liberty of adding additional methods to the `todoList` object (to enable the `todoManager` object's methods' retrieval of the todos it needed) as there didn't seem to be a provision against doing so.

- If the month property is an empty string, then retrieve it if the year matches the search criteria (and vice versa).

- `"Initializes the collection with todo objects"` - I understood this to mean that a method should be executed that will populate the todo collection. In a real-world situation, the `todoList` would start off empty and the user would populate it. However, because we aren't implementing functionality for user input, maually executing the `seedList` method substitutes for what a user would manually input.

- `"Returns a specified todo object based on its id property"` - the code satisfied this requirement, but also broadens it to include retrieval of todos based on any other property, not just ID.

#### Comments

Because the collection is private data, all access to it is restricted to the `todoList` interface. This necessitated adding methods to the interface beyond what was strictly required, to enable the `todoManager` object to retrieve the necessary todos.

#### Potential Improvements:

Combine the retrieval methods in the `todoList` object into one, and have a flag to indicate whether to filter by property value or the return value of the `isWithinMonthYear` method.

## Which data structure to use between Arrays, Sets, Objects and Maps

Previously, JavaScript had two build in data structure Arrays and Objects.
ES6 introduced 2 more data structure: Sets and Maps

So, the question is which one to choose amongs them?

**Source of data**
Let's first understand where data comes from. Data can come from 3 sources:

- Data in programm itself
- From user input or DOM
- From APIs

**Answer**

- When we want to store a simple list then we should use: Arrays and Sets
- When we want to store data in Key/Value pair then we should use: Objects and Maps

**Arrays vs Sets**

Arrays:

- To store orderd list
- When you want to manipulate list items

Sets:

- Working with unique values and remove duplicate values from Arrays
- When performance is really imp.

**Objects vs Maps**

Objects: Traditional key/value pair structure. Easy to write and access with . and []

- When want to add function as value
- When working with JSON (can convert to map)

Maps: Better performance, Keys can have any data type

- When you need keys that are not string
- When you want to map values to keys

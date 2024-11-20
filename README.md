# Dog Finder, Color Factory, Calculator

This project demonstrates the use of React Router. It includes 3 apps: Dog Finder and Color Factory, which contain UIs, and Calculator, which is reachable through URL routes.

Dog Finder lists dogs with their names and pictures. Clicking on a dog goes to its details page, where info like age and facts are displayed.
Dog Finder also has a navigation bar that allows going between the list of dogs and each specific dog.

Color Factory allows users to store a color value and its name, and to view a full page of that color. Colors are stored in local storage.

The Calculator has no UI, and is used by the URL "/calculator/:operation/:n1/:n2", where operation is add, subtract, multiply, and divide. It can only process 2 numbers, n1 and n2.

A main landing webpage is used to allow selecting between Dog Finder and Color Factory. Layout routes are used to store the core dog and color data, and their functions for interacting with them. The data is passed to lists and pages through React Router's Outlet.

---

Tools used:

- JavaScript ECMAScript 2018
- CSS
- React 18
- React Router 6
- React Testing Library 16
- Axios 1.7
- Create React App

---

\* Uses Create React App

1. How to start:

   ```
   npm start
   ```

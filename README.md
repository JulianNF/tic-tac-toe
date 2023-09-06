# A deeper implementation of the official React tic-tac-toe tutorial

React offers a nice [Quickstart Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) that I built as a refresher activity for myself, as I've been building in Angular for the last 3 years, and hadn't built anything using React in 4 years.

I diverged from the tutorial by:

-   Using Vite
-   Using TypeScript
-   Breaking my components into separate folders
    -   Implementing `index.tsx` files for cleaner imports on each of these component folders
    -   Implementing a separate Interface module for reuse across all components
-   Using SCSS
    -   Messing around with creating a global `app-palette.scss` file to hold all color variables
-   Using slightly different logic for storing state for the undo/redo portion of the tutorial
-   Using SVG icons as React components

## Tooling

Built using React, TypeScript, SCSS, and Vite.

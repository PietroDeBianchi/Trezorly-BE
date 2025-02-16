#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Definition of a list of items to ignore in the tree view.
const IGNORED_ITEMS = ["node_modules", ".git", ".github", ".env.example", ".DS_Store", "CHANGELOG.md", "README.md"];

// Recursive function to build and print the directory tree structure of the specified directory.
function printDirectoryTree(dirPath, prefix = "") {
    // Reads the content of the `dirPath` directory and filters out ignored files/folders.
    const items = fs.readdirSync(dirPath).filter((name) => {
        // Filters elements that are in the ignored list.
        return !IGNORED_ITEMS.includes(name);
    });
    // Iterates over all filtered items in the directory.
    items.forEach((name, index) => {
        const fullPath = path.join(dirPath, name); // Full path of the current element.
        const stats = fs.statSync(fullPath); // Retrieves details of the element (file or directory).
        
        // Determines if the current element is the last one in the list.
        const isLast = index === items.length - 1;

        // Creates a prefix for the current element based on its position.
        const newPrefix = prefix + (isLast ? "└── " : "├── ");
        if (stats.isDirectory()) {
            // If the element is a directory, prints it in blue and recursively calls the function.
            console.log(chalk.blue(`${newPrefix}${name}/`));
            // Adds a new indentation to the prefix for the directory’s children.
            printDirectoryTree(fullPath, prefix + (isLast ? "    " : "│   "));
        } else {
            // If the element is a file, prints it in gray.
            console.log(chalk.gray(`${newPrefix}${name}`));
        }
    });
}

// Script entry point: prints the current directory path and starts the main function.
const currentDir = process.cwd(); // Retrieves the current working directory.
console.log(chalk.bold("📂 Project in: "), chalk.cyan(currentDir)); // Prints the current path.
printDirectoryTree(currentDir); // Starts printing the tree structure from the current directory.
console.log(" ");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); 
const Question = require('../models/Question');
const connectDB = require('../config/db');

// Explicitly point to server/.env relative to this file
dotenv.config({ path: path.join(__dirname, '../.env') }); 

const questions = [
    // --- HTML & CSS ---
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ],
        correctOption: 1, 
        category: "Frontend",
        difficulty: "Easy"
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correctOption: 2,
        category: "Frontend",
        difficulty: "Easy"
    },
    {
        question: "What is the purpose of the <alt> attribute in an <img> tag?",
        options: [
            "To make the image load faster",
            "To provide alternative text if the image fails to load",
            "To add a tooltip to the image",
            "To specify the image source"
        ],
        correctOption: 1,
        category: "Frontend",
        difficulty: "Easy"
    },
    {
        question: "In CSS Box Model, which layer is immediately surrounding the content?",
        options: ["Border", "Margin", "Padding", "Outline"],
        correctOption: 2,
        category: "Frontend",
        difficulty: "Medium"
    },

    // --- JavaScript ---
    {
        question: "Which operator is used to check both value and type in JavaScript?",
        options: ["==", "===", "=", "!="],
        correctOption: 1,
        category: "JavaScript",
        difficulty: "Easy"
    },
    {
        question: "What will `console.log(typeof [])` output?",
        options: ["array", "object", "list", "undefined"],
        correctOption: 1,
        category: "JavaScript",
        difficulty: "Medium"
    },
    {
        question: "Which method is used to remove the last element from an array?",
        options: ["shift()", "unshift()", "pop()", "push()"],
        correctOption: 2,
        category: "JavaScript",
        difficulty: "Easy"
    },
    {
        question: "What is the output of `2 + '2'` in JavaScript?",
        options: ["4", "22", "NaN", "Error"],
        correctOption: 1,
        category: "JavaScript",
        difficulty: "Medium"
    },
    {
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctOption: 2,
        category: "JavaScript",
        difficulty: "Easy"
    },
    {
        question: "What does 'Promise' represent in JavaScript?",
        options: [
            "A guarantee that the code will never fail",
            "A function that runs immediately",
            "The eventual completion or failure of an asynchronous operation",
            "A loop that runs forever"
        ],
        correctOption: 2,
        category: "JavaScript",
        difficulty: "Hard"
    },

    // --- React ---
    {
        question: "Which hook is used to handle side effects in React?",
        options: ["useState", "useReducer", "useEffect", "useContext"],
        correctOption: 2,
        category: "React",
        difficulty: "Medium"
    },
    {
        question: "What is JSX?",
        options: [
            "A database for React",
            "A syntax extension for JavaScript",
            "A CSS library",
            "A state management tool"
        ],
        correctOption: 1,
        category: "React",
        difficulty: "Easy"
    },
    {
        question: "How do you pass data from a parent to a child component?",
        options: ["State", "Props", "Context", "Redux"],
        correctOption: 1,
        category: "React",
        difficulty: "Easy"
    },
    {
        question: "What is the virtual DOM?",
        options: [
            "A direct copy of the real DOM",
            "A lightweight copy of the DOM kept in memory",
            "A browser extension",
            "A database for HTML"
        ],
        correctOption: 1,
        category: "React",
        difficulty: "Medium"
    },
    {
        question: "Which hook would you use to access the DOM directly?",
        options: ["useState", "useRef", "useEffect", "useMemo"],
        correctOption: 1,
        category: "React",
        difficulty: "Hard"
    },

    // --- Node.js & Express ---
    {
        question: "In Node.js, which module is used for file operations?",
        options: ["http", "path", "fs", "os"],
        correctOption: 2,
        category: "Node.js",
        difficulty: "Easy"
    },
    {
        question: "What is 'Middleware' in Express.js?",
        options: [
            "A database connector",
            "Functions that have access to the request and response objects",
            "A frontend framework",
            "A styling library"
        ],
        correctOption: 1,
        category: "Node.js",
        difficulty: "Medium"
    },
    {
        question: "Which command is used to initialize a new Node.js project?",
        options: ["npm start", "npm init", "node init", "npm install"],
        correctOption: 1,
        category: "Node.js",
        difficulty: "Easy"
    },
    {
        question: "How do you import a module in Node.js (CommonJS)?",
        options: ["import lib from 'lib'", "include 'lib'", "require('lib')", "fetch('lib')"],
        correctOption: 2,
        category: "Node.js",
        difficulty: "Medium"
    },

    // --- MongoDB ---
    {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correctOption: 2,
        category: "Database",
        difficulty: "Easy"
    },
    {
        question: "In MongoDB, what is a 'Collection' similar to in SQL?",
        options: ["Row", "Table", "Column", "Database"],
        correctOption: 1,
        category: "Database",
        difficulty: "Medium"
    },
    {
        question: "Which Mongoose method is used to find a single document by its ID?",
        options: ["find()", "findOne()", "findById()", "get()"],
        correctOption: 2,
        category: "Database",
        difficulty: "Easy"
    },
    {
        question: "What format does MongoDB use to store data?",
        options: ["XML", "JSON", "BSON", "CSV"],
        correctOption: 2,
        category: "Database",
        difficulty: "Medium"
    },
    {
        question: "What does the '_id' field represent in MongoDB?",
        options: [
            "A user-defined name",
            "A unique identifier automatically generated",
            "The date of creation",
            "The document size"
        ],
        correctOption: 1,
        category: "Database",
        difficulty: "Easy"
    }
];

const importData = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await connectDB();

        // Clear existing questions to avoid duplicates
        await Question.deleteMany();

        // Insert new expanded list
        await Question.insertMany(questions);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
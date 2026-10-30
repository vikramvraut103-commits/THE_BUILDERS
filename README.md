# THE BUILDERS — Website Project

A responsive fictional construction-company website for learning and portfolio use.

## Features
- Dark / light mode toggle; preference is saved in browser local storage.
- Responsive navigation menu for smaller screens.
- Home, About, Services, Projects, Process, and Contact sections.
- Demo contact form with client-side validation and confirmation.
- BuildBot chat widget with rule-based sample answers.
- CSS-only architectural illustrations; no image downloads or external libraries required.

## Run the website
1. Extract `THE_BUILDERS.zip`.
2. Open the extracted `THE_BUILDERS` folder in Visual Studio Code.
3. Open `index.html` in your browser, or use the VS Code Live Server extension and click **Go Live**.
4. Try the sun/moon button, mobile menu, contact form, and BuildBot chat.

You do not need Node.js or a database for this frontend demo.

## Important limitations
- BuildBot is **not connected to a real AI model**. It selects prepared responses using JavaScript keyword rules.
- The contact form does **not** send, store, or email data. It only displays a local confirmation.
- Projects and company details are fictional examples. Replace them with verified information before publishing.
- The example contact section uses no real contact address.

## Folder structure
```text
THE_BUILDERS/
├── index.html
├── README.md
├── EXPLANATION_HINGLISH.md
└── public/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## How to explain this project
See `EXPLANATION_HINGLISH.md` for a beginner-friendly walkthrough of the files, features, and JavaScript.

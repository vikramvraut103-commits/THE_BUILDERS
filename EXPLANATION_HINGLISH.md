# THE BUILDERS Website — Program Explanation (Easy Hinglish)

## 1. Project ka purpose
THE BUILDERS ek fictional construction company ki responsive website hai. Is student project mein visitor services dekh sakta hai, sample projects browse kar sakta hai, demo enquiry form bhar sakta hai aur BuildBot chatbot se basic questions pooch sakta hai.

**Important:** Ye frontend demo hai. Ismein real backend, database, live AI API ya email sending abhi nahi hai.

## 2. Kaunsi technology use hui hai?
- **HTML (`index.html`)**: Page ka structure—navbar, sections, cards, form aur chatbot.
- **CSS (`public/css/style.css`)**: Colours, layout, spacing, responsive design, dark/light themes aur chatbot ki styling.
- **JavaScript (`public/js/main.js`)**: Theme toggle, browser storage, mobile menu, form confirmation aur chatbot replies.

## 3. Folder structure
- `index.html`: Website ka main page.
- `public/css/style.css`: Saara visual design.
- `public/js/main.js`: Interactive behaviour.
- `README.md`: Project setup aur limitations.
- `EXPLANATION_HINGLISH.md`: Is program ki explanation.

## 4. HTML kaise kaam karta hai?
`<header>` mein logo, navigation aur theme button hai.
`<main>` mein Home, About, Services, Projects, Process aur Contact sections hain.
`<form id="contactForm">` customer se name, email, project type aur details leta hai.
`<section id="chatPanel">` chatbot ka panel hai.
Page ke end mein CSS aur JavaScript files link ki gayi hain.

## 5. Dark / Light Mode ka logic
JavaScript `themeToggle` button ko select karta hai. Click hone par `body` par `light-mode` class add ya remove hoti hai.

CSS mein colours variables ke through define hain:
- Dark mode: `--bg`, `--surface`, `--text`
- Light mode: `body.light-mode` ke andar in variables ki new values

Is approach ka benefit: poori website ke colours ek saath change hote hain; har element ka colour alag se set nahi karna padta.

`localStorage.setItem("builders-theme", theme)` selected mode browser mein save karta hai. Page dobara khulne par `localStorage.getItem(...)` preference read karta hai. Agar browser storage unavailable ho, website default theme ke saath kaam karti rahegi.

## 6. BuildBot chatbot ka logic
Chat widget ke teen main parts hain:
1. `chatToggle`: Chat window open/close karta hai.
2. `chatForm`: User ka message receive karta hai.
3. `getBuildBotReply(message)`: Message ke keywords check karke response select karta hai.

Example: message mein `cost`, `budget` ya `estimate` ho to construction-cost factors ke baare mein prepared answer milta hai. Message mein `service` ho to services ka response milta hai.

Ye **rule-based chatbot** hai, real AI chatbot nahi. Real AI ke liye backend server aur AI API integration chahiye. Secret API key ko browser ke JavaScript code mein kabhi nahi rakhna chahiye.

## 7. Contact form kaise kaam karta hai?
Form ka submit event browser ka default page reload rokta hai (`event.preventDefault()`). JavaScript form se naam read karke confirmation message dikhata hai aur fields reset karta hai.

Abhi data server par nahi jaata aur database mein save nahi hota. Real enquiry system ke liye backend endpoint, validation, spam protection aur secure storage chahiye.

## 8. Responsive design
CSS media queries (`@media`) screen width ke hisaab se layout adjust karti hain:
- Desktop par cards three columns mein hote hain.
- Mobile par cards single column mein aate hain.
- Mobile navigation hamburger button se open hoti hai.
- Chat panel mobile screen ke andar fit hone ke liye width limit use karta hai.

## 9. Security aur quality
- Chat messages ko `textContent` se insert kiya gaya hai, `innerHTML` se nahi. Isse user input ko HTML ki tarah execute karne ka risk kam hota hai.
- Form inputs par length limits hain.
- Demo form actual customer information transmit nahi karta.
- Real production use ke liye backend validation, privacy notice, HTTPS, access controls aur data retention policy zaroori honge.

## 10. Website run kaise karein?
1. ZIP extract karo.
2. Folder VS Code mein open karo.
3. `index.html` browser mein open karo.
4. Ya VS Code Live Server extension install karke **Go Live** dabao.
5. Theme toggle, navigation, enquiry form aur chatbot test karo.

## 11. Viva / presentation ke liye short explanation
“THE BUILDERS is a responsive construction-company website developed using HTML, CSS and JavaScript. HTML defines the page structure, CSS provides the design and responsive layout, and JavaScript adds interactive features such as dark/light mode, a demo contact form and a rule-based chatbot. The selected theme is stored in local storage so it persists after refresh. The current chatbot uses keyword-based responses; a backend and AI API can be added in a future version.”

## 12. Future scope
- Connect a real AI model through a secure backend.
- Store enquiries in MySQL.
- Add admin dashboard and enquiry status tracking.
- Add verified project photos and real company contact information.
- Add form submission endpoint, email notifications, tests, and deployment.

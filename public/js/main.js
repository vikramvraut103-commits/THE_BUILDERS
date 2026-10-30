
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMenu();
    initContactForm();
    initChatbot();
    initScroll();
});

// 1. Dark / Light Theme
function initTheme() {
    const buttons = document.querySelectorAll(
        "#themeToggle, .theme-toggle, [data-theme-toggle]"
    );

    let theme = "dark";
    try {
        theme = localStorage.getItem("builders-theme") || "dark";
    } catch (_) {}

    const apply = (value) => {
        theme = value === "light" ? "light" : "dark";
        document.documentElement.dataset.theme = theme;
        document.body.dataset.theme = theme;
        buttons.forEach(b => b.setAttribute("aria-label", "Toggle theme"));
    };

    apply(theme);

    buttons.forEach(button => button.addEventListener("click", () => {
        apply(theme === "dark" ? "light" : "dark");
        try { localStorage.setItem("builders-theme", theme); } catch (_) {}
    }));
}

// 2. Mobile Menu
function initMenu() {
    const button = document.querySelector(
        "#menuToggle, .menu-toggle, .hamburger"
    );
    const menu = document.querySelector(
        "#navLinks, .nav-links, .navbar-menu"
    );

    if (!button || !menu) return;

    button.addEventListener("click", () => {
        const open = menu.classList.toggle("active");
        button.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        menu.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
    }));
}

// Contact Form → Flask → SQLite
function initContactForm() {
    const form = document.querySelector("#contactForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const field = (name) =>
            form.querySelector(`[name="${name}"]`)?.value.trim() || "";

        const data = {
            name: field("name"),
            phone: "",
            email: field("email"),
            message: [
                "Project type: " + field("projectType"),
                "Project details: " + field("details")
            ].join("\n")
        };

        const box = form.querySelector("#formMessage");
        const button = form.querySelector('[type="submit"]');
        const originalText = button.textContent;

        const show = (message, type) => {
            if (!box) return;
            box.textContent = message;
            box.classList.remove("success", "error");
            box.classList.add(type);
        };

        if (!data.name || !data.email || !field("projectType")) {
            show("Please complete all required fields.", "error");
            return;
        }

        button.disabled = true;
        button.textContent = "Sending...";

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok || result.success === false) {
                throw new Error(
                    result.message || "Unable to save enquiry."
                );
            }

            show(result.message || "Enquiry saved successfully!", "success");
            form.reset();

        } catch (error) {
            console.error("Enquiry error:", error);
            show(error.message || "Please try again.", "error");

        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
}

// 4. Simple Website Chatbot
function initChatbot() {
    const toggle = document.querySelector(
        "#chatbotToggle, #chatToggle, .chatbot-toggle"
    );
    const chat = document.querySelector(
"#chatPanel, #chatbotWindow, #chatWindow, .chatbot-window"
);

    if (!toggle || !chat) return;

    toggle.addEventListener("click", () => {
    const open = chat.hidden;

    chat.hidden = !open;
    chat.classList.toggle("active", open);

    toggle.setAttribute("aria-expanded", String(open));
});
const closeButton = chat.querySelector("#chatClose");

if (closeButton) {
closeButton.addEventListener("click", () => {
chat.hidden = true;
chat.classList.remove("active");
toggle.setAttribute("aria-expanded", "false");
});
}

    const form = chat.querySelector("form");
    const input = chat.querySelector(
        "#chatInput, #userMessage, [name='message'], input, textarea"
    );
    const messages = chat.querySelector(
        "#chatMessages, .chat-messages"
    );

    if (!form || !input || !messages) return;
    chat.querySelectorAll(".quick-btn[data-question]").forEach(button => {
button.addEventListener("click", () => {
input.value = button.dataset.question;
form.requestSubmit();
});
});

    form.addEventListener("submit", event => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const add = (message, sender) => {
            const item = document.createElement("div");
            item.className = `chat-message ${sender}`;
            item.textContent = message;
            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight;
        };

        add(text, "user");
        input.value = "";

        const q = text.toLowerCase();
        let reply = "Please share your project requirements through our contact form.";

        if (/hello|^hi\b|hey|namaste/.test(q))
            reply = "Hello! Welcome to THE_BUILDERS. How can we help?";
        else if (/price|cost|budget/.test(q))
            reply = "Project cost depends on size, design, materials and location. Contact us for a discussion.";
        else if (/house|home|residential/.test(q))
            reply = "Tell us your plot size, preferred design and budget.";
        else if (/service|commercial|office/.test(q))
            reply = "Please share your construction requirements through our contact form.";
        else if (/contact|phone|email/.test(q))
            reply = "Please use the Contact Us section on our website.";
        else if (/thank/.test(q))
            reply = "You're welcome! Thank you for visiting THE_BUILDERS.";

        add(reply, "bot");
    });
}

// 5. Smooth Scrolling + Reveal Animations
function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.getElementById(
                link.getAttribute("href").slice(1)
            );
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    const items = document.querySelectorAll(
        ".animate-on-scroll, .reveal, [data-animate]"
    );

    if (!("IntersectionObserver" in window)) {
        items.forEach(item => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(item => observer.observe(item));
}

console.log("THE_BUILDERS JavaScript loaded.");
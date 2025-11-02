🧠 AI Component Generator (GenUI Studio)

Live Demo: https://ai-components-generator.onrender.com/

✨ “Describe any UI component you imagine — and let AI instantly generate it for you.”

The AI Component Generator is an AI-powered web application that converts your component ideas into ready-to-use code.
It uses Google Gemini API to generate components in HTML, CSS, Tailwind, Bootstrap, and JS — complete with a live code editor and preview.

🚀 Features

🧩 AI-powered component generation — describe your idea, and Gemini writes the code.

🎨 Framework selection — choose between HTML, CSS, Tailwind, Bootstrap, or JS.

🧠 Live preview — view the generated component instantly in an iframe.

💻 Monaco editor — view, edit, and copy code with syntax highlighting.

📥 Export & Copy — download the generated code or copy it to your clipboard.

🌗 Dark / Light mode — auto adapts to your theme.

🔄 Refresh & Fullscreen preview — test your generated UI easily.

⚡ Built with Vite + React + Tailwind CSS for lightning-fast performance.

🧰 Tech Stack
Category	Tools / Libraries
Frontend	React, Vite
Styling	Tailwind CSS, React-Select, React-Icons
Editor & Preview	@monaco-editor/react
AI Integration	@google/genai (Gemini API)
Notifications & Loaders	React-Toastify, React-Spinners
Deployment	Render
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/MuskanNITA/AI-Components-Generator.git
cd AI-Components-Generator

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

Create a .env file in the project root and add your API key:

VITE_GEMINI_API_KEY=your_api_key_here

4️⃣ Run the development server
npm run dev


Then visit ➜ http://localhost:5173

5️⃣ Build for production
npm run build

🔒 Environment Variables
Variable	Description
VITE_GEMINI_API_KEY	Your Gemini API key from Google AI Studio

⚠️ Note: Storing API keys in the frontend is not secure.
For production, move the Gemini API call to a backend route or serverless function.

🧠 How It Works

The user enters a component description and selects a framework.

The app sends the request to the Gemini API using @google/genai.

Gemini returns formatted code within Markdown code blocks.

The app extracts the code and renders it inside:

🧾 Monaco Editor (editable view)

🖥️ Live Preview iframe

The user can then copy, download, or preview the generated code instantly.

🌐 Deployment

Deployed on Render as a static site.
Build Command: npm ci && npx vite build
Publish Directory: dist

🔗 Live App: https://ai-components-generator.onrender.com/

📸 Screenshots
Home Page	Code & Preview

💡 Future Enhancements

🔐 Secure backend API to hide Gemini key

💾 User authentication + saved components

🧩 Export as React/Vue components

📚 Component gallery

📊 Prompt history & analytics

👩‍💻 Author

Muskan Gupta
💼 Built with ❤️ using React, Vite, Tailwind, and Google Gemini API.<img width="1920" height="1080" alt="Screenshot (134)" src="https://github.com/user-attachments/assets/c101104e-9af4-4d03-90a8-eb3f143080bb" />
<img width="1920" height="1080" alt="Screenshot (135)" src="https://github.com/user-attachments/assets/c46bf4f2-57fc-45c1-bb63-542ec04603f8" />
<img width="1920" height="1080" alt="Screenshot (136)" src="https://github.com/user-attachments/assets/b57b1dd2-e263-481e-a78b-828027d8db9f" />
<img width="1920" height="1080" alt="Screenshot (137)" src="https://github.com/user-attachments/assets/ea9280df-99b0-4443-99ba-b4eec6aa44be" />

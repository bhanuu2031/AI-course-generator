📚 AI Course Generator
An AI-powered Course Generator built with React, Express, and Ollama (llama3).
It allows users to generate structured JSON syllabi with modules, topics, and resources based on their chosen subject, level, duration, and learning style.

✨ Features
🎯 Course Generator
Generate realistic JSON syllabi with:
Overview of the course
Modules with titles + subtopics
Resources (books, videos, links)

Input customization:
Topic (e.g., Machine Learning, Web Development)
Level (Beginner / Intermediate / Advanced)
Duration (weeks)
Preferred Style (interactive, theory-heavy, project-based)
Target Audience

🎨 UI/UX
React 18 + Vite for modern frontend.
TailwindCSS for responsive design.
Dark mode toggle with smooth transitions.
Lucide-react icons.
Step-based flow:
Enter course details.
See loading animation.
View structured syllabus.

⚙️ Backend
Node.js + Express API.
Ollama (llama3) as local LLM backend.
Custom JSON prompt engineering to enforce valid structured output.

Endpoints:
POST /api/generate-course → returns JSON syllabus.
🛠 Tech Stack

Frontend
React 18 (Vite, JSX)
TailwindCSS
Lucide-react (icons)

Backend
Node.js + Express
Ollama (llama3 model running locally)

🚀 Getting Started
1️⃣ Prerequisites
Node.js
 (v18+)

Ollama
 installed locally
A pulled LLM model (recommended: llama3):
ollama pull llama3

2️⃣ Clone & Install
git clone https://github.com/your-username/ai-course-generator.git
cd ai-course-generator-app

Install frontend deps:
npm install

Install backend deps:
cd server
npm install

3️⃣ Configure
Create a .env file in server/:
PORT=5000
OLLAMA_MODEL=llama3
OLLAMA_HOST=http://127.0.0.1:11434

4️⃣ Run
Start Ollama (in background):
ollama serve

Start backend:
cd server
node index.js

Start frontend:
cd ..
npm run dev
Open: http://localhost:5173

📌 Roadmap
 Export syllabus (PDF/Markdown).
 Save user courses locally.

 Add quiz/test generation.

 Add spaced repetition flashcards.

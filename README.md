<h1 align="center">NeoKarir</h1>

<p align="center">
  <img src="./frontend/src/assets/images/logo.png" alt="NeoKarir Logo" width="160" height="160" />
</p>

<p align="center">
  <strong>AI-Driven Personalized & Interactive Career Intelligence Platform</strong>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-repository-structure">Repository Structure</a> •
  <a href="#-project-background-credits">Project Background</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 🌟 About NeoKarir

**NeoKarir** is an innovative platform designed to bridge the gap between talent capabilities (job seekers, students, and professionals) and modern industry qualification standards. By leveraging Artificial Intelligence (AI), NeoKarir does not merely present job vacancies, but guides users through a comprehensive, personalized career journey. This journey spans personality profiling, ATS-based resume (CV) optimization, skill gap analysis, personalized learning roadmaps, and interview simulations through an interactive chatbot.

---

## ✨ Key Features of NeoKarir

The NeoKarir system is built on tight integration between a React Frontend, an Express.js API Gateway Backend, and two specialized AI microservices. Here are the core features provided:

### 1. 🔐 Authentication & Session Management
* **Secure Auth**: Integration of Registration, Login, and Password Recovery using JWT and **Supabase Auth**.
* **Data Security**: Password hashing powered by `bcryptjs` and global session management using React Auth Context on the frontend.

### 2. 📋 Onboarding & AI Auto-Profiling
* **Interactive Onboarding**: Guides new users through a quick profile setup.
* **Auto-Profiling via CV**: Users upload their CV/resume file, and the AI system automatically extracts text to populate education history, work experience, and skills without manual data entry.

### 3. 📄 AI CV Analyzer (ATS Resume Evaluation)
* **ATS Compatibility Score**: Maintanins a checklist to analyze uploaded resume files to evaluate their compatibility with Applicant Tracking Systems (ATS).
* **Deep Review & Feedback**: Instantly provides strengths, weaknesses, and structured improvement suggestions powered by an XLM-RoBERTa Named Entity Recognition (NER) model and the Groq LLM API.

### 4. 🎯 Personalized Career Recommendations (AI Career Profiling)
* **Career Path Recommendations (Top-N)**: Analyzes user interests, educational background, and competencies to recommend the most relevant jobs.
* **Standardized Job Catalog**: Uses the `master_job_catalog.csv` dataset to accurately map job qualifications within Indonesia.

### 5. 📊 Skill Gap Analysis
* **Competency Mapping**: Compares the user's current skills against industry requirements for a targeted profession.
* **Radar Chart Visualization**: Displays comparisons visually through an interactive Radar Chart on the frontend, helping users identify missing skills.

### 6. 🛣️ AI Learning Roadmap
* **Adaptive Learning Path**: Formulates a structured, step-by-step learning roadmap to help users close their skill gaps tactically.
* **Competency Focus**: Guides users from basic to advanced concepts based on industry demands.

### 7. 🤝 Smart Job Matching
* **Job Match Score**: Computes compatibility percentages between user profiles and active job listings.
* **Siamese Neural Network**: Powered by a deep learning Keras model (*Siamese Network*) in the AI microservice for accurate semantic comparison, accompanied by match explanations.

### 8. 🤖 Interactive AI Career Assistant (RAG Chatbot)
* **24/7 Career Consultant**: An interactive chatbot built on Retrieval-Augmented Generation (RAG) to assist with interview simulations, portfolio advice, and career tips.
* **Semantic Search**: Utilizes a vector database (`pgvector` on Supabase PostgreSQL) to retrieve context from the `knowledge_base` document repository.

### 9. 📈 Job Market Trends & AI Forecasting
* **Indonesian Job Market Analysis**: Displays statistical data on IT job vacancies and category trends.
* **Time-Series Forecasting**: Uses a Deep Learning LSTM model (`it_trend_model.keras`) to forecast future IT job vacancy trends based on historical market data.

---

## 🛠️ Tech Stack

| Component | Main Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router v7, Recharts, Framer Motion, Axios | Modern UI, high performance, interactive animations, and data visualization |
| **Backend (API)** | Express.js, Prisma ORM, Supabase Auth, PostgreSQL, Multer, bcryptjs, nodemon | Core API gateway, database operations, session handling, and file uploads |
| **AI Microservice 1** | Python 3.10, FastAPI, XLM-RoBERTa (NER), Siamese Keras, Groq LLM API, pgvector | RAG Chatbot, CV Parsing, CV Analysis, and semantic Job Matcher |
| **AI Microservice 2** | Python 3.9+, FastAPI, Pandas, Scikit-learn, LSTM Keras (Deep Learning) | Career recommendation, skill gap analysis, and IT trend forecasting |
| **Database & Cloud** | Supabase PostgreSQL, Supabase Auth, Supabase Storage | Relational data storage, vector database, user registration, and CV/Avatar storage |

---

## 📁 Repository Structure

```text
capstone-project-neokarir/
├── frontend/               # User interface web application code (React)
│   ├── src/
│   │   ├── assets/         # Images, logo, styles
│   │   ├── components/     # Reusable global UI components
│   │   ├── config/         # Constant configuration & API services
│   │   ├── contexts/       # Global state management (Auth, etc.)
│   │   ├── features/       # Business logic and pages grouped by feature
│   │   └── pages/          # Main page components for routing
│   └── package.json
│
├── backend/                # API gateway server & relational database logic
│   ├── src/                # Express controllers, middlewares, routers
│   ├── prisma/             # PostgreSQL database schema (Prisma)
│   ├── supabase/           # SQL migration files
│   └── package.json
│
├── ai-model/
│   ├── services-1/         # AI Microservice 1 (FastAPI - RAG & CV Engine)
│   │   ├── app/            # Routers and services (NER & Siamese Job Matching)
│   │   └── requirements.txt
│   │
│   └── services-2/         # AI Microservice 2 (FastAPI - Recommendation & Trend Engine)
│       ├── app/            # Recommendations, skill gap, LSTM forecasting services
│       ├── data/           # Job catalog dataset, trend data, and roadmap templates
│       └── requirements.txt
│
└── README.md               # Main repository documentation (this file)
```

---

## 🧠 Project Background (Credits)

Choosing **NeoKarir** as our capstone project was motivated by key challenges in today's workforce landscape:

* **Addressing the Career & Skills Gap**: Many fresh graduates and job seekers in Indonesia face difficulties in mapping their career paths and understanding modern industry requirements. NeoKarir acts as a technology-based solution to narrow this gap.
* **Integrating Advanced Multi-Disciplinary Technologies**: This project brings together multiple complex engineering disciplines:
  * *Frontend Web*: React 19, Tailwind CSS v4, and dynamic UI animations (Framer Motion).
  * *Backend API Gateway & Database*: Express.js, Prisma ORM, and Supabase cloud integrations.
  * *Artificial Intelligence (AI)*: Named Entity Recognition (NER) for CV profiling, Retrieval-Augmented Generation (RAG) for chatbot consulting, Siamese Neural Networks for job matching, and LSTM networks for market trend forecasting.
* **Making a Real Social Impact**: We wanted to build a free, intuitive, and comprehensive tool that anyone can access to prepare themselves for the digital era of employment.

---

## 🤝 Contributing

We welcome contributions to improve NeoKarir! Please follow these steps to contribute:

1. **Fork** this repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request** to the main repository.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for the full license text.

---

<p align="center">
  Created by the NeoKarir Capstone Project Team 🚀
</p>

<div align="center">

# 🤖 AI Email Support System

### AI-Powered Customer Email Automation Platform

An intelligent customer support platform that automatically synchronizes emails, generates AI-powered replies using a knowledge base, manages employees, and sends professional email responses.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-5-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT-black?style=for-the-badge&logo=openai)
![Resend](https://img.shields.io/badge/Resend-Email_API-black?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

# 📌 Overview

AI Email Support System is a full-stack customer support platform that connects directly to a real mailbox using IMAP, synchronizes incoming emails, assists support agents with AI-generated replies, and sends professional responses through the Resend Email API.

Instead of manually writing every customer response, support agents can generate intelligent replies based on previously saved replies and uploaded PDF documentation.

The platform was designed for real-world customer support teams where multiple employees can manage a shared inbox from one centralized dashboard.

---

# ✨ Features

### 📥 Email Synchronization

- Real-time mailbox synchronization
- Automatic background email fetching
- IMAP integration
- Duplicate email prevention
- Fast email refresh
- Latest conversation preview
- Clean conversation display

---

### 🤖 AI Reply Generator

- OpenAI powered responses
- Context-aware reply generation
- Customer name detection
- Professional formatting
- Editable AI responses
- One-click generation

---

### 📚 Knowledge Base

- Upload PDF documents
- Automatic PDF text extraction
- AI learns from uploaded documents
- Context-aware responses
- Business-specific knowledge
- Centralized documentation

---

### 💾 Saved Replies

- Save frequently used responses
- Reuse previous replies
- AI learns from saved replies
- Faster support workflow

---

### 👥 Employee Management

- Admin dashboard
- Employee accounts
- Secure authentication
- Role-based permissions
- JWT authentication

---

### ✍ Professional Email Signatures

- Signature builder
- Company information
- Contact details
- Website links
- Working hours
- Logo support

---

### 📤 Email Delivery

- Resend Email API
- Professional HTML emails
- Signature attachment
- Reliable email delivery
- Production-ready infrastructure

---

### ⚡ Dashboard

- Support inbox
- Search emails
- Refresh inbox
- Copy replies
- Save replies
- Generate AI response
- Upload knowledge PDFs

---

# 🚀 Key Highlights

- AI-powered email assistant
- Shared support inbox
- PDF-powered knowledge base
- Saved reply learning
- Employee management
- Production deployment
- Modern responsive UI
- MongoDB Atlas integration
- Secure JWT authentication
- Professional email sending

---

# 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React, Vite, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI | OpenAI GPT |
| Email Fetch | IMAP |
| Email Sending | Resend Email API |
| Authentication | JWT |
| File Upload | Multer |
| PDF Processing | pdf-parse |
| Deployment | Render + cPanel |
| Version Control | Git & GitHub |

---

# 📂 Project Structure

```text
AI-support/

├── front-ai/
│
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── back-ai/
    │
    ├── server.js
    ├── package.json
    ├── .env
    │
    └── src/
        │
        ├── models/
        │
        ├── routes/
        │
        │── authRoutes.js
        │── emailRoutes.js
        │── aiRoutes.js
        │── knowledgeRoutes.js
        │── replyRoutes.js
        │── signatureRoutes.js
        │── uploadRoutes.js
        │
        ├── middleware/
        ├── services/
        │── imapService.js
        │
        └── uploads/
```

---

# 🌟 Core Modules

✅ Authentication

✅ Email Synchronization

✅ AI Reply Generator

✅ Knowledge Base

✅ Saved Replies

✅ Employee Management

✅ Signature Builder

✅ Email Delivery

✅ Dashboard

---
# 🚀 Getting Started

## Prerequisites

Before running the project locally, make sure you have the following installed:

- Node.js v18 or higher
- npm v9 or higher
- Git
- MongoDB Atlas Account
- OpenAI API Key
- Resend Account
- IMAP Email Account

---

# 📥 Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-email-support.git

cd ai-email-support
```

---

# ⚙ Backend Setup

Navigate to backend folder

```bash
cd back-ai
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Backend will run on

```
http://localhost:5000
```

---

# 🎨 Frontend Setup

Navigate to frontend

```bash
cd front-ai
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Only variable names are shown below.

```env
PORT=

MONGO_URI=

JWT_SECRET=

OPENAI_API_KEY=

RESEND_API_KEY=

IMAP_HOST=
IMAP_PORT=
IMAP_USER=
IMAP_PASS=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

> **Important:** Never commit your `.env` file or sensitive credentials to GitHub.

---

# 📦 Required Packages

## Backend

```
express
mongoose
jsonwebtoken
bcryptjs
multer
cors
dotenv
mailparser
imap-simple
openai
resend
pdf-parse
```

Install

```bash
npm install
```

---

## Frontend

```
react
react-router-dom
axios
bootstrap
react-hot-toast
```

Install

```bash
npm install
```

---

# 🗂 Database Collections

The application automatically creates and manages the following MongoDB collections.

```
Users

Emails

Replies

Signatures

Knowledge
```

---

# 🔄 Email Synchronization

The system continuously synchronizes emails from the configured mailbox.

Workflow

```
Mailbox

↓

IMAP Connection

↓

Fetch New Emails

↓

Store in MongoDB

↓

Dashboard Updates
```

Features

- Automatic synchronization
- Duplicate prevention
- Background processing
- Fast refresh
- Latest email detection

---

# 🤖 AI Workflow

When an agent clicks **Generate AI Reply**, the following workflow is executed.

```
Customer Email

↓

Extract Email Content

↓

Read Saved Replies

↓

Read Uploaded PDFs

↓

Build AI Context

↓

OpenAI

↓

Generate Smart Reply

↓

Editable Response
```

The AI does not simply generate generic responses.

It first learns from:

- Saved Replies
- Uploaded PDF Documents

This allows the responses to match the company's documentation and previous support experience.

---

# 📄 Knowledge Base

Support agents can upload PDF files that contain

- Product manuals
- Installation guides
- User documentation
- Company policies
- Troubleshooting guides

Uploaded PDFs become part of the AI knowledge base.

Whenever an email arrives, AI searches these documents before generating a response.

---

# 💾 Saved Replies

Frequently used replies can be saved for future use.

Benefits

- Faster responses
- Consistent customer support
- AI learns from previous replies
- Better response quality

---

# 👥 User Roles

## Admin

- Login
- Create employees
- Delete employees
- Upload PDFs
- Manage signatures
- Manage users

---

## Employee

- Login
- View inbox
- Open conversations
- Generate AI replies
- Edit replies
- Send emails
- Save replies

---

# ✍ Signature System

Every outgoing email may include

- Name
- Position
- Company
- Website
- Working hours
- Company logo

Signatures are automatically appended to outgoing emails.

---

# 📤 Email Delivery

Outgoing emails are delivered using

**Resend Email API**

Benefits

- Reliable delivery
- No SMTP timeout issues
- Production ready
- HTML email support
- Better deliverability

---

# 🔐 Authentication

Authentication is handled using JSON Web Tokens (JWT).

Features

- Secure Login
- Token Authentication
- Protected Routes
- Admin Authorization
- Employee Authorization

---

# 📊 Dashboard Features

The support dashboard includes

- Email Inbox
- Search Emails
- Refresh Inbox
- AI Reply
- Copy Reply
- Save Reply
- Upload PDF
- Saved Replies
- Logout

---

# ⚡ Performance Optimizations

Implemented optimizations

- Background email synchronization
- MongoDB indexing
- Duplicate email prevention
- Optimized refresh
- Lightweight API responses
- Reduced IMAP requests
- Faster dashboard loading

---

# 🛡 Security

The project follows several security practices.

- JWT Authentication
- Protected API Routes
- Password Hashing
- Environment Variables
- API Key Protection
- MongoDB Atlas Authentication

Sensitive information such as passwords, API keys and tokens are **never stored inside the repository**.

---
# 🏛 System Architecture

```
Customer Email
        │
        ▼
IMAP Mailbox
        │
        ▼
Background Sync
        │
        ▼
MongoDB Database
        │
        ▼
Support Dashboard
        │
        ▼
Generate AI Reply
        │
        ▼
OpenAI + Knowledge Base
        │
        ▼
Professional Reply
        │
        ▼
Resend Email API
        │
        ▼
Customer
```

---

# 📡 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/login` | Login |
| GET | `/emails` | Get all emails |
| POST | `/ai/generate` | Generate AI reply |
| POST | `/replies` | Save reply |
| GET | `/replies` | Get saved replies |
| POST | `/knowledge/upload` | Upload PDF |
| GET | `/knowledge` | Get PDFs |
| POST | `/signature` | Save signature |
| GET | `/signature` | Get signature |

---

# 🚀 Deployment

### Frontend
- React + Vite
- Hosted on cPanel

### Backend
- Node.js + Express
- Hosted on Render

### Database
- MongoDB Atlas

### Email Service
- Resend API

---

# 📂 Main Modules

- Authentication
- Email Sync
- AI Reply Generator
- Knowledge Base
- Saved Replies
- Signature Manager
- Employee Management

---

# 🔄 AI Processing

1. Read customer email
2. Read uploaded PDFs
3. Read saved replies
4. Generate AI response
5. Allow manual editing
6. Send email

---

# 📈 Future Improvements

- Email labels
- Conversation history
- AI confidence score
- Multiple mailboxes
- Analytics dashboard
- Attachment support
- Multi-language AI replies

---

# 🤝 Contributing

This project is maintained as a private client solution.

Bug reports and feature suggestions are always welcome.

---

# 📄 License

This project is licensed under the **MIT License**.

# 📸 Screenshots

> Add your project screenshots here.

## Login Page

<img width="100%" src="screenshots/login.png" alt="Login Page">

---

## Dashboard

<img width="100%" src="screenshots/dashboard.png" alt="Dashboard">

---

## AI Reply Generator

<img width="100%" src="screenshots/ai-reply.png" alt="AI Reply">

---

## Knowledge Base

<img width="100%" src="screenshots/knowledge-base.png" alt="Knowledge Base">

---

## Signature Manager

<img width="100%" src="screenshots/signature.png" alt="Signature Manager">

---

# 🌍 Project Status

✅ Active Development

✅ Production Ready

✅ AI Reply Generation

✅ PDF Knowledge Base

✅ Employee Management

✅ Email Synchronization

✅ Resend Email Integration

---

# 💡 Why This Project?

This project was developed to simplify customer support by combining traditional email management with Artificial Intelligence.

Instead of manually replying to every customer email, support agents can generate intelligent responses using previous replies and company documentation, reducing response time while maintaining consistent and accurate communication.

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the following technologies that made this project possible:

- React
- Node.js
- Express.js
- MongoDB Atlas
- OpenAI
- Resend
- IMAP
- Bootstrap

---

<div align="center">

## ⭐ If you found this project interesting, don't forget to leave a star!

Made with ❤️ using React, Node.js, MongoDB & OpenAI

</div>

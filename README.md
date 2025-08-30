# ✨ ClearifyPro - AI Background Remover (SAAS)  

**ClearifyPro** is a **Full-Stack SaaS-based AI background removal platform** that allows users to upload images, remove backgrounds seamlessly using **ClipDrop API**, and download results instantly.  

The app provides a **credit-based system** with **subscription plans** for continuous usage. The UI is **mobile-friendly**, ensuring smooth usage across devices.  

---

## 🚀 Features  

### 👤 User Features  
- 🔐 **Authentication with Clerk** (secure login & signup)  
- 🎁 **Free 5 Credits** on signup  
- 🖼️ **AI-powered Background Removal via ClipDrop API** (1 credit per image)  
- 📥 **Download processed images** instantly  
- 💳 **Subscription Plans** (via Razorpay Payment Integration):  
  - 🟢 **Basic Plan**  
  - 🟡 **Premium Plan**  
  - 🔴 **Ultimate Plan**  

### ⚙️ Admin / System Features  
- 📊 Manage subscriptions and credits  
- 🔒 Secure authentication and session handling  
- 🗄️ Store user & subscription data in **MySQL Database**  

---

## 🔒 Authentication & Security  
- **Clerk Authentication** for signup/login  
- **Spring Security + JWT** for secure API access  
- **Role-based access control**  
- **Ngrok** used for **Clerk webhook configuration** and dummy deployment  

---

## 💳 Payment Integration  
- Integrated with **Razorpay API**  
- Supports **UPI, Card, and NetBanking** payments  
- Automated plan activation after payment  

---

## 🛠️ Tech Stack  

### Frontend  
- **React.js**  
- **Tailwind CSS** (responsive, mobile-friendly UI)  

### Backend  
- **Spring Boot**  
- **Spring Security with JWT**  
- **MySQL Database**  

### Integrations  
- **ClipDrop API** → AI-based background removal  
- **Clerk Authentication** → Secure login/signup  
- **Razorpay Payment Gateway** → Subscription payments  
- **Ngrok** → Clerk webhook testing & dummy deployment  

---

## 📂 Project Structure  
BG-Remover-SAAS/
│── backend/ # Spring Boot APIs, DB, Auth, Payment
│── frontend/ # React.js UI, Tailwind CSS, Clerk Auth
│── README.md # Project Documentation

---

## ⚙️ Installation & Setup  

### Backend (Spring Boot)  
```bash
# Navigate to backend
cd backend

# Update DB credentials in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/clearifypro
spring.datasource.username=root
spring.datasource.password=yourpassword

# Run the backend
mvn spring-boot:run
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```
---
Ngrok (for Clerk Webhooks / Dummy Deployment)
# Run ngrok on backend port (e.g., 8080)
ngrok http 8080
Copy the Ngrok URL and update it in Clerk dashboard for webhook configuration.
---
🔮 Future Enhancements

📱 Mobile app version (React Native / Flutter)

🌍 Multi-language support

📊 Advanced analytics dashboard for users

📦 Cloud storage integration (AWS S3 / GCP Storage)
👤 Author

Rashmi Ranjan Behera
📍 Odisha, India
💻 Full-Stack Developer

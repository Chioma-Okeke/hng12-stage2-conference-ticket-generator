# 🎟️ Techember Fest ’25 Ticket Generator  

This project is a **Conference Ticket Generator** built with **React, Vite, and Tailwind CSS** as part of the **HNG Internship 12 Stage 2 Task**. It allows users to generate event tickets with their details, ensuring accessibility and responsiveness.

---

## 🚀 Features  
✅ Generate personalized event tickets  
✅ Dynamic form with user details  
✅ Stores ticket data using IndexedDB  
✅ Responsive UI with Tailwind CSS  
✅ Keyboard accessibility  

---

## 🛠️ Tech Stack  
- **Frontend**: React + Vite  
- **State Management**: Redux  
- **Styling**: Tailwind CSS  
- **Database**: IndexedDB  
- **Accessibility**: Keyboard navigation & ARIA attributes  

---

## 📂 Folder Structure  
```
/src
  ├── components        # Reusable UI components
  ├── layout            # Page Layouts
  ├── pages             # Main application pages
  ├── store             # Redux store & slices
  ├── utils             # Helper functions
  ├── assets            # Images & static files
  ├── App.jsx           # Main App component
  ├── main.jsx          # Entry point
```

---

## ⚡ Setup & Installation  

1️⃣ Clone the repository:  
```sh
git clone [https://github.com/your-username/techember-ticket-generator.git](https://github.com/Chioma-Okeke/hng12-stage2-conference-ticket-generator.git)
```

2️⃣ Install dependencies:  
```sh
npm install
```

3️⃣ Start the development server:  
```sh
npm run dev
```

---

## 🎨 UI & Responsiveness  
The UI is designed to be fully **responsive** across different devices, including:  
📱 Small screens (≤ 360px)  
💻 Larger screens (≥ 1024px)  

Custom **media queries** ensure the ticket layout adjusts properly on different screen sizes.  

---

## 🗄️ IndexedDB - Managing Data  
This project uses **IndexedDB** for storing ticket details offline.  

### **Clear IndexedDB Function**
```js
export const clearTicketsDB = async () => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        await store.clear();
    } catch (error) {
        console.error("Error clearing IndexedDB:", error);
    }
};
```

---

## 🎯 Accessibility  
- The **Enter key** opens the dropdown:  
```tsx
<button
    onClick={toggleDropdown}
    onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
        }
    }}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-label="Select number of tickets"
>
    Select Tickets
</button>
```
- Screen reader-friendly with **ARIA attributes**  
- Focus states for keyboard navigation   

---

🎉 **Built with ❤️ during the HNG Internship 12** 🚀

# Student Management Dashboard

A clean, responsive, and interactive dashboard to manage student records in your browser. Built with **HTML**, **CSS**, and **vanilla JavaScript**.

---

## Features

- **Add, Edit, and Delete Students:**  
  Manage student records with an intuitive form and card-based list.

- **Search & Filter:**  
  Quickly search by name or subject and filter students by grade.

- **Sorting:**  
  Sort students by name, age, grade, or subject in ascending or descending order.

- **Bulk Actions:**  
  - **Clear All:** Remove all students with confirmation.
  - **Export Data:** Download your student list as a JSON file.

- **Responsive Design:**  
  Works seamlessly on desktops, tablets, and mobile devices.

- **Persistent Storage:**  
  All data is stored in your browser's `localStorage`—no backend required.

- **Notifications & Confirmation Modal:**  
  User actions are acknowledged with toast notifications and confirmation dialogs.

---

## Getting Started

1. **Clone or Download** this repository.
2. Make sure you have the following files:
   - `index.html`
   - `style.css`
   - `script.js`
3. **Open `index.html` in your browser.**
4. Start managing your students!

---

## Project Structure

| File         | Purpose                                           |
|--------------|---------------------------------------------------|
| `index.html` | Main HTML structure for the dashboard UI          |
| `style.css`  | Styling and responsive layout                     |
| `script.js`  | All dashboard logic (CRUD, search, sort, etc.)    |

---

## How It Works

- **Student Form:**  
  Add a new student or edit an existing one. The form includes fields for name, age, grade, and subject.

- **Student List:**  
  Displays all students as cards. Each card shows details and provides "Edit" and "Delete" buttons.

- **Controls Section:**  
  - **Search:** Filter students by name or subject.
  - **Grade Filter:** Show students by selected grade.
  - **Sort:** Sort by any field, toggle order.
  - **Bulk Actions:** Clear all students or export data.

- **Confirmation Modal:**  
  Appears for destructive actions (delete, clear all) to prevent accidental data loss.

- **Notifications:**  
  Success, error, and info messages appear as toasts in the bottom-right corner.

---

## Code Highlights

- **Object-Oriented JavaScript:**  
  Uses a `Student` class to encapsulate student data and updates.

- **Local Storage:**  
  Saves and loads students using `localStorage` for persistence.

- **Dynamic Rendering:**  
  Student list and controls update instantly as you interact.

- **Accessibility:**  
  Form validation ensures all fields are filled correctly.

---

## Exporting Data

- Click the **Export Data** button to download all student records as a `students.json` file.

---

## Screenshots

> *![image](https://github.com/user-attachments/assets/02f21637-252d-4fc8-8565-2a0cfe05e713)*

---

## Demo

> *[link to the deployed page](https://dynamic-parfait-4aecbe.netlify.app/)*



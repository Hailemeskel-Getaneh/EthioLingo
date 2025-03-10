# 03 / 05 / 2025

## I have Set Up State Management (Redux)  
I have set up the store and slices in the `store` folder. Here’s what it is and what it will do.

### Why Use Redux and What is a "Slice"?  
Redux is a **predictable state management library** that helps manage the **global state** of your app (e.g., user authentication status, lesson progress, payment details) in one central place. This makes it easier to access and update across components.  

Without Redux, you’d have to pass props through multiple layers of components (**prop drilling**), which gets messy in a complex app like **EthioLingo** with multiple screens and features.

### What is a Slice?  
A **"slice"** in Redux (specifically with Redux Toolkit) is a **modular piece** of the Redux state, along with its associated reducers and actions. Think of it as a **section** of your app’s state that handles a specific domain (e.g., authentication, lessons).  

Each slice:  
- Has its own **initial state** (e.g., `user: null` for authentication).  
- Defines **reducers** (functions that update the state based on actions, like logging in or out).  
- Automatically generates **action creators** (functions you call to trigger state changes).  

### Why Use Slices?  
✅ **Modularity**: Keeps your state **organized** by splitting it into logical pieces (e.g., `auth`, `lessons`) instead of one giant state object.  
✅ **Simplicity**: Redux Toolkit **reduces boilerplate** (no need to write action types or switch statements manually).  
✅ **Scalability**: Easy to **add new features** (e.g., a new slice for quizzes) without refactoring everything.  

For **EthioLingo**, you’ve planned slices for:  
- **auth** (user authentication)  
- **lessons** (language learning progress)  
- **payment** (subscriptions, transactions)  
- **settings** (user preferences)  

These will be stored in the `/store` folder.

---

## Install Dependencies  
Run this in your `/EthioLingoFront` directory to install **Redux Toolkit** and **React-Redux**:  

```bash
npm install @reduxjs/toolkit react-redux

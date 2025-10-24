![Screenshot](/public/screenshot.png)



> [!NOTE]  
> Web ini hanya untuk kepentingan proyek **UTS PBP 2025/2026 Ganjil** <br> <br>
> [![Watch the Presentation on YouTube](https://img.shields.io/badge/Presentasi-red?logo=youtube)](https://youtu.be/BO9WFylC108)
> [![Open Figma Workspace](https://img.shields.io/badge/Figma-blue?logo=figma)](https://www.figma.com/design/zw2wlQeQRifD2hPSPqotgg/Spotiem?node-id=104-1633&t=bkVoiMAMtyP9erzG-1)

# Spotiem

Spotiem is a modern, single-page e-commerce application for browsing and discovering audio products. This project is built with vanilla JavaScript, showcasing a clean and organized architecture without a heavy framework dependency. It's styled with Tailwind CSS and uses Vite.

## Features

* **Single-Page Application (SPA):** A custom client-side router provides a smooth and fast user experience without full-page reloads.
* **Dynamic Content Rendering:** The application dynamically renders pages and components using JavaScript templates.
* **Product Discovery:** Users can browse products, view details, and filter by category.
* **Responsive Design:** A mobile-first approach ensures the application looks great on all screen sizes, with a dedicated mobile menu for smaller devices.
* **Interactive UI Components:** Includes a custom image carousel for banners, toast notifications for user actions, and interactive product galleries.
* **GitHub Actions CI/CD:** The project is configured with a GitHub Actions workflow to automatically build and deploy to GitHub Pages.

## Technologies Used

* **Frontend:**
    * HTML5
    * CSS3 with **Tailwind CSS**
    * Vanilla **JavaScript** (ES6 Modules)
* **Build Tool:**
    * **Vite** (using `rolldown-vite` for speed)
* **Deployment:**
    * **GitHub Pages** with GitHub Actions

## Project Structure

```
.
├── .github/workflows/         # CI/CD configuration
├── public/                    # Static assets (images, logos)
├── src/                       # Source code
│   ├── carousel.js            # Image carousel component
│   ├── constants.js           # Global constants
│   ├── contact.js             # Contact page logic
│   ├── main.js                # Main application entry point
│   ├── mobileMenu.js          # Mobile navigation menu
│   ├── productData.js         # Mock product data
│   ├── productDetail.js       # Product detail page logic
│   ├── products.js            # Product listing and filtering
│   ├── router.js              # Client-side router
│   ├── style.css              # Main stylesheet
│   ├── templates.js           # HTML templates
│   └── toast.js               # Toast notification utility
├── .gitignore                 # Git ignore file
├── index.html                 # Main HTML file
├── package.json               # Project metadata and dependencies
├── README.md                  # Project documentation
└── vite.config.js             # Vite configuration
```

## Getting Started

### Prerequisites

* Node.js (v20 or higher)
* npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shuretokki/spotiem.git
    cd spotiem
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Project

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173/spotiem/`.

2.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the optimized production build.

3.  **Preview the production build:**
    ```bash
    npm run preview
    ```

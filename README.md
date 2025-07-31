# Salary Sage

Salary Sage is an AI-powered application that helps you estimate your salary based on your CV and job location. It provides a comprehensive analysis, including market trends, candidate strengths, and actionable recommendations to boost your earning potential.

## Features

- **AI Salary Estimation**: Get a data-driven salary range by providing your CV and location.
- **Detailed Analysis**: Understand the job market, your key strengths, and areas for improvement.
- **Actionable Recommendations**: Receive tips on skill development and salary negotiation.
- **Modern Interface**: A sleek, user-friendly design with light and dark modes.
- **Printable Reports**: Easily print or save your salary report for future reference.

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework for web applications.
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed programming language that builds on JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for rapid UI development.
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS.
- [Genkit (Firebase)](https://firebase.google.com/docs/genkit) – AI toolkit for building generative AI features.
- [Lucide React](https://lucide.dev/) – A simple and beautiful icon library.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/salary-sage.git
    cd salary-sage
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

1.  Navigate to the homepage.
2.  Upload your CV in `.pdf` or `.txt` format.
3.  Enter the job location.
4.  Click "Estimate Salary" to let the AI analyze your information.
5.  Review your detailed salary report.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

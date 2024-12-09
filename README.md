# Peerlist Frontend Developer Assignment

## Task
The task is to create a Next.js app for a form builder. The designs and workflow are available in this [Figma file](https://www.figma.com/design/8i2pcM7z0jQc0BIUsdEWR5/Assignment-%E2%80%93-Front-End-Dev).

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Requirements Checklist

- ✅ Implement the UI for an empty form creation step, allowing users to select input types and add questions.
- ✅ Implement the following 5 question types:
  - ✅ Short answer
  - ✅ Long answer
  - ✅ Single select
  - ✅ Number
  - ✅ URL
- ✅ Allow users to save the form and display a preview of the created form.
- ✅ Allow users to fill out the form and show form completeness (percentage of fields filled).
- ✅ Display a success message upon form submission.

### Good to Have (Bonus Points)
- ✅ Interactions or animations on UI actions.
- ✅ Functionality to reorder the form questions.
- ❌ Use API for saving the form data (if applicable).
- ❌ Display submitted forms in a table.

## Technologies Used
- **Frontend**: Next.js, TailwindCSS, Typescript
- **State Management**: (e.g., React State, Context API)
- **Form Handling**: React Hook Form 
- **CSS**: TailwindCSS for styling

## Setup and Installation

To get started with the app, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Jaishree2310/form_build.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   This will start the server at [http://localhost:3000](http://localhost:3000).

4. Production Build:
   To create a production build of the app, run:
   ```bash
   npm run build
   ```

## Features

- **Form Creation**: Allows users to create a custom form by selecting from various question types such as short answer, long answer, single select, number, and URL.
- **Form Preview**: Provides a preview of the created form.
- **Form Completion**: Displays the percentage of fields filled as the user completes the form.
- **Form Submission**: Shows a success message upon form submission.
- **Reordering**: Users can reorder the questions in the form.
- **UI Interactions and Animations**: Includes smooth transitions and animations on UI actions to improve the user experience.

# Service Logs Management App

## Requirements
- Node.js (recommended ver: 22.13.1)

To run the application locally, clone the repository, install the dependencies, and run the application.

Run the following commands:
1. git clone https://github.com/your-username/vektor_tms.git
2. cd vektor_tms
3. npm install
4. npm run dev

##   Project Description:

Service Logs Management Application built with React 19, TypeScript, Redux Toolkit and MUI.
The application allows users to create, manage and save service logs with full draft support and autosave function.

Event Calendar app consists of two parts for easy event management and navigation:

- **1. CalendarNavigation:** - easy event management and filtering provides the ability to perform actions such as:
   - Event creation: The user can easily create a new event by specifying a title, description, date and time of creation.
   - Filtering events: Navigation elements such as the back and forward buttons allow the user to cycle through the month, making it easy to search for events. A calendar is also provided, revealing a date picker to select a specific year and month.

- **2. Calendar** - represents the calendar grid of the month selected in the filter:
    Consists of days (cells).
    A cell includes:
    - The day number of the month 
    - List of events of this day.
By clicking on an event it is possible to edit or delete it.

## Core Functionality

- **1. Draft Workflow**:

  - Real-time autosave on every field mutation
  - Local persistence with state rehydration on boot
  - Draft state indicators (saving / saved)
  - Multi-draft management (create, delete, clear all)
  - Deterministic default date logic (start → end auto-sync)

- **2.Service Logs Data Grid**:

  - Advanced filtering (date range, service type)
  - Search across key fields
  - Editable records via dialog
  - Optimized column configuration via memoization
  - Snackbar-driven UX feedback

## Libraries and tools

The project uses the following main libraries and tools:

Core

- **React** - basic libraries for creating UI.
- **Typescript** - provides static typing for JavaScript. It's used to increase the reliability of development and the ability to detect run-time errors.
- **Reduxjs/toolkit** - global state management for drafts and service logs with predictable mutation patterns.

UI Layer

- **MUI 7**  -  enterprise-ready component system.
- **MUI DataGrid**  -  enterprise-ready component system.
- **MUI Date Pickers**  -  controlled date selection with synchronized form state.
- **Emotion styling system**  -  CSS-in-JS styling integrated with MUI theming.

Form & Validation

- **React Hook Form** - controlled form state management.
- **Yup schema validation** - schema-based validation layer.

Utilities

- **Dayjs** - date manipulation and default date synchronization logic.
- **Notistack** - global feedback and notification handling system.

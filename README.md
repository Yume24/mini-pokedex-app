# Mini Pokedex App

A modern, responsive web application built with React and TypeScript that allows users to browse and explore Pokemon data using the PokéAPI.

## Live Demo

**[View Live Application](https://mini-pokedex-app-six.vercel.app/)**

## Features

- **Browse Pokemon**: View a paginated list of Pokemon with images and names
- **Detailed Information**: Click any Pokemon to see detailed stats, types, and abilities
- **Search Functionality**: Search for specific Pokemon by name
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Loading States**: Loading indicators throughout the app
- **Error Handling**: Graceful error handling with user-friendly messages
- **URL State Management**: URLs with search and pagination state

## Tech Stack

- **React** - Modern React with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### 1. Clone the Repository

```
git clone https://github.com/your-username/mini-pokedex-app.git
cd mini-pokedex-app
```

### 2. Install Dependencies

```
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start Development Server

```
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```
# Using npm
npm run build

# Or using yarn
yarn build
```

## API Usage

This application uses the free [PokéAPI](https://pokeapi.co/) to fetch Pokemon data:

- **Pokemon List**: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
- **Pokemon Details**: `https://pokeapi.co/api/v2/pokemon/{name-or-id}`
- **Pokemon Images**: Uses the official Pokemon sprites from GitHub


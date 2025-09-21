# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Workday Countdown Timer** web application that provides real-time countdowns to:
- End of current workday
- Start of the weekend (Friday end time)
- Next US public holiday
- Real-time earnings calculation based on annual salary

## Architecture

**Single Page Application (SPA)** built with vanilla JavaScript:
- `index.html` - Main HTML structure with Tailwind CSS styling
- `assets/js/app.js` - Main application logic and UI handling
- `assets/js/utils.js` - Utility functions (time formatting, currency formatting)
- `assets/js/holidays.js` - Holiday data and next holiday calculation
- `assets/js/quotes.js` - Motivational quotes with daily rotation
- `manifest.json` - PWA manifest for mobile installation

## Key Features
- Real-time countdown timers (updates every second)
- Local storage for user settings (salary, work hours)
- Responsive design with Tailwind CSS
- Progressive Web App (PWA) capabilities
- Daily motivational quotes
- Earnings calculator based on hourly rate

## Development Commands

This is a static website - no build process required:
- **Run locally**: Open `index.html` in a web browser
- **No build commands**: All files are served as-is
- **No testing framework**: Manual testing in browser

## File Structure
```
workdaytimer/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── robots.txt          # Search engine instructions
├── assets/
│   └── js/
│       ├── app.js      # Main application logic
│       ├── utils.js    # Utility functions
│       ├── holidays.js # Holiday data and logic
│       └── quotes.js   # Motivational quotes
└── assets/images/      # App icons and images
```

## Core Functions
- `formatTimeDiff()` - Formats milliseconds into human-readable time
- `formatCurrency()` - Formats numbers as USD currency
- `getNextHoliday()` - Finds the next upcoming holiday
- `getDailyQuote()` - Returns a quote based on day of year
- Local storage for persistent user settings

## Browser Compatibility
- Modern browsers with ES6+ support
- Uses localStorage API for settings persistence
- Uses Intl.NumberFormat for currency formatting
- Responsive design works on desktop and mobile

## Deployment
Static files can be deployed to any web server or CDN. No server-side processing required.
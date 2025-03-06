// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          navy: "#1e3a8a",      // deep navy blue
          background: "#0f172a", // if you prefer a separate background color
        },
      },
    },
    plugins: [],
  };
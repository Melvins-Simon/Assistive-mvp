module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4CAF50",
          dark: "#2E7D32",
        },
        secondary: {
          light: "#2196F3",
          dark: "#1565C0",
        },
        accent: "#FFC107",
      },
      backgroundImage: {
        "kenya-gradient": "linear-gradient(135deg, #006644 0%, #1a237e 100%)",
      },
    },
  },
  plugins: [],
};

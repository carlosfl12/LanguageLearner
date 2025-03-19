/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            primary: {
              600: '#2563eb', // Azul más oscuro
              700: '#1d4ed8',
            },
            secondary: {
              100: '#f0f4ff', // Fondo claro
              800: '#1e293b', // Texto oscuro
            }
      },
    },
    plugins: [],
  }
}


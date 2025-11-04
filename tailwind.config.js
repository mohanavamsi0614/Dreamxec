    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
                    extend: {
                      colors: {
                        // India Innovation Platform - Vivid Oil Pastel Theme
                        'dreamxec': {
                          'saffron': '#FF7F00',      // Vivid Saffron - Energy & Leadership
                          'orange': '#FF9933',       // Alternate saffron
                          'white': '#FFFFFF',        // White - Clarity & Openness
                          'green': '#0B9C2C',        // Vivid Green - Growth & Progress
                          'green-alt': '#138808',    // Alternate green
                          'dark-green': '#0A7A23',   // Darker shade for hover
                          'navy': '#000080',         // Navy Blue - Accents & Text
                          'cream': '#FFF8F0',        // Cream background
                          'beige': '#FEF5E7',        // Light beige
                          'off-white': '#FAFAF8',    // Textured card background
                          'gray': {
                            50: '#F9FAFB',
                            100: '#F3F4F6',
                            200: '#E5E7EB',
                            300: '#D1D5DB',
                            400: '#9CA3AF',
                            500: '#6B7280',
                            600: '#4B5563',
                            700: '#374151',
                            800: '#1F2937',
                            900: '#111827',
                          }
                        },
                      },
                      fontFamily: {
                        'sans': ['Inter', 'Nunito', 'system-ui', 'sans-serif'],
                        'display': ['Poppins', 'Baloo 2', 'sans-serif'],
                      },
                      boxShadow: {
                        'pastel-saffron': '4px 4px 0px #FF7F00, 8px 8px 0px rgba(255, 127, 0, 0.3)',
                        'pastel-green': '4px 4px 0px #0B9C2C, 8px 8px 0px rgba(11, 156, 44, 0.3)',
                        'pastel-navy': '4px 4px 0px #000080, 8px 8px 0px rgba(0, 0, 128, 0.3)',
                        'pastel-card': '6px 6px 0px #FF7F00, 12px 12px 0px rgba(0, 0, 128, 0.2)',
                        'pastel-glow-saffron': '0 0 20px rgba(255, 127, 0, 0.4)',
                        'pastel-glow-green': '0 0 20px rgba(11, 156, 44, 0.4)',
                      },
                      borderWidth: {
                        '3': '3px',
                        '5': '5px',
                        '6': '6px',
                      },
                    },
                },
      plugins: [],
    }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontSize:{
        pClamp:"clamp(0.4rem, 3vw, 0.8rem)",
        h1Clamp:"clamp(1rem, 5vw, 4rem)",
        h3Clamp:"clapm(0.5rem, 6vw, 0.8rem)"
      }
      ,maxWidth:{
        '1/4':'25%',
        '1/2':'50%',
        '3/4':'75%',
        '1/3':'35%'
      },
      minWidth:{
        '1/4':'25%',
        '1/2':'50%',
        '3/4':'75%',
        '1/3':'35%'
      },
      width:{
        '9/10':'90%'
      },
      colors:{
        'navbarOrange':'#ffe8d6',
        'body-color':'#0000',
        'main-orange':'#F9A826',
        'darker-orange':'#C7861E',
        'main-complimentary':"#2677F9"
      },
      backgroundImage:{
        'signup-bg':'./src/assets/colorful-paint-canvas.webp'
      }
    },
    fontFamily:{
      sans:['Tillium-Web', 'sans-serif'],
      'body':['Tillium-Web', 'sans-serif']
    }
  },
  plugins: [],
}

    // "./src/node_modules/@material-tailwind/react/src/components/**/*.{js,ts,jsx,tsx}",
    // "./src/node_modules/@material-tailwind/react/src/theme/components/**/*.{js,ts,jsx,tsx}",
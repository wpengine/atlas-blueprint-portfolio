import appConfig from 'app.config';

const themes = {
  blue: {
    '--color-black': '#000',
    '--color-primary': '#000066',
    '--color-secondary': '#cccccc',
    '--color-tertiary': '#eeeeee',
    '--color-white': '#ffffff',
  },
  red: {
    '--color-black': '#000',
    '--color-primary': '#660000',
    '--color-secondary': '#CCCCCC',
    '--color-tertiary': '#EEEEEE',
    '--color-white': '#fff',
  },
  green: {
    '--color-black': '#000',
    '--color-primary': '#006600',
    '--color-secondary': '#CCCCCC',
    '--color-tertiary': '#EEEEEE',
    '--color-white': '#fff',
  },
};

export default function ThemeStyles() {
  const themeColor = appConfig?.themeColor ?? 'blue';

  return (
    <style jsx global>{`
      :root {
        --color-black: ${themes[themeColor]['--color-black']};
        --color-primary: ${themes[themeColor]['--color-primary']};
        --color-secondary: ${themes[themeColor]['--color-secondary']};
        --color-tertiary: ${themes[themeColor]['--color-tertiary']};
        --color-white: ${themes[themeColor]['--color-white']};
      }
    `}</style>
  );
}

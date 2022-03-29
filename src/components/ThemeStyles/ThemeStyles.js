import appConfig from 'app.config';

const themes = {
  blue: {
    '--color-black': '#000',
    '--color-primary': '#000066',
    '--color-secondary': '#0969da',
    '--color-tertiary': '#CCCCCC',
    '--color-white': '#FFFFFF',
  },
  red: {
    '--color-black': '#000',
    '--color-primary': '#660000',
    '--color-secondary': '#B50505',
    '--color-tertiary': '#CCCCCC',
    '--color-white': '#FFFFFF',
  },
  green: {
    '--color-black': '#000',
    '--color-primary': '#006600',
    '--color-secondary': '#006827',
    '--color-tertiary': '#CCCCCC',
    '--color-white': '#FFFFFF',
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

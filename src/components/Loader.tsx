import { Triangle } from 'react-loader-spinner';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-40 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="flex flex-col items-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color={isDark ? "#fff" : "#000"}
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';

const ImageGridSection = () => {
  const [showFirstRow, setShowFirstRow] = useState(true);

  const row1 = [
    {
      src: 'https://iili.io/q2vfV8F.png',
      alt: 'Agustín Torres Delgado - Actividad política 1',
    },
    {
      src: 'https://iili.io/q2vfMa1.png',
      alt: 'Agustín Torres Delgado - Actividad política 2',
    },
  ];

  const row2 = [
    {
      src: 'https://iili.io/q2vfG3P.png',
      alt: 'Agustín Torres Delgado - Actividad política 3',
    },
    {
      src: 'https://iili.io/q2vVrJI.png',
      alt: 'Agustín Torres Delgado - Actividad política 4',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstRow((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-black">
      <div className="relative w-full">
        {/* Row 1 */}
        <div
          className={`grid grid-cols-2 gap-1 transition-opacity duration-1000 ease-in-out ${
            showFirstRow ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {row1.map((image, index) => (
            <div key={index} className="relative w-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                title={image.alt}
                className="w-full h-auto block object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error(`Failed to load image: ${image.src}`);
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Positioned absolutely on top of Row 1 */}
        <div
          className={`grid grid-cols-2 gap-1 absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            showFirstRow ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {row2.map((image, index) => (
            <div key={index} className="relative w-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                title={image.alt}
                className="w-full h-auto block object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error(`Failed to load image: ${image.src}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGridSection;

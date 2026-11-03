const HeroSection = () => {
  return (
    <section id="inicio" className="relative w-full min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Column - Image */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative">
          <img
            src="https://res.cloudinary.com/dt7otpfmm/image/upload/v1771397834/acercade_a6634o.png"
            alt="Agustín Torres Delgado - Líder político mexicano"
            title="Agustín Torres Delgado"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Right Column - Typography */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-12 lg:py-0">
          <div className="text-center lg:text-left lg:-ml-[50px]">
            <p className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-widest uppercase leading-tight">
              AGUSTÍN TORRES
            </p>
            <h1 className="text-white font-extrabold text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] tracking-tight uppercase leading-none mt-2 lg:mt-4">
              DELGADO
            </h1>
            <div className="w-20 h-1 bg-orange-500 mt-6 lg:mt-8 mx-auto lg:mx-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

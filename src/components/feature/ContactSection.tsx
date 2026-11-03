
const ContactSection = () => {
  return (
    <section id="comunicados">
      {/* Full-width bottom image - no text overlay */}
      <div className="w-full bg-black overflow-hidden">
        <img
          src="https://res.cloudinary.com/dt7otpfmm/image/upload/v1771395682/despiertacoatza_tdt3o0.png"
          alt="Despierta Coatza - Agustín Torres Delgado"
          title="Despierta Coatza - ATD"
          className="w-full h-auto block"
          style={{ minWidth: '1024px' }}
        />
      </div>

      {/* Solid black contact section below the image */}
      <div className="w-full bg-black py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Tienes preguntas?
          </h2>
          <p className="text-base md:text-lg text-white/85 mb-10 leading-relaxed">
            Estamos disponibles para resolver cualquier duda o inquietud que tengas:
          </p>
          <a
            href="mailto:info@agustintorresdelgado.com"
            className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-mail-line text-xl"></i>
            </div>
            <span>info@agustintorresdelgado.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

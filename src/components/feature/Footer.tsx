const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'ri-facebook-fill',
      url: 'https://www.facebook.com/AgustinTorresD',
    },
    {
      name: 'X (Twitter)',
      icon: 'ri-twitter-x-fill',
      url: 'https://x.com/Agustin_TorresD',
    },
    {
      name: 'Instagram',
      icon: 'ri-instagram-fill',
      url: 'https://www.instagram.com/agustin_torresd/',
    },
  ];

  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/70 transition-colors duration-300 cursor-pointer"
              aria-label={social.name}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <i className={`${social.icon} text-3xl`}></i>
              </div>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Agustín Torres Delgado. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

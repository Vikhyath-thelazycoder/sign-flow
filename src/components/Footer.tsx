import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">✋</span>
            </div>
            <span className="text-foreground font-bold text-xl tracking-tight">
              SIGN<span className="text-primary">LEARN</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ color: "hsl(var(--primary))" }}
                className="text-muted-foreground text-sm font-medium uppercase tracking-wider transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} SignLearn. All rights reserved.
          </p>
        </div>

        {/* Bottom gradient line */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const titleLine1 = "MASTER";
  const titleLine2 = "SIGN LANGUAGE";

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  const renderAnimatedText = (text: string, startIndex: number) => {
    return text.split("").map((letter, i) => (
      <motion.span
        key={`${startIndex}-${i}`}
        custom={startIndex + i}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={letterVariants}
        className="inline-block"
        style={{ 
          display: letter === " " ? "inline" : "inline-block",
          width: letter === " " ? "0.3em" : "auto",
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "hsl(var(--level-beginner) / 0.15)" }}
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "hsl(var(--level-intermediate) / 0.15)" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="perspective-1000">
          <h1 className="hero-text text-foreground mb-4">
            {renderAnimatedText(titleLine1, 0)}
          </h1>
          <h1 className="hero-text text-gradient-primary">
            {renderAnimatedText(titleLine2, titleLine1.length)}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
        >
          Embark on an interactive journey to learn sign language through 
          gamified lessons, progressive challenges, and mastery battles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(var(--primary) / 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg uppercase tracking-wide"
          >
            Begin Your Journey
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border-2 border-foreground/20 text-foreground font-bold text-lg uppercase tracking-wide hover:border-foreground/40 transition-colors"
          >
            Explore Levels
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 mt-2 rounded-full bg-muted-foreground/50"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

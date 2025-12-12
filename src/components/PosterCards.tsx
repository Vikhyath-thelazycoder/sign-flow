import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface LevelCard {
  id: number;
  title: string;
  badge: string;
  description: string;
  level: "beginner" | "intermediate" | "boss";
  icon: string;
}

const levels: LevelCard[] = [
  {
    id: 1,
    title: "BEGINNER",
    badge: "FOUNDATION",
    description: "Start your journey with essential signs and fingerspelling basics",
    level: "beginner",
    icon: "🌱",
  },
  {
    id: 2,
    title: "INTERMEDIATE",
    badge: "VOCABULARY",
    description: "Expand your vocabulary with everyday expressions and phrases",
    level: "intermediate",
    icon: "📚",
  },
  {
    id: 3,
    title: "BOSS FIGHT",
    badge: "MASTERY",
    description: "Challenge yourself with complex sentences and real conversations",
    level: "boss",
    icon: "⚔️",
  },
];

const PosterCards = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getCardClass = (level: string) => {
    switch (level) {
      case "beginner":
        return "level-card-beginner";
      case "intermediate":
        return "level-card-intermediate";
      case "boss":
        return "level-card-boss";
      default:
        return "";
    }
  };

  const getBadgeClass = (level: string) => {
    switch (level) {
      case "beginner":
        return "badge-beginner";
      case "intermediate":
        return "badge-intermediate";
      case "boss":
        return "badge-boss";
      default:
        return "";
    }
  };

  const getGlowClass = (level: string) => {
    switch (level) {
      case "beginner":
        return "glow-green";
      case "intermediate":
        return "glow-yellow";
      case "boss":
        return "glow-red";
      default:
        return "";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "hsl(var(--level-beginner))";
      case "intermediate":
        return "hsl(var(--level-intermediate))";
      case "boss":
        return "hsl(var(--level-boss))";
      default:
        return "hsl(var(--primary))";
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 mb-16 text-center"
      >
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">
          Your Path to Mastery
        </span>
        <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
          Choose Your Level
        </h2>
      </motion.div>

      {/* Cards container */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-center items-stretch perspective-1000">
          {levels.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative flex-1 lg:max-w-sm"
            >
              <Link to="/levels">
                <motion.div
                  onMouseEnter={() => setHoveredId(card.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={{
                    y: hoveredId === card.id ? -20 : 0,
                    scale: hoveredId === card.id ? 1.05 : hoveredId !== null ? 0.98 : 1,
                    opacity: hoveredId !== null && hoveredId !== card.id ? 0.6 : 1,
                    zIndex: hoveredId === card.id ? 10 : 1,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`relative h-[450px] md:h-[500px] rounded-3xl border border-border/30 overflow-hidden cursor-pointer ${getCardClass(card.level)}`}
                  style={{
                    boxShadow: hoveredId === card.id 
                      ? `0 25px 50px -12px ${getLevelColor(card.level).replace(')', ' / 0.4)')}` 
                      : "0 10px 30px -10px hsl(var(--background) / 0.5)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    animate={{ opacity: hoveredId === card.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 pointer-events-none ${getGlowClass(card.level)}`}
                    style={{ opacity: 0.3 }}
                  />

                  {/* Card content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    {/* Top section */}
                    <div>
                      <span className={getBadgeClass(card.level)}>
                        {card.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        scale: hoveredId === card.id ? 1.1 : 1,
                        rotate: hoveredId === card.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-7xl md:text-8xl text-center"
                    >
                      {card.icon}
                    </motion.div>

                    {/* Bottom section */}
                    <div>
                      <h3 
                        className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3"
                        style={{ color: getLevelColor(card.level) }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom border accent */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: getLevelColor(card.level) }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PosterCards;

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, CheckCircle, Play } from "lucide-react";

interface LevelSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  progress: number;
  status: "available" | "locked" | "completed";
  level: "beginner" | "intermediate" | "boss";
}

const levelSections: LevelSection[] = [
  {
    id: 1,
    title: "BEGINNER",
    subtitle: "FOUNDATION",
    description: "Build a solid foundation with essential signs, fingerspelling, and basic communication patterns.",
    objectives: [
      "Master the ASL alphabet (A-Z)",
      "Learn numbers 0-100",
      "Basic greetings and introductions",
      "Essential everyday vocabulary",
    ],
    progress: 0,
    status: "available",
    level: "beginner",
  },
  {
    id: 2,
    title: "INTERMEDIATE",
    subtitle: "VOCABULARY",
    description: "Expand your signing abilities with complex vocabulary, phrases, and grammatical structures.",
    objectives: [
      "Conversational phrases",
      "Question formation",
      "Expressing time and location",
      "Emotional expressions",
    ],
    progress: 0,
    status: "locked",
    level: "intermediate",
  },
  {
    id: 3,
    title: "BOSS FIGHT",
    subtitle: "MASTERY",
    description: "Challenge yourself with real-world conversations, complex sentences, and cultural nuances.",
    objectives: [
      "Complex sentence structures",
      "Deaf culture and etiquette",
      "Real-time conversation practice",
      "Advanced storytelling",
    ],
    progress: 0,
    status: "locked",
    level: "boss",
  },
];

const Levels = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero section */}
        <section className="py-16 md:py-24 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Your Learning Path
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground">
              Level Up Your
              <span className="text-gradient-primary block">Sign Skills</span>
            </h1>
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
              Progress through three carefully designed levels, each building upon the last 
              to transform you into a confident signer.
            </p>
          </motion.div>
        </section>

        {/* Level sections */}
        <section className="pb-24">
          {levelSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`py-16 md:py-24 ${index % 2 === 1 ? "bg-muted/10" : ""}`}
            >
              <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <span 
                      className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
                      style={{ color: getLevelColor(section.level) }}
                    >
                      Level {section.id} — {section.subtitle}
                    </span>
                    <h2 
                      className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6"
                      style={{ color: getLevelColor(section.level) }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                      {section.description}
                    </p>

                    {/* Objectives */}
                    <ul className="space-y-3 mb-8">
                      {section.objectives.map((objective, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-3 text-foreground"
                        >
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ background: getLevelColor(section.level) }}
                          />
                          {objective}
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: section.status === "available" ? 1.05 : 1 }}
                      whileTap={{ scale: section.status === "available" ? 0.95 : 1 }}
                      disabled={section.status === "locked"}
                      className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all ${
                        section.status === "locked"
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : section.status === "completed"
                          ? "bg-level-beginner text-primary-foreground"
                          : ""
                      }`}
                      style={
                        section.status === "available"
                          ? { 
                              background: getLevelColor(section.level),
                              color: "hsl(var(--primary-foreground))",
                            }
                          : {}
                      }
                    >
                      {section.status === "locked" && <Lock size={20} />}
                      {section.status === "completed" && <CheckCircle size={20} />}
                      {section.status === "available" && <Play size={20} />}
                      {section.status === "locked" 
                        ? "Complete Previous Level" 
                        : section.status === "completed"
                        ? "Review Level"
                        : "Start Learning"}
                    </motion.button>
                  </div>

                  {/* Progress Card */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-3xl border border-border/30 p-8 md:p-12 ${getCardClass(section.level)}`}
                    >
                      {/* Circular progress */}
                      <div className="flex justify-center mb-8">
                        <div className="relative w-40 h-40">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              className="fill-none stroke-muted"
                              strokeWidth="8"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              className="fill-none transition-all duration-1000"
                              style={{ 
                                stroke: getLevelColor(section.level),
                                strokeDasharray: `${2 * Math.PI * 70}`,
                                strokeDashoffset: `${2 * Math.PI * 70 * (1 - section.progress / 100)}`,
                              }}
                              strokeWidth="8"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span 
                              className="text-4xl font-black"
                              style={{ color: getLevelColor(section.level) }}
                            >
                              {section.progress}%
                            </span>
                            <span className="text-muted-foreground text-sm uppercase tracking-wider">
                              Complete
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div className="text-center">
                        <span 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider"
                          style={{
                            background: `${getLevelColor(section.level).replace(')', ' / 0.2)')}`,
                            color: getLevelColor(section.level),
                            border: `1px solid ${getLevelColor(section.level).replace(')', ' / 0.3)')}`,
                          }}
                        >
                          {section.status === "locked" && <Lock size={14} />}
                          {section.status === "completed" && <CheckCircle size={14} />}
                          {section.status === "available" && "Ready to Start"}
                          {section.status === "locked" && "Locked"}
                          {section.status === "completed" && "Completed"}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Levels;

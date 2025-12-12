import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
  icon: string;
  lessonCount: number;
  description: string;
  difficulty: "easy" | "medium" | "hard";
}

const allCategories: Category[] = [
  { id: 1, name: "Numbers", icon: "🔢", lessonCount: 15, description: "Learn to count and express numbers in sign language", difficulty: "easy" },
  { id: 2, name: "Letters", icon: "🔤", lessonCount: 26, description: "Master the complete fingerspelling alphabet", difficulty: "easy" },
  { id: 3, name: "Emotions", icon: "😊", lessonCount: 12, description: "Express feelings and emotional states", difficulty: "medium" },
  { id: 4, name: "Family", icon: "👨‍👩‍👧‍👦", lessonCount: 18, description: "Signs for family members and relationships", difficulty: "easy" },
  { id: 5, name: "Colors", icon: "🎨", lessonCount: 10, description: "Describe colors and visual qualities", difficulty: "easy" },
  { id: 6, name: "Actions", icon: "🏃", lessonCount: 20, description: "Common verbs and action words", difficulty: "medium" },
  { id: 7, name: "Food & Drink", icon: "🍕", lessonCount: 25, description: "Restaurant, cooking, and food vocabulary", difficulty: "easy" },
  { id: 8, name: "Time", icon: "⏰", lessonCount: 14, description: "Days, months, and time expressions", difficulty: "medium" },
  { id: 9, name: "Places", icon: "🏠", lessonCount: 22, description: "Locations, buildings, and directions", difficulty: "medium" },
  { id: 10, name: "Weather", icon: "🌤️", lessonCount: 12, description: "Weather conditions and seasons", difficulty: "easy" },
  { id: 11, name: "Animals", icon: "🐕", lessonCount: 30, description: "Pets, wildlife, and animal kingdom", difficulty: "easy" },
  { id: 12, name: "Conversations", icon: "💬", lessonCount: 35, description: "Common phrases and dialogue patterns", difficulty: "hard" },
];

const Categories = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  const filteredCategories = filter === "all" 
    ? allCategories 
    : allCategories.filter(c => c.difficulty === filter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "hsl(var(--level-beginner))";
      case "medium":
        return "hsl(var(--level-intermediate))";
      case "hard":
        return "hsl(var(--level-boss))";
      default:
        return "hsl(var(--primary))";
    }
  };

  const filters = [
    { value: "all", label: "All" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ] as const;

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
              Explore & Learn
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground">
              Categories
            </h1>
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
              Dive into specialized topics and build vocabulary that matters to you. 
              Each category is packed with interactive lessons and practice exercises.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center gap-3 mt-12"
          >
            {filters.map((f) => (
              <motion.button
                key={f.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide transition-all ${
                  filter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Categories grid */}
        <section className="pb-24 container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                layout
              >
                <motion.div
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="category-tile h-64 rounded-2xl p-6 flex flex-col justify-between cursor-pointer group"
                  style={{
                    boxShadow: hoveredId === category.id 
                      ? `0 0 40px ${getDifficultyColor(category.difficulty).replace(')', ' / 0.3)')}`
                      : "none",
                    borderColor: hoveredId === category.id 
                      ? getDifficultyColor(category.difficulty).replace(')', ' / 0.5)')
                      : undefined,
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <motion.span
                      animate={{ 
                        scale: hoveredId === category.id ? 1.2 : 1,
                        rotate: hoveredId === category.id ? 10 : 0,
                      }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className="text-5xl"
                    >
                      {category.icon}
                    </motion.span>
                    <div className="flex flex-col items-end gap-2">
                      <span 
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ 
                          background: `${getDifficultyColor(category.difficulty).replace(')', ' / 0.2)')}`,
                          color: getDifficultyColor(category.difficulty),
                        }}
                      >
                        {category.lessonCount} lessons
                      </span>
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded uppercase tracking-wider"
                        style={{ color: getDifficultyColor(category.difficulty) }}
                      >
                        {category.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground uppercase tracking-wide mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {category.description}
                    </p>
                    <motion.div
                      className="flex items-center gap-2 text-sm font-semibold"
                      style={{ color: getDifficultyColor(category.difficulty) }}
                    >
                      <span>Start Learning</span>
                      <motion.div
                        animate={{ x: hoveredId === category.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    animate={{ width: hoveredId === category.id ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                    style={{ background: getDifficultyColor(category.difficulty) }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats section */}
        <section className="py-16 border-t border-border/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "12", label: "Categories" },
                { value: "239", label: "Total Lessons" },
                { value: "1000+", label: "Signs to Learn" },
                { value: "∞", label: "Practice Sessions" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <span className="text-4xl md:text-5xl font-black text-gradient-primary">
                    {stat.value}
                  </span>
                  <p className="mt-2 text-muted-foreground text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;

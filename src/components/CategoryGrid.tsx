import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  icon: string;
  lessonCount: number;
  color: string;
}

const categories: Category[] = [
  { id: 1, name: "Numbers", icon: "🔢", lessonCount: 15, color: "hsl(var(--level-beginner))" },
  { id: 2, name: "Letters", icon: "🔤", lessonCount: 26, color: "hsl(var(--level-intermediate))" },
  { id: 3, name: "Emotions", icon: "😊", lessonCount: 12, color: "hsl(var(--level-boss))" },
  { id: 4, name: "Family", icon: "👨‍👩‍👧‍👦", lessonCount: 18, color: "hsl(var(--primary))" },
  { id: 5, name: "Colors", icon: "🎨", lessonCount: 10, color: "hsl(var(--level-intermediate))" },
  { id: 6, name: "Actions", icon: "🏃", lessonCount: 20, color: "hsl(var(--level-beginner))" },
];

const CategoryGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Explore & Learn
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
            Categories
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Link to="/categories">
                <motion.div
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="category-tile h-48 rounded-2xl p-6 flex flex-col justify-between cursor-pointer"
                  style={{
                    boxShadow: hoveredId === category.id 
                      ? `0 0 30px ${category.color.replace(')', ' / 0.3)')}`
                      : "none",
                    borderColor: hoveredId === category.id 
                      ? category.color.replace(')', ' / 0.5)')
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
                    <span 
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ 
                        background: `${category.color.replace(')', ' / 0.2)')}`,
                        color: category.color,
                      }}
                    >
                      {category.lessonCount} lessons
                    </span>
                  </div>

                  {/* Bottom row */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <motion.div
                      animate={{ width: hoveredId === category.id ? "40%" : "0%" }}
                      transition={{ duration: 0.3 }}
                      className="h-0.5 mt-2 rounded-full"
                      style={{ background: category.color }}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-border text-foreground font-semibold uppercase tracking-wide hover:bg-muted/20 transition-colors"
            >
              View All Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/resume'

const categories = [
  { label: 'Languages', items: skills.languages, color: 'border-accent/50 text-accent-light' },
  { label: 'Tools & Tech', items: skills.toolsTech, color: 'border-text/20 text-text-muted' },
  { label: 'Concepts', items: skills.concepts, color: 'border-accent/30 text-text' },
  { label: 'Interests', items: skills.interests, color: 'border-text/10 text-text-muted' },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-text mb-16"
        >
          What I work with.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + ci * 0.1 }}
            >
              <p className="font-heading text-xs text-text-muted uppercase tracking-widest mb-5">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.2 + ci * 0.08 + ii * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 border text-sm font-body rounded-sm cursor-default ${cat.color}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

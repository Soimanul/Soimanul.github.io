import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Years coding' },
  { value: '6+', label: 'Internships' },
  { value: '2nd', label: 'Datathon place' },
  { value: '3', label: 'Languages' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold leading-tight text-text mb-8"
            >
              Analytical mind,
              <br />
              <span className="italic text-accent">creative approach.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="space-y-5 text-text-muted leading-relaxed font-body"
            >
              <p>
                Analytical and detail-oriented Computer Science and Artificial Intelligence
                student at{' '}
                <span className="text-text font-medium">IE University</span> in Madrid,
                with a strong focus on software engineering, data analysis, and machine
                learning.
              </p>
              <p>
                My work centers on building reliable, scalable systems and extracting
                meaningful insights from data. I have experience working with real-world
                datasets, developing Python-based solutions, and applying structured
                problem-solving to technical challenges.
              </p>
              <p>
                I am particularly interested in designing efficient backend systems,
                implementing data-driven applications, and exploring machine learning
                models that translate theory into practical impact.
              </p>
              <p>
                Currently seeking internship opportunities in{' '}
                <span className="text-text font-medium">
                  Software Engineering, Data Analysis, or Machine Learning
                </span>
                , where I can contribute to production-level systems and continue
                developing as an engineer.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-border">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-bg-card p-8 flex flex-col justify-between"
              >
                <span className="font-display text-5xl font-bold text-accent leading-none">
                  {stat.value}
                </span>
                <span className="font-heading text-xs text-text-muted uppercase tracking-widest mt-4">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

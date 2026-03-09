import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience, education } from '../data/resume'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-text mb-16"
        >
          Where I've worked.
        </motion.h2>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-16">
          {/* Timeline */}
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {experience.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                  className="relative pl-8"
                >
                  {/* dot */}
                  <span className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-bg-secondary border-2 border-accent" />

                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-heading font-600 text-text text-base">{item.title}</h3>
                    {item.highlight && (
                      <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent font-heading text-xs rounded-sm">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                    <span className="font-body text-sm text-accent-light">{item.org}</span>
                    <span className="font-body text-sm text-text-muted">{item.location}</span>
                    <span className="font-body text-xs text-text-muted">{item.period}</span>
                  </div>

                  <ul className="space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="font-body text-sm text-text-muted leading-relaxed flex gap-2">
                        <span className="text-accent shrink-0 mt-0.5">–</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="section-label mb-6">Education</p>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="p-6 bg-bg-card border border-border rounded-sm"
                >
                  <p className="font-heading font-600 text-text text-sm mb-1">{edu.degree}</p>
                  <p className="font-body text-accent-light text-sm">{edu.school}</p>
                  <p className="font-body text-text-muted text-xs mt-0.5">{edu.location}</p>
                  <p className="font-heading text-xs text-text-muted uppercase tracking-widest mt-3">
                    {edu.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

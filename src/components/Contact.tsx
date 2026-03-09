import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { contact } from '../data/resume'

const links = [
  {
    icon: FiMail,
    label: 'Email',
    href: `mailto:${contact.email}`,
    display: contact.email,
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    href: contact.github,
    display: 'github.com/Soimanul',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: contact.linkedin,
    display: 'linkedin.com/in/vlad-soimu',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-6"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-bold text-text leading-tight mb-6"
        >
          Let's talk.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-text-muted text-lg leading-relaxed mb-14"
        >
          Open to internship opportunities, collaborations, and interesting conversations.
          Reach out through any of the channels below.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {links.map(({ icon: Icon, label, href, display }, i) => (
            <motion.a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              whileHover={{ scale: 1.03 }}
              className="group flex items-center gap-3 px-6 py-4 bg-bg-card border border-border hover:border-accent transition-all duration-200 rounded-sm min-w-[200px]"
            >
              <Icon size={18} className="text-accent shrink-0" />
              <div className="text-left">
                <p className="font-heading text-xs text-text-muted uppercase tracking-wider">{label}</p>
                <p className="font-body text-text text-sm group-hover:text-accent transition-colors truncate max-w-[160px]">
                  {display}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

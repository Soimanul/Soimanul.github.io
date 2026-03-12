import { motion } from 'framer-motion'

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/50 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      {/* Graduated blur fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '200px', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '140px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', maskImage: 'linear-gradient(to top, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '80px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', maskImage: 'linear-gradient(to top, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Content */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p variants={stagger.item} className="section-label mb-6" style={{ color: '#111' }}>
          Computer Science &amp; Artificial Intelligence
        </motion.p>

        <motion.h1
          variants={stagger.item}
          className="font-display text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-bold leading-none tracking-tight mb-6"
        >
          <span className="block italic text-text">Vlad</span>
          <span className="block text-gradient">Soimu</span>
        </motion.h1>

        <motion.p
          variants={stagger.item}
          className="font-body text-text-muted text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
        >
          Building at the intersection of software, data, and intelligence.
          Based in <span className="text-text">Madrid</span>.
        </motion.p>

        <motion.div
          variants={stagger.item}
          className="flex flex-col xs:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-accent text-bg font-heading font-700 text-sm tracking-widest uppercase hover:bg-accent-light transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-text/30 text-text font-heading font-500 text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="section-label text-[0.6rem]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiStar, FiGitBranch, FiExternalLink, FiGithub } from 'react-icons/fi'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const langColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { repos, loading, error } = useGitHubRepos()

  return (
    <section id="projects" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          Projects
        </motion.p>

        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-text"
          >
            What I've built.
          </motion.h2>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="https://github.com/Soimanul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-heading text-sm text-text-muted hover:text-accent transition-colors"
          >
            <FiGithub size={16} />
            View all on GitHub
          </motion.a>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-bg-card border border-border rounded-sm animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="font-body text-text-muted text-center py-16">
            Couldn't load projects right now.{' '}
            <a href="https://github.com/Soimanul" className="text-accent underline">
              Visit GitHub directly.
            </a>
          </p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="font-body text-text-muted text-center py-16">No public repos yet.</p>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="group flex flex-col bg-bg-card border border-border p-6 rounded-sm card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-600 text-text text-base group-hover:text-accent transition-colors leading-snug flex-1 pr-3">
                    {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                  </h3>
                  <FiExternalLink
                    size={14}
                    className="text-text-muted group-hover:text-accent transition-colors shrink-0 mt-0.5"
                  />
                </div>

                <p className="font-body text-text-muted text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>

                <div className="flex items-center gap-4 text-xs text-text-muted font-body">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: langColors[repo.language] ?? '#888' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FiStar size={11} />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FiGitBranch size={11} />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

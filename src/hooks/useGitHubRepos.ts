import { useState, useEffect } from 'react'
import type { GitHubRepo } from '../types/github'

const GITHUB_USERNAME = 'Soimanul'

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=owner`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        )
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const data: GitHubRepo[] = await res.json()
        setRepos(data.filter((r) => !r.fork && !r.name.includes('.github.io')))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repos')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return { repos, loading, error }
}

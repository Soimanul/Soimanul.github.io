import { useState, useEffect } from 'react'
import type { GitHubRepo } from '../types/github'

const GITHUB_USERNAME = 'Soimanul'
const GITHUB_ORG = 'Seraphim-Systems'

const GITHUB_HEADERS = { Accept: 'application/vnd.github.v3+json' }

const MIN_DESCRIPTION_LENGTH = 10
const SCORING_MIN_DESC_LENGTH = 20
const SCORE_DESC_BONUS = 2
const TRUNCATE_MAX_LENGTH = 160
const TRUNCATE_EARLY_BOUNDARY_RATIO = 0.3
const MAX_DISPLAY_REPOS = 9

const PINNED_REPOS = [
  'Synapse',
  'git-query',
  'nlp-article_analyzer',
  'tamagotchme',
  'n_body_simulation',
  'mountain-pendulum',
  'flux',
]

/** Remove common markdown syntax and HTML tags to produce plain text. */
function stripMarkdown(text: string): string {
  return text
    // Strip angle brackets first to prevent any HTML tag reconstruction
    .replace(/[<>]/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    .replace(/`{1,3}([^`]*)`{1,3}/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Truncate at a clean sentence boundary within maxLen characters. */
function truncateAtSentence(text: string, maxLen = TRUNCATE_MAX_LENGTH): string {
  if (text.length <= maxLen) return text
  const slice = text.slice(0, maxLen)
  const lastBoundary = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('! '),
    slice.lastIndexOf('? '),
  )
  if (lastBoundary >= 0 && lastBoundary > maxLen * TRUNCATE_EARLY_BOUNDARY_RATIO) {
    return slice.slice(0, lastBoundary + 1)
  }
  const lastSpace = slice.lastIndexOf(' ')
  return slice.slice(0, lastSpace > 0 ? lastSpace : maxLen) + '…'
}

/** Resolve the best available description for a repo. */
function resolveDescription(repo: GitHubRepo): string {
  if (repo.description && repo.description.trim().length > MIN_DESCRIPTION_LENGTH) {
    return truncateAtSentence(stripMarkdown(repo.description))
  }
  // Fallback: generate from name and topics
  const nameWords = repo.name.replace(/[-_]/g, ' ')
  if (repo.topics && repo.topics.length > 0) {
    return `${nameWords} — ${repo.topics.slice(0, 4).join(', ')}.`
  }
  return nameWords
}

/** Score a repository for ranking (higher = better). */
function computeScore(repo: GitHubRepo): number {
  const stars = repo.stargazers_count * 3
  const topicScore = (repo.topics?.length ?? 0) * 2
  const descScore =
    repo.description && repo.description.trim().length > SCORING_MIN_DESC_LENGTH
      ? SCORE_DESC_BONUS
      : 0
  const daysSince =
    (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
  const recentActivity = Math.max(0, 1.5 * (1 - Math.min(daysSince, 365) / 365))
  return stars + topicScore + descScore + recentActivity
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const [personalRes, orgRes] = await Promise.all([
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
            { headers: GITHUB_HEADERS },
          ),
          fetch(
            `https://api.github.com/orgs/${GITHUB_ORG}/repos?sort=updated&per_page=100&type=public`,
            { headers: GITHUB_HEADERS },
          ),
        ])

        const personalData: GitHubRepo[] = personalRes.ok ? await personalRes.json() : []
        const orgData: GitHubRepo[] = orgRes.ok ? await orgRes.json() : []

        /** Returns true for repos that have enough content to be worth showing. */
        function isQualityRepo(r: GitHubRepo): boolean {
          const hasDesc = !!(r.description && r.description.trim().length > MIN_DESCRIPTION_LENGTH)
          const hasTopics = !!(r.topics && r.topics.length > 0)
          return hasDesc || hasTopics
        }

        const personal = personalData
          .filter((r) => !r.fork && !r.name.endsWith('.github.io') && isQualityRepo(r))
          .map((r) => ({ ...r, _source: 'personal' as const }))

        const org = orgData
          .filter((r) => !r.fork && isQualityRepo(r))
          .map((r) => ({ ...r, _source: 'organization' as const }))

        // Merge and deduplicate by id (personal takes priority)
        const seen = new Set<number>()
        const merged: GitHubRepo[] = []
        for (const repo of [...personal, ...org]) {
          if (!seen.has(repo.id)) {
            seen.add(repo.id)
            merged.push(repo)
          }
        }

        // Enrich with resolved descriptions and scores
        const enriched = merged.map((repo) => ({
          ...repo,
          _resolvedDescription: resolveDescription(repo),
          _score: computeScore(repo),
        }))

        const pinned = PINNED_REPOS
          .map((name) => enriched.find((r) => r.name.toLowerCase() === name.toLowerCase()))
          .filter((r): r is NonNullable<typeof r> => r != null)

        const pinnedIds = new Set(pinned.map((r) => r.id))
        const rest = enriched
          .filter((r) => !pinnedIds.has(r.id))
          .sort((a, b) => (b._score ?? 0) - (a._score ?? 0))

        const result = [...pinned, ...rest].slice(0, MAX_DISPLAY_REPOS)

        setRepos(result)
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

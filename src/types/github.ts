export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
  private: boolean
  // Enriched fields added by useGitHubRepos hook
  _source?: 'personal' | 'organization'
  _resolvedDescription?: string
  _score?: number
}

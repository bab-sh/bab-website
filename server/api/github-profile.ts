interface GitHubProfile {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
}

interface CacheEntry {
  data: GitHubProfile
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 60 * 60 * 1000

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const username = query.username as string

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    })
  }

  const now = Date.now()
  const cached = cache.get(username)

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return { ...cached.data, cached: true }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`)

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`)
    }

    const data = await res.json()
    const profile: GitHubProfile = {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
    }

    cache.set(username, { data: profile, timestamp: now })
    return { ...profile, cached: false }
  } catch {
    if (cached) {
      return { ...cached.data, cached: true, error: true }
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch GitHub profile',
    })
  }
})

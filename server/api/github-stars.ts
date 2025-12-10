let cachedStars: number | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 2 * 60 * 1000

export default defineEventHandler(async () => {
  const now = Date.now()

  if (cachedStars !== null && now - cacheTimestamp < CACHE_TTL) {
    return { stars: cachedStars, cached: true }
  }

  try {
    const res = await fetch('https://api.github.com/repos/bab-sh/bab')
    const data = await res.json()
    cachedStars = data.stargazers_count
    cacheTimestamp = now
    return { stars: cachedStars, cached: false }
  } catch {
    return { stars: cachedStars, cached: true, error: true }
  }
})

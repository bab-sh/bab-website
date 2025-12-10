let cachedVersion: string | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 2 * 60 * 1000

export default defineEventHandler(async () => {
  const now = Date.now()

  if (cachedVersion !== null && now - cacheTimestamp < CACHE_TTL) {
    return { version: cachedVersion, cached: true }
  }

  try {
    const res = await fetch('https://api.github.com/repos/bab-sh/bab/releases/latest')
    const data = await res.json()
    cachedVersion = data.tag_name || null
    cacheTimestamp = now
    return { version: cachedVersion, cached: false }
  } catch {
    return { version: cachedVersion, cached: true, error: true }
  }
})

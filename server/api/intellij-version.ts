let cachedVersion: string | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 60 * 60 * 1000

export default defineEventHandler(async () => {
  const now = Date.now()

  if (cachedVersion !== null && now - cacheTimestamp < CACHE_TTL) {
    return { version: cachedVersion, cached: true }
  }

  try {
    const res = await fetch('https://plugins.jetbrains.com/api/plugins/29264/updates?size=1')
    const data = await res.json()
    cachedVersion = data[0]?.version || null
    cacheTimestamp = now
    return { version: cachedVersion, cached: false }
  } catch {
    return { version: cachedVersion, cached: true, error: true }
  }
})

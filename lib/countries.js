import { endpoint } from '@/utils/endpoint'

export async function getAllCountries() {
  // Add cache-busting timestamp to prevent caching
  const timestamp = new Date().getTime()
  const data = await fetch(`${endpoint}/countries?t=${timestamp}`, { cache: 'no-store' })

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

export async function getCountryBySlug(slug) {
  // Add cache-busting timestamp to prevent caching
  const timestamp = new Date().getTime()
  const data = await fetch(`${endpoint}/countries/${slug}?t=${timestamp}`, { cache: 'no-store' })

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

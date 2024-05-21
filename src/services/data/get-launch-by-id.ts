import type { Doc } from '../../types'

export async function getLaunchById(id: string) {
	try {
		const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`)
		}

		const launch = (await res.json()) as Doc

		return launch
	} catch (error) {
		console.error('Failed to fetch launch:', error)
		throw error
	}
}

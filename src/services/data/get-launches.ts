import type { SpaceXAPI } from '../../types'

interface Props {
	limit?: number
}

export async function getLaunches({ limit = 12 }: Props = {}) {
	try {
		const res = await fetch('https://api.spacexdata.com/v5/launches/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: {},
				options: {
					limit,
					sort: {
						date_unix: 'asc'
					}
				}
			})
		})

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`)
		}

		const { docs: launches } = (await res.json()) as SpaceXAPI

		return launches
	} catch (error) {
		console.error('Failed to fetch launches:', error)
		throw error // re-throwing the error is important if you need to handle it further up the call stack
	}
}

export const GetStepper  = () => {
	return [
		{
			id: 1,
			stepName: 'Distribution',
			active: false,
			path: '/facultative'
		},
		{
			id: 2,
			stepName: 'Detail',
			active: false,
			path: '/facultative/detail'
		},
		{
			id: 3,
			stepName: 'Summary',
			active: true,
			path: '/facultative/summary'
		}
	]
}
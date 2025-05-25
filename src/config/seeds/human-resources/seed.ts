import { checkingDBToInsertSeeds } from '~/helpers/index'

export async function humanResourcesSeeds() {
	const humanResourcesPoints = [
		{
			id: '2278461a-adba-4d7a-9346-9e615e6cbc27',
			entry: new Date('2025-04-10 06:57:37.894'),
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
		},
		{
			id: '531eb305-588a-4e1b-9978-17e37c214a2a',
			entry: new Date('2025-04-10 06:55:37.894'),
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
		},
		{
			id: 'd5e2baaa-4841-48de-84ac-b9e175dc898f',
			entry: new Date('2025-04-10 06:53:37.894'),
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
		},
	]
	await checkingDBToInsertSeeds(humanResourcesPoints, 'humanResourcesPoint', 'id')
	console.table('Registros de Ponto inseridos com sucesso.')
}

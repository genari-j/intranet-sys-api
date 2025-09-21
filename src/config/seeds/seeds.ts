import { humanResourcesSeeds } from './human-resources/seed'
import { incidentsSeeds } from './incidents/seed'
import { intranetSysSeeds } from './intranet-sys/seed'
import { newsSeeds } from './news/seed'
import { purchasesSeeds } from './purchases/seed'

async function execSeeds() {
	/* ------------------ STARTING ------------------ */
	console.table('Iniciando a inserção das seeds 😊')

	await intranetSysSeeds()
	await newsSeeds()
	await humanResourcesSeeds()
	await incidentsSeeds()
	await purchasesSeeds()

	/* ------------------ FINISHING ------------------ */
	console.table('Finalização da inserção das seeds 😊')
}

execSeeds()

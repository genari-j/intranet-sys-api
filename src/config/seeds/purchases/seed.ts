import { checkingDBToInsertSeeds } from '~/helpers/index'

export async function purchasesSeeds() {
	/* ------------------ Purchases ------------------ */
	const purchases = [
		{
			id: '9039c3f5-cc35-4513-b020-cf136f0ca0a5',
			code: '#P7318LF',
			item: 'Aparelho celular',
			amount: 1,
			description: 'Necessário comprar um novo iphone para o setor de Recursos Humanos.',
			purchase_link: 'https://www.apple.com/br/iphone-14-pro/',
		},
	]
	await checkingDBToInsertSeeds(purchases, 'purchase', 'item')
	console.table('Compras inseridas com sucesso.')
}

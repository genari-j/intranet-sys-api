import { checkingDBToInsertSeeds } from '~/helpers/index'

export async function intranetSysSeeds() {
	/* ------------------ PROFILES ------------------ */
	const profiles = [
		{
			id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
			name: 'Admin',
			code: 'ADM',
			description: 'Poderá executar todas operações presente no sistema',
		},
		{
			id: '62d0de1a-aa67-4696-843e-d27809d06756',
			name: 'Gestor de área',
			code: 'GES',
			description: 'Poderá visualizar todas informações e realizar novos cadastros',
		},
		{
			id: '060e265e-abaa-425e-abdb-30f8f594f7f4',
			name: 'Funcionário',
			code: 'FUN',
			description: 'Poderá apenas visualizar informações',
		},
	]
	await checkingDBToInsertSeeds(profiles, 'profile', 'name')
	console.table('Perfis inseridos com sucesso.')

	/* ------------------ PROFILE PERMISSIONS ------------------ */
	const profilePermissions = [
		// ADMIN
		{
			id: 'aa3b8ee7-8b37-4bbc-8241-18218802bc5a',
			profile_id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
			permission: 'FAQ',
			description: 'Poderá acessar a tela de cadastrar novos usuários',
		},
		{
			id: '805e478c-7c77-48ac-85b8-8edd820ce3b5',
			profile_id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
			permission: 'Dashboard',
			description: 'Poderá acessar a tela e informações de Dashboard',
		},
		{
			id: '6dc6a49e-b7ec-4527-9a64-86723093b54a',
			profile_id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
			permission: 'Systems',
			description: 'Poderá acessar a tela e encontrar a URL de algum sistema interno desejado',
		},
		{
			id: '8b5128d3-6a47-4f19-abe9-db32532a349b',
			profile_id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
			permission: 'Register News',
			description: 'Poderá acessar a tela de cadastrar notícias',
		},
		{
			id: 'a547d48c-61db-46eb-83c6-2b6ec377e515',
			profile_id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
			permission: 'Edit News',
			description: 'Poderá acessar a tela de editar notícias',
		},
		// MANAGER
		{
			id: 'dd15eb44-398d-4c1a-8e86-4813026ee889',
			profile_id: '62d0de1a-aa67-4696-843e-d27809d06756',
			permission: 'FAQ',
			description: 'Poderá acessar a tela de cadastrar novos usuários',
		},
		{
			id: '41d0189a-6a36-4df4-bbde-6b5ba9356d64',
			profile_id: '62d0de1a-aa67-4696-843e-d27809d06756',
			permission: 'Systems',
			description: 'Poderá acessar a tela e encontrar a URL de algum sistema interno desejado',
		},
		{
			id: 'fde1e77a-b16a-4937-9c85-cf8908aacfdd',
			profile_id: '62d0de1a-aa67-4696-843e-d27809d06756',
			permission: 'Register News',
			description: 'Poderá acessar a tela de cadastrar notícias',
		},
		// COLABORATOR
		{
			id: 'c8dba30a-e246-415f-bac1-7aa97f432ae7',
			profile_id: '060e265e-abaa-425e-abdb-30f8f594f7f4',
			permission: 'Systems',
			description: 'Poderá acessar a tela e encontrar a URL de algum sistema interno desejado',
		},
	]
	await checkingDBToInsertSeeds(profilePermissions, 'profilePermission', 'id')
	console.table('Permissões dos perfis inseridas com sucesso.')

	/* ------------------ DEPARTMENTS ------------------ */
	const departments = [
		{ id: '54cfc828-5b1d-429d-8db1-6c566536f2a3', name: 'Almoxarifado' },
		{ id: '63041c62-179e-4d49-a56a-0ed107cdf5a4', name: 'Compliance' },
		{ id: '28730e5b-7825-491f-89e3-b542f8b0894f', name: 'Financeiro' },
		{ id: '1c35e90f-7403-4d43-8cd7-ea1600f2f9c0', name: 'Gestão de Qualidade' },
		{ id: 'dd1a3d9f-cd92-4c82-b87d-678c716dcd04', name: 'Jurídico' },
		{ id: 'b196720e-e6e7-4863-a3c2-d7777e96c1ee', name: 'Logística' },
		{ id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63', name: 'Manutenção' },
		{ id: '38987697-cbb6-4466-9576-b1d5d4910864', name: 'Marketing' },
		{ id: '99afd002-0da0-4e61-bba8-c378541b653b', name: 'Operações' },
		{ id: '1773f8a4-2cc6-422a-af96-f2d169baed66', name: 'Produção' },
		{ id: 'a35b6345-7653-4950-b45d-a25a0762ec65', name: 'Recursos Humanos' },
		{ id: '7efae5b5-1b62-4e0a-9871-65481206a324', name: 'Relacionamento com Cliente' },
		{ id: '4c275fb6-2928-4dfb-9ee8-a0a44fe38be9', name: 'Segurança Corporativa' },
		{ id: 'c430893e-74ef-4493-b2c5-cc2ccb0bb6fd', name: 'Segurança do Trabalho' },
		{ id: '5f395b61-eb06-4c19-bd0a-caca0bc39c3d', name: 'Suprimentos/Compras' },
		{ id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486', name: 'TI - Redes' },
		{ id: 'e677e205-004b-4fb5-953d-8a61341f066d', name: 'TI - Sistemas' },
		{ id: '124269a0-ad62-45e6-9d7f-04ff65aad7e2', name: 'Vendas' },
	]
	await checkingDBToInsertSeeds(departments, 'department', 'name')
	console.table('Departamentos inseridos com sucesso.')

	/* ------------------ ADDRESSES ------------------ */
	const addresses = [
		{
			id: 'ea726368-114a-4b9c-9b5e-192396aa6523',
			street: 'Av. Exemplo',
			number: 123,
			neighborhood: 'Jardim Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			id: '6c410d8c-ef04-40ab-9f08-12feadaab898',
			street: 'Est. Exemplo',
			number: 456,
			neighborhood: 'Vila Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
		{
			id: '972c5a7d-6d46-4c05-9830-1b09808a6116',
			street: 'Rua Exemplo',
			number: 789,
			neighborhood: 'Quadra Tal',
			city: 'São Paulo',
			state: 'São Paulo',
			cep: '12345678',
			complement: 'Próximo ao local tal',
		},
	]
	await checkingDBToInsertSeeds(addresses, 'addresses', 'street')
	console.table('Endereços inseridos com sucesso.')

	/* ------------------ USERS ------------------ */
	const users = [
		{
			id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			name: 'Administrador',
			email: 'admin@hotmail.com',
			registration: '00511',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11922225555',
			department_id: 'a35b6345-7653-4950-b45d-a25a0762ec65',
			address_id: 'ea726368-114a-4b9c-9b5e-192396aa6523',
			profile_id: '7236f384-6124-41d8-b0a6-c5fe7f0609f0',
		},
		{
			id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			name: 'Funcionário',
			email: 'colaborator@hotmail.com',
			registration: '00513',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11911113333',
			department_id: '38987697-cbb6-4466-9576-b1d5d4910864',
			address_id: '972c5a7d-6d46-4c05-9830-1b09808a6116',
			profile_id: '060e265e-abaa-425e-abdb-30f8f594f7f4',
		},
		{
			id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			name: 'Gestor de Área',
			email: 'manager@hotmail.com',
			registration: '00512',
			password: '$2b$10$kn4U6jwJgNQkbzHsM.1d7OIlq6VucVBvRuz88hjToDNNTHWcV81Xa',
			contact: '11988889999',
			department_id: '63041c62-179e-4d49-a56a-0ed107cdf5a4',
			address_id: '6c410d8c-ef04-40ab-9f08-12feadaab898',
			profile_id: '62d0de1a-aa67-4696-843e-d27809d06756',
		},
	]
	await checkingDBToInsertSeeds(users, 'user', 'registration')
	console.table('Usuários inseridos com sucesso.')

	/* ------------------ NOTIFICATIONS ------------------ */
	const notifications = [
		{
			title: 'Nova notícia',
			description: 'Uma nova notícia foi publicada: 31 Anos de "CompanyName" 😊',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
		},
		{
			title: 'Nova notícia',
			description: 'Uma nova notícia foi publicada: 31 Anos de "CompanyName" 😊',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
		},
		{
			title: 'Nova notícia',
			description: 'Uma nova notícia foi publicada: 31 Anos de "CompanyName" 😊',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
		},
	]
	await checkingDBToInsertSeeds(notifications, 'notification', 'user_id')
	console.table('Notificações inseridas com sucesso.')
}

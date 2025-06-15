import { checkingDBToInsertSeeds } from '~/helpers/index'

export async function intranetSysSeeds() {
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
		},
	]
	await checkingDBToInsertSeeds(users, 'user', 'registration')
	console.table('Usuários inseridos com sucesso.')

	/* ------------------ PERMISSIONS ------------------ */
	const permissions = [
		{
			id: '4b3675ee-d7a0-4cac-8394-4bf089bb1345',
			name: 'Dashboards',
			description: 'Permite acesso aos relatórios e gráficos via Dashboards.',
		},
		{
			id: 'adef8f51-4b3e-4c60-9780-a059acf5244b',
			name: 'Cadastrar notícias',
			description: 'Permite criar novas notícias no sistema.',
		},
		{
			id: 'c21db8b2-b194-48a7-ab0f-c19c790ae722',
			name: 'Visualizar notícias',
			description: 'Permite visualizar todas notícias no sistema.',
		},
		{
			id: '2b69a921-ac67-4023-881f-14c81ddd0fcf',
			name: 'Editar notícias',
			description: 'Permite modificar notícias existentes.',
		},
		{
			id: 'ac253841-bc0f-4a85-9784-e665d8d6e7dd',
			name: 'Desativar notícias',
			description: 'Permite desativar notícias obsoletas ou incorretas.',
		},
		{
			id: '20151a7f-abcb-4667-bf97-1d59d83c2f60',
			name: 'Registrar ponto',
			description: 'Permite registrar horários de entrada, intervalo e saída.',
		},
		{
			id: 'b4d5c09d-c08e-472f-8474-34754d033bf6',
			name: 'Visualizar todos pontos',
			description: 'Permite visualizar todos os registros de pontos.',
		},
		{
			id: 'f1c4d195-4836-4914-a2b9-fc3599b5820f',
			name: 'Visualizar pontos específicos',
			description: 'Permite ao usuário visualizar somente seus próprios registros de ponto.',
		},
		{
			id: 'd8f5b785-366c-4dd7-b0f4-ff456e87ee42',
			name: 'Edição de registro de ponto',
			description: 'Permite editar qualquer registro de ponto existente.',
		},
		{
			id: '6171e0b8-fa71-43c7-94aa-1351249102b6',
			name: 'Solicitar edição de registro de ponto',
			description: 'Permite ao usuário solicitar alterações em seus registos de ponto.',
		},
		{
			id: '44519ce5-465b-4635-b76c-443d59b7d245',
			name: 'Exclusão de registro de ponto',
			description: 'Permite excluir registros de ponto indevidos.',
		},
		{
			id: '1e34af37-1f11-4621-af1f-12968dedcfc7',
			name: 'Visualizar vendas',
			description: 'Permite acesso à listagem de vendas realizadas.',
		},
		{
			id: 'df411791-4906-436d-a23c-71a097d0a183',
			name: 'Cadastrar produtos',
			description: 'Permite adicionar novos produtos ao catálogo.',
		},
		{
			id: 'f15ae958-ad09-493a-b31a-0e7a9fcf7c97',
			name: 'Visualizar produtos',
			description: 'Permite visualizar produtos disponíveis para venda.',
		},
		{
			id: 'b783343f-fab1-4b46-9319-71601771b235',
			name: 'Editar produtos',
			description: 'Permite modificar detalhes dos produtos cadastrados.',
		},
		{
			id: '74bc7667-4e3c-40db-a1d9-ce0292ac5610',
			name: 'Desativar produtos',
			description: 'Permite ocultar ou inativar produtos do catálogo.',
		},
		{
			id: '096bc6c7-17e4-44cb-b964-c0fc2f9e8a61',
			name: 'Cadastrar visitas',
			description: 'Permite registrar visitas na portaria.',
		},
		{
			id: '6846be2c-00bb-4cfd-8a61-420ee4155891',
			name: 'Visualizar visitas',
			description: 'Permite consultar registros de visitas.',
		},
		{
			id: '1fa653f9-d6c5-42d5-9ccc-bb45c29aedb0',
			name: 'Editar visitas',
			description: 'Permite editar informações de visitas registradas.',
		},
		{
			id: '45e0bc6c-13db-4749-8b4f-42d87c3728d9',
			name: 'Cadastrar coletas ou entregas',
			description: 'Permite registrar coletas e entregas realizadas.',
		},
		{
			id: '9a1fbe4e-2589-4f61-ab3b-cf63437847a3',
			name: 'Visualizar coletas ou entregas',
			description: 'Permite consultar registros de coletas e entregas.',
		},
		{
			id: '0d934384-973b-4ee5-a402-8886b7c12a9f',
			name: 'Editar coletas ou entregas',
			description: 'Permite editar informações de coletas ou entregas.',
		},
		{
			id: 'ddc20964-8549-4cee-99c2-8cc727277a37',
			name: 'Desativar coletas ou entregas',
			description: 'Permite inativar registros de coletas ou entregas.',
		},
		{
			id: '7f5fa727-9d0c-4664-9cfe-93dc7b9bc683',
			name: 'Cadastrar ligações',
			description: 'Permite registrar ligações recebidas ou efetuadas.',
		},
		{
			id: '5618817a-589d-4e0e-97cf-d52a3759f00a',
			name: 'Visualizar ligações',
			description: 'Permite visualizar o histórico de ligações.',
		},
		{
			id: '285632a8-2f61-49c7-a70f-a7d249f9820f',
			name: 'Editar ligações',
			description: 'Permite editar registros de ligações.',
		},
		{
			id: '60c9786e-d63a-473b-aba5-10b9f4c5ebb8',
			name: 'Cadastrar ocorrências',
			description: 'Permite registrar novas ocorrências.',
		},
		{
			id: '4a9f2444-aeed-4c92-9eb7-a51ebb95c976',
			name: 'Visualizar ocorrências',
			description: 'Permite consultar ocorrências registradas.',
		},
		{
			id: '5af50623-5b28-4bea-9d8b-e2026c976cf7',
			name: 'Editar ocorrências',
			description: 'Permite editar ocorrências existentes.',
		},
		{
			id: '9a5da6f3-7b9b-4d54-903c-829c78db0991',
			name: 'Solicitar compras',
			description: 'Permite registrar solicitações de compra.',
		},
		{
			id: '9168e6d9-5730-48a4-9246-6aa958700cca',
			name: 'Visualizar todas compras',
			description: 'Permite acessar todas as solicitações de compra.',
		},
		{
			id: 'dfb33d13-0a6e-4710-aebb-cf44be4d6f8c',
			name: 'Visualizar compras específicas',
			description: 'Permite visualizar apenas as solicitações de compras que o próprio usuário registrou.',
		},
		{
			id: 'd2c36093-fe9e-47f9-bf1f-c240a714585d',
			name: 'Editar compras',
			description: 'Permite editar apenas informações de compras feitas pelo próprio usuário.',
		},
		{
			id: '15f2aa01-0eff-48bb-91b6-59e34ba45fee',
			name: 'Desativar compras',
			description: 'Permite comunicar o cancelamento de compras feitas pelo próprio usuário.',
		},
		{
			id: '67ac8a3d-4ebc-426e-b871-e01a1bed7253',
			name: 'Cadastrar itens',
			description: 'Permite adicionar novos itens ao estoque.',
		},
		{
			id: 'aa6dc297-211e-4319-91d9-3b519220c249',
			name: 'Visualizar itens',
			description: 'Permite visualizar os itens disponíveis no estoque.',
		},
		{
			id: '9477c54d-d6eb-40e6-b733-49669a5784de',
			name: 'Editar itens',
			description: 'Permite modificar informações de itens do estoque.',
		},
		{
			id: '21a511ca-60f6-4f81-8ca5-fddad98ae61a',
			name: 'Desativar itens',
			description: 'Permite desativar itens do estoque.',
		},
		{
			id: 'a608e57b-fa64-4fd6-b54c-572c197a1e42',
			name: 'Cadastrar documentos',
			description: 'Permite registrar novos documentos no sistema.',
		},
		{
			id: 'f99a40aa-2c1e-45da-ae2d-c01b0d429aaa',
			name: 'Visualizar todos documentos',
			description: 'Permite acesso a todos os documentos cadastrados.',
		},
		{
			id: '5df18037-700d-428d-901a-c4bcdddb37f4',
			name: 'Visualizar documentos específicos',
			description:
				'Permite acessar apenas documentos públicos, do seu departamento e documentos com vínculo ao seu departamento.',
		},
		{
			id: 'e5cc26ef-a419-4314-90dc-b575ed1bbb7b',
			name: 'Editar documentos',
			description: 'Permite modificar informações de documentos.',
		},
		{
			id: 'ea0cc3a3-77a8-43cb-94a9-9611ad249429',
			name: 'Desativar documentos',
			description: 'Permite remover ou arquivar documentos.',
		},
		{
			id: 'f234484c-83be-4eda-a36e-9c8d754f4e83',
			name: 'Registrar chamados',
			description: 'Permite registrar chamados para atendimento no sistema.',
		},
		{
			id: 'c88ce683-65e7-478f-b1ab-0a5955a2346a',
			name: 'Visualizar todos chamados',
			description: 'Permite visualizar todos chamados registrados no sistema.',
		},
		{
			id: 'f3f25fae-c339-42ec-8160-264c6e521aac',
			name: 'Visualizar chamados específicos',
			description: 'Permite visualizar somente chamados que tenham vínculo com o departamento do usuário.',
		},
		{
			id: 'fe84110b-d9e3-4d21-9373-9801f97ff0ad',
			name: 'Editar chamados',
			description: 'Permite editar informações em chamados registrados.',
		},
		{
			id: 'd480e44d-a243-4359-a21c-c9c377318387',
			name: 'Desativar chamados',
			description: 'Permite desativar chamados registrados.',
		},
	]
	await checkingDBToInsertSeeds(permissions, 'permission', 'name')
	console.table('Permissões inseridas com sucesso.')

	/* ------------------ USER PERMISSIONS ------------------ */
	const userPermissions = [
		// ADMIN
		{
			id: '812afac2-2a28-4ea3-8390-0f5f556ff509',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '4b3675ee-d7a0-4cac-8394-4bf089bb1345',
		},
		{
			id: '5be27967-5d6a-4f62-a12e-cee92c748399',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'adef8f51-4b3e-4c60-9780-a059acf5244b',
		},
		{
			id: 'e72b6718-9be6-4407-bf90-ebc4d5d50bfa',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'c21db8b2-b194-48a7-ab0f-c19c790ae722',
		},
		{
			id: 'b389e66a-1d81-47f9-aed9-a4eb58f69e74',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '2b69a921-ac67-4023-881f-14c81ddd0fcf',
		},
		{
			id: '3c8df275-a520-4a79-a277-1cd1f2b2d5d8',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'ac253841-bc0f-4a85-9784-e665d8d6e7dd',
		},
		{
			id: '0ae79bfb-71af-4b89-b6ca-536954ed0f07',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '20151a7f-abcb-4667-bf97-1d59d83c2f60',
		},
		{
			id: '0d4500dd-4327-48b6-bc51-2d5766b0bab6',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'b4d5c09d-c08e-472f-8474-34754d033bf6',
		},
		{
			id: 'd1ad7f42-b856-4bdc-a594-d5c0674b80f4',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'f1c4d195-4836-4914-a2b9-fc3599b5820f',
		},
		{
			id: 'a6cb8f00-fbb6-43a5-8138-2a07ceddbe01',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'd8f5b785-366c-4dd7-b0f4-ff456e87ee42',
		},
		{
			id: '955dc70a-0293-4256-b2dd-440fe41ad4da',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '6171e0b8-fa71-43c7-94aa-1351249102b6',
		},
		{
			id: 'e022c46f-f279-4380-8289-b08e4feaa78a',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '44519ce5-465b-4635-b76c-443d59b7d245',
		},
		{
			id: '1f859342-3f62-4b33-82bb-a41c7dae32d4',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '1e34af37-1f11-4621-af1f-12968dedcfc7',
		},
		{
			id: 'dfb0b0d5-d44c-476d-b539-99da3c212659',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'f15ae958-ad09-493a-b31a-0e7a9fcf7c97',
		},
		{
			id: '089695a6-5c37-4fae-8391-934b9a848227',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'df411791-4906-436d-a23c-71a097d0a183',
		},
		{
			id: 'f4213c06-d804-4024-ac7b-b685c2112936',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'b783343f-fab1-4b46-9319-71601771b235',
		},
		{
			id: '0314aa65-e3bd-4814-9999-eb2cf3ad7c18',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '74bc7667-4e3c-40db-a1d9-ce0292ac5610',
		},
		{
			id: '2263e590-f797-40f0-bb88-23ee9f0415eb',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '096bc6c7-17e4-44cb-b964-c0fc2f9e8a61',
		},
		{
			id: '215d1a65-57d8-445b-91b9-91b383aa8536',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '6846be2c-00bb-4cfd-8a61-420ee4155891',
		},
		{
			id: '45de86b7-bb0d-4b2d-873e-c7d894421984',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '1fa653f9-d6c5-42d5-9ccc-bb45c29aedb0',
		},
		{
			id: '32c158ff-413f-4cbd-a390-2b9bdf52c711',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '45e0bc6c-13db-4749-8b4f-42d87c3728d9',
		},
		{
			id: 'd5a6e3da-e08d-4d54-b7b9-456fd1e58ca5',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '9a1fbe4e-2589-4f61-ab3b-cf63437847a3',
		},
		{
			id: 'fcc049aa-403e-40e9-978b-9c6e77ba0342',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '0d934384-973b-4ee5-a402-8886b7c12a9f',
		},
		{
			id: '83ca07bc-b95c-48d8-ba8b-f981735a2ac5',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'ddc20964-8549-4cee-99c2-8cc727277a37',
		},
		{
			id: '945f4a41-e213-4867-8658-91834def1e30',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '7f5fa727-9d0c-4664-9cfe-93dc7b9bc683',
		},
		{
			id: 'f173ba66-3ada-409b-a9e3-89e9e265ccc3',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '5618817a-589d-4e0e-97cf-d52a3759f00a',
		},
		{
			id: 'd71ab5de-46c3-456f-91d1-1b698ea16fed',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '285632a8-2f61-49c7-a70f-a7d249f9820f',
		},
		{
			id: 'e1a2d812-ba0a-407c-b3ae-790b06064db0',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '60c9786e-d63a-473b-aba5-10b9f4c5ebb8',
		},
		{
			id: '24a152d6-ab62-44fb-8bb5-dbb2cf6ea8b6',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '4a9f2444-aeed-4c92-9eb7-a51ebb95c976',
		},
		{
			id: '2241f212-56ac-4122-87b0-75e6a5240bd5',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '5af50623-5b28-4bea-9d8b-e2026c976cf7',
		},
		{
			id: '0f7a586b-e673-4601-849c-51af42185289',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '9a5da6f3-7b9b-4d54-903c-829c78db0991',
		},
		{
			id: '7d88e0a5-1c2e-4dd7-ba1b-1f0aad0c4d0d',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '9168e6d9-5730-48a4-9246-6aa958700cca',
		},
		{
			id: 'f83a723b-19a4-46f2-93a3-4da8be927f03',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'dfb33d13-0a6e-4710-aebb-cf44be4d6f8c',
		},
		{
			id: '24055bfb-cbd2-4989-a9f7-57fdd4253288',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'd2c36093-fe9e-47f9-bf1f-c240a714585d',
		},
		{
			id: '36f58624-ce7f-454c-a92c-7383b07c68e2',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '15f2aa01-0eff-48bb-91b6-59e34ba45fee',
		},
		{
			id: '608575e5-a77d-4f38-a546-0d3ea220c8ff',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '67ac8a3d-4ebc-426e-b871-e01a1bed7253',
		},
		{
			id: '77310098-3e42-4cde-9ea0-2dab40460b90',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'aa6dc297-211e-4319-91d9-3b519220c249',
		},
		{
			id: '90608978-39b6-440b-bd26-08c0dc35ace4',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '9477c54d-d6eb-40e6-b733-49669a5784de',
		},
		{
			id: '6fb79b99-c91c-4087-9861-8c811c56fb11',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '21a511ca-60f6-4f81-8ca5-fddad98ae61a',
		},
		{
			id: '14202d31-4a1a-4aeb-942c-5bdc26980320',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'a608e57b-fa64-4fd6-b54c-572c197a1e42',
		},
		{
			id: '450c6642-c6f7-47d2-bfb5-7c5ff36d650b',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'f99a40aa-2c1e-45da-ae2d-c01b0d429aaa',
		},
		{
			id: '92221a40-e12d-4e42-9c2e-41c1bfd3c846',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: '5df18037-700d-428d-901a-c4bcdddb37f4',
		},
		{
			id: '01a9a9f9-0b83-47da-8a53-81860aaa2195',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'e5cc26ef-a419-4314-90dc-b575ed1bbb7b',
		},
		{
			id: '12c53433-035b-4538-ba35-24ffcc81b255',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'ea0cc3a3-77a8-43cb-94a9-9611ad249429',
		},
		{
			id: '4f6c41f9-f89a-4f94-bce0-439e0ee4a65d',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'f234484c-83be-4eda-a36e-9c8d754f4e83',
		},
		{
			id: '5ee205c8-e3f9-40b2-98b8-e99021cf57d4',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'c88ce683-65e7-478f-b1ab-0a5955a2346a',
		},
		{
			id: '94fbc219-b33b-49e6-8718-ef6888e01f60',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'f3f25fae-c339-42ec-8160-264c6e521aac',
		},
		{
			id: '2d494af1-f0ed-4c23-bcb8-312ec9a283c6',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'fe84110b-d9e3-4d21-9373-9801f97ff0ad',
		},
		{
			id: 'a97d0c55-b578-46db-82aa-2203ad6e5e9f',
			user_id: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			permission_id: 'd480e44d-a243-4359-a21c-c9c377318387',
		},
		// GESTOR DE ÁREA
		{
			id: 'e53b526a-75b7-4ea9-92cb-20805dcc2d88',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: '20151a7f-abcb-4667-bf97-1d59d83c2f60',
		},
		{
			id: '07174886-08fe-43c7-a3eb-1a4e5bc619ef',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'f1c4d195-4836-4914-a2b9-fc3599b5820f',
		},
		{
			id: '4edd6340-afcf-4b08-a39e-ef204537c90b',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'c21db8b2-b194-48a7-ab0f-c19c790ae722',
		},
		{
			id: '28ccd9bf-1233-40f6-9e95-d33b9a6dd37f',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'd8f5b785-366c-4dd7-b0f4-ff456e87ee42',
		},
		{
			id: 'a76d950e-d2b2-4740-918b-564a27e1510e',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'f234484c-83be-4eda-a36e-9c8d754f4e83',
		},
		{
			id: '32b669c5-65a2-41ea-bca8-e64dd39789d5',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'f3f25fae-c339-42ec-8160-264c6e521aac',
		},
		{
			id: '02074481-9327-4bce-9d58-53dec4623e0b',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'fe84110b-d9e3-4d21-9373-9801f97ff0ad',
		},
		{
			id: '97fb07ca-d6d8-419a-84f6-d8536607f5a9',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: '9a5da6f3-7b9b-4d54-903c-829c78db0991',
		},
		{
			id: '7268b5bd-34e6-4e83-ae97-5d900e550d57',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'dfb33d13-0a6e-4710-aebb-cf44be4d6f8c',
		},
		{
			id: '3d2331e7-cea9-4632-be90-a533793d6816',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'd2c36093-fe9e-47f9-bf1f-c240a714585d',
		},
		{
			id: 'a81eed6b-e195-4150-b30c-7d28dbc085ef',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'a608e57b-fa64-4fd6-b54c-572c197a1e42',
		},
		{
			id: '87f30d01-6457-4423-bbf7-9090e6770b8e',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: '5df18037-700d-428d-901a-c4bcdddb37f4',
		},
		{
			id: '61da4728-f1da-45e5-b905-fddc22e21b8a',
			user_id: 'eeb3c87e-a23f-42a2-92b0-cac2992c28af',
			permission_id: 'e5cc26ef-a419-4314-90dc-b575ed1bbb7b',
		},
		// FUNCIONÁRIO
		{
			id: '9959a5fc-89e4-47f4-a9b6-47b0525ef93d',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: '20151a7f-abcb-4667-bf97-1d59d83c2f60',
		},
		{
			id: '1f027fb4-a5f2-4a8b-bcce-617a2d60af35',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'c21db8b2-b194-48a7-ab0f-c19c790ae722',
		},
		{
			id: 'dc5237c7-88f5-4679-9f22-984188bb1bdb',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'f1c4d195-4836-4914-a2b9-fc3599b5820f',
		},
		{
			id: 'c19f908e-0a1e-4c68-b1da-b5fc71d7f075',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: '6171e0b8-fa71-43c7-94aa-1351249102b6',
		},
		{
			id: '5a21d9c9-92c6-43e6-8c4d-d9b19cef5187',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'f234484c-83be-4eda-a36e-9c8d754f4e83',
		},
		{
			id: 'acdaeb0f-7c7f-4bd1-8d92-3558fafac536',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'f3f25fae-c339-42ec-8160-264c6e521aac',
		},
		{
			id: '45add46a-03da-4a62-ba04-21f6e6faf680',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'fe84110b-d9e3-4d21-9373-9801f97ff0ad',
		},
		{
			id: 'efc16163-edf3-4cc3-b112-d8fbc94d1750',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: '9a5da6f3-7b9b-4d54-903c-829c78db0991',
		},
		{
			id: 'cc458057-1b8e-43e3-8a63-2219519a7e6b',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'dfb33d13-0a6e-4710-aebb-cf44be4d6f8c',
		},
		{
			id: '55611cef-9528-4f6c-920e-647f65d28fcb',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: 'd2c36093-fe9e-47f9-bf1f-c240a714585d',
		},
		{
			id: 'e5d99b91-fdc9-41c3-84a8-73b66b78cdcc',
			user_id: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			permission_id: '5df18037-700d-428d-901a-c4bcdddb37f4',
		},
	]
	await checkingDBToInsertSeeds(userPermissions, 'userPermission', 'id')
	console.table('Relacionamento entre usuários e permissões inseridos com sucesso.')

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

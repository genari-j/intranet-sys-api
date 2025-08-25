import { checkingDBToInsertSeeds } from '~/helpers/index'

export async function incidentsSeeds() {
	/* ------------------ PRIORITIES ------------------ */
	const priorities = [
		{
			id: '2bd898f8-b0ad-442d-99d1-3532afa62dae',
			name: 'Normal',
			description:
				'Caso que pode ser resolvido dentro do tempo padrão, sem urgência. Trata-se de uma solicitação de baixo impacto e complexidade.',
		},
		{
			id: '13ff0a3e-84f8-45d7-b32e-ef28204b21ca',
			name: 'Mediana',
			description:
				'Solicitação que exige atenção dentro de um prazo razoável. Não é um caso urgente, mas precisa ser tratada com certa agilidade.',
		},
		{
			id: 'f0d813c5-7460-425f-b24f-e2e0e43a74d4',
			name: 'Alta',
			description:
				'Caso de alta prioridade que requer ação imediata. Trata-se de uma situação crítica ou urgente, que exige resposta rápida e resolução imediata.',
		},
	]
	await checkingDBToInsertSeeds(priorities, 'incidentPriority', 'name')
	console.table('Prioridades para os Incidentes inseridas com sucesso.')

	/* ------------------ STATUS ------------------ */
	const status = [
		{
			id: '6c554c3f-6c2f-4e61-9938-1ce4a2210924',
			name: 'Aberto',
			description: 'A solicitação foi registrada e aguarda início do atendimento.',
		},
		{
			id: 'e8030552-245f-4b57-9836-9e98a1795891',
			name: 'Em atendimento',
			description: 'O atendimento foi iniciado e a tratativa inicial já foi dada ao caso.',
		},
		{
			id: 'b84835d6-6a56-49b7-b5cf-4a337734a3fa',
			name: 'Em cotação',
			description: 'A solicitação de compra foi registrada e está aguardando o processo de cotação.',
		},
		{
			id: 'a730e89b-0f0d-45e9-ad5b-02cacc69c78c',
			name: 'Compra em trânsito',
			description: 'A compra foi enviada e está em trânsito para entrega na empresa.',
		},
		{
			id: 'd38a4475-4740-4978-b64d-d8f324391abc',
			name: 'Material em estoque',
			description: 'O material foi recebido com sucesso e está disponível no estoque.',
		},
		{
			id: '6ee23dba-9e94-42e7-9fe1-4955c9775d2a',
			name: 'Processo de instalação',
			description: 'O material foi coletado e a instalação está sendo realizada pela equipe responsável.',
		},
		{
			id: 'c8026309-3b6f-43b5-bafb-86fc155c88d3',
			name: 'Em validação',
			description: 'O colaborador responsável está validando o andamento do atendimento ou solicitação.',
		},
		{
			id: '9f78833a-c2cc-4d44-ab2c-1b6030a763eb',
			name: 'Finalizado',
			description: 'A solicitação foi atendida.',
		},
		{
			id: '839f7895-3e7f-4a42-a5c3-97990cc084b8',
			name: 'Cancelado',
			description: 'A solicitação foi cancelada, não sendo mais necessário o atendimento ou solução.',
		},
	]
	await checkingDBToInsertSeeds(status, 'incidentStatus', 'name')
	console.table('Status para os Incidentes inseridos com sucesso.')

	/* ------------------ CATEGORIES ------------------ */
	const categories = [
		{
			id: 'e701f386-8afe-4866-8434-42225ca6e7db',
			name: 'Gestão de Pessoal e Ausências',
			description:
				'Solicitações relacionadas ao controle de ponto, férias, atestados médicos, normas trabalhistas ou políticas internas.',
			department_id: 'a35b6345-7653-4950-b45d-a25a0762ec65',
		},
		{
			id: '0d5e76b0-53b5-4339-898c-f302d8fc48e3',
			name: 'Informações de Benefícios',
			description:
				'Solicitações e dúvidas relacionadas aos benefícios oferecidos pela empresa, incluindo planos de saúde, vale-alimentação, vale-transporte, seguros e outros programas de benefícios internos.',
			department_id: 'a35b6345-7653-4950-b45d-a25a0762ec65',
		},
		{
			id: '16a3e2e7-9608-4f90-b9cd-c314b9a94e5c',
			name: 'Suporte Jurídico',
			description: 'Demandas relacionadas a consultas e necessidades de apoio do departamento jurídico da empresa.',
			department_id: 'dd1a3d9f-cd92-4c82-b87d-678c716dcd04',
		},
		{
			id: '8f6639bc-c4f5-4e3f-9c3f-7594ac6d72fd',
			name: 'Saúde e Segurança no Trabalho',
			description:
				'Solicitações relacionadas à segurança no ambiente de trabalho, incluindo normas e medidas de prevenção.',
			department_id: 'c430893e-74ef-4493-b2c5-cc2ccb0bb6fd',
		},
		{
			id: 'a64f5760-b197-4a4d-bb75-e7e62b215fad',
			name: 'Marketing e Comunicação',
			description:
				'Demandas relacionadas à comunicação interna e externa, campanhas de marketing e materiais promocionais.',
			department_id: '38987697-cbb6-4466-9576-b1d5d4910864',
		},
		{
			id: '2e1d7735-5fa0-41d7-9e3b-c7052769b12e',
			name: 'Gestão de Documentos e Arquivos',
			description: 'Demandas para organização, acesso e controle de documentos e arquivos físicos ou digitais.',
			department_id: 'a35b6345-7653-4950-b45d-a25a0762ec65',
		},
		{
			id: '519280ef-6d21-4d9f-ab78-20c7513ed0bd',
			name: 'Periféricos de Computador',
			description:
				'Problemas ou solicitações relacionadas a dispositivos periféricos, como mouse, teclado, monitores e webcams.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: 'c15dd353-4a2a-4313-8a92-5d9748d39a55',
			name: 'Infraestrutura de Servidores',
			description: 'Demandas relacionadas ao gerenciamento e manutenção de servidores, sejam físicos ou em nuvem.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: 'f3c7d1a8-2e12-4689-bdf7-c31a6a35f4a1',
			name: 'Infraestrutura de Redes',
			description:
				'Questões envolvendo conectividade, infraestrutura de rede, e problemas de acesso à internet ou rede interna.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: '13b6cf70-2eec-4c19-93c8-0879d8c8f97e',
			name: 'Sistemas Corporativos',
			description:
				'Solicitações relacionadas a softwares ou plataformas que têm interação direta com as operações da empresa, sejam internos ou externos.',
			department_id: 'e677e205-004b-4fb5-953d-8a61341f066d',
		},
		{
			id: '0bb54103-1f77-40f5-99d8-d1ecf77391e5',
			name: 'Serviços de Limpeza',
			description: 'Demandas relacionadas à limpeza e conservação de ambientes internos da empresa.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: '8060ae41-b173-4c6f-83bc-eb2c3b2a3fce',
			name: 'Manutenção de Ambientes',
			description:
				'Solicitações voltadas à manutenção e preservação das condições gerais do ambiente físico da empresa.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: 'a523f4c2-2fe0-4e8f-9b07-9b1b131eeacf',
			name: 'Cuidados com Jardins',
			description: 'Solicitações e demandas relacionadas aos cuidados com áreas verdes e jardins da empresa.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: 'b67d19aa-5205-4011-bb8d-10ee592af199',
			name: 'Manutenção de Elevadores',
			description:
				'Problemas ou manutenções solicitadas para os elevadores e sistemas de transporte vertical dentro das instalações.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: '557d5df4-fcdf-4546-aa19-ee9ada84a99f',
			name: 'Controle de Pragas',
			description: 'Demandas para controle, prevenção e erradicação de pragas no ambiente corporativo.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: '2800bc71-caf8-4f88-95a4-b881f7b67c48',
			name: 'Gestão de Segurança',
			description:
				'Solicitações gerais e informações relacionadas à segurança patrimonial, incluindo prevenção e incidentes.',
			department_id: '4c275fb6-2928-4dfb-9ee8-a0a44fe38be9',
		},
		{
			id: '1dc66f3c-4f99-4e6d-a1d0-5fff0db334c8',
			name: 'Câmeras de Vigilância',
			description: 'Questões ou demandas relacionadas aos sistemas de câmeras de segurança instalados na empresa.',
			department_id: '4c275fb6-2928-4dfb-9ee8-a0a44fe38be9',
		},
		{
			id: '1238e5fd-82c1-4a19-b86c-a39ce09436d9',
			name: 'Sistemas de Alarmes',
			description: 'Solicitações e problemas relacionados aos sistemas de alarme de segurança da empresa.',
			department_id: '4c275fb6-2928-4dfb-9ee8-a0a44fe38be9',
		},
		{
			id: 'df6856e2-cda5-40ba-b8f4-bedcf0ac9a81',
			name: 'Serviços de Vigilância',
			description: 'Demandas relacionadas aos serviços de vigilância interna ou externa para proteção da empresa.',
			department_id: '4c275fb6-2928-4dfb-9ee8-a0a44fe38be9',
		},
		{
			id: '3b130a26-2546-4a78-9454-8548f124d144',
			name: 'Problemas de Energia Elétrica',
			description:
				'Problemas e solicitações relacionadas ao fornecimento e distribuição de energia elétrica nas instalações da empresa.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: 'f056ebf3-ad80-40df-9bad-53f3942c00c7',
			name: 'Manutenção de Fiação Elétrica',
			description: 'Demandas voltadas para a manutenção e organização do sistema de fiação elétrica da empresa.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: '909984a9-9566-467d-8236-b51a9a64f66e',
			name: 'Iluminação',
			description:
				'Solicitações relacionadas à substituição, manutenção ou instalação de lâmpadas e sistemas de iluminação.',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
		},
		{
			id: '69c0e866-c3da-4d86-a1c6-4b79bfa6a962',
			name: 'Telefonia Interna',
			description: 'Problemas com os sistemas telefônicos internos ou solicitações relacionadas.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: 'ba86e423-0b2e-4e6d-96f6-e55007094c02',
			name: 'Problemas com Impressoras',
			description: 'Solicitações relacionadas a problemas de funcionamento ou manutenção de impressoras.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: 'd2f27e72-1fbb-4c72-9579-98d85951c0be',
			name: 'Problemas com Computadores',
			description:
				'Demandas relacionadas a falhas ou solicitações de manutenção de computadores e dispositivos móveis.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: 'a65172cc-b0a4-4aef-8900-3d8d6f0f755d',
			name: 'Cadastro de Funcionalidades',
			description: 'Solicitações para registrar ou modificar funcionalidades em sistemas ou aplicativos corporativos.',
			department_id: 'e677e205-004b-4fb5-953d-8a61341f066d',
		},
		{
			id: '9c84a455-0355-41f3-b8f5-7c417032c15f',
			name: 'Arquitetura e Design',
			description: 'Solicitações de mudanças ou melhorias no layout e design de espaços internos ou externos.',
			department_id: '38987697-cbb6-4466-9576-b1d5d4910864',
		},
		{
			id: '4c4c2575-bfef-4134-9f65-46733f028618',
			name: 'Segurança de Redes',
			description: 'Demandas relacionadas à proteção, monitoramento e segurança das redes corporativas.',
			department_id: 'ad6ef7d4-68fe-4714-bc37-eb8071192486',
		},
		{
			id: 'ed52e12a-28ab-43f0-a4fe-73c611c571a3',
			name: 'Gestão de Inventário',
			description:
				'Solicitações de controle, atualização e verificação de inventário de produtos, materiais e equipamentos.',
			department_id: '54cfc828-5b1d-429d-8db1-6c566536f2a3',
		},
		{
			id: '8f63d01b-f890-44b4-8b23-ecd8f5a5ea5c',
			name: 'Gerenciamento de Compras',
			description: 'Demandas relacionadas a processos de compras de materiais e serviços necessários à operação.',
			department_id: '5f395b61-eb06-4c19-bd0a-caca0bc39c3d',
		},
		{
			id: 'b4b8a09d-0466-4044-bd42-6cc5f9ecbfbe',
			name: 'Serviços de Transporte',
			description:
				'Demandas de transporte interno ou externo para eventos ou necessidade de deslocamento de materiais.',
			department_id: 'b196720e-e6e7-4863-a3c2-d7777e96c1ee',
		},
	]
	await checkingDBToInsertSeeds(categories, 'incidentCategory', 'name')
	console.table('Categorias para os Incidentes inseridas com sucesso.')

	/* ------------------ INCIDENTS ------------------ */
	const incidents = [
		{
			id: '6135cfe0-5e59-459f-b67c-196c136ed85f',
			code: '#T6565AXC',
			title: 'Catraca danificada',
			description: 'Com o movimento de pesssoas na entrada principal, a catraca 3 parou de funcionar',
			register_by: '474b3e7c-9138-48d5-8cc3-a2bd444828b6',
			department_id: 'dc745410-5da5-4be8-b6a0-96d7dc510d63',
			priority_id: '2bd898f8-b0ad-442d-99d1-3532afa62dae',
			status_id: '6c554c3f-6c2f-4e61-9938-1ce4a2210924',
			category_id: '8060ae41-b173-4c6f-83bc-eb2c3b2a3fce',
		},
		{
			id: 'fddc13a6-351a-4119-adfc-86d88b8f9223',
			code: '#T87H5ACX',
			title: 'Cancelar vale transporte',
			description: 'Gostaria de solicitar o cancelamento do meu vale transporte',
			register_by: 'a413fac3-3695-4fc5-afc4-15bb309d30da',
			department_id: 'a35b6345-7653-4950-b45d-a25a0762ec65',
			priority_id: '2bd898f8-b0ad-442d-99d1-3532afa62dae',
			status_id: '6c554c3f-6c2f-4e61-9938-1ce4a2210924',
			category_id: '0d5e76b0-53b5-4339-898c-f302d8fc48e3',
		},
	]
	await checkingDBToInsertSeeds(incidents, 'incident', 'id')
	console.table('Incidentes inseridos com sucesso.')

	/* ------------------ INCIDENT AVATARS ------------------ */
	const incidentAvatars = [
		{
			incident_id: '6135cfe0-5e59-459f-b67c-196c136ed85f',
			avatar: 'firstIncidentEx.jpg',
		},
		{
			incident_id: '6135cfe0-5e59-459f-b67c-196c136ed85f',
			avatar: 'secondIncidentEx.jpg',
		},
	]
	await checkingDBToInsertSeeds(incidentAvatars, 'incidentAvatar', 'avatar')
	console.table('Avatares de Incidentes inseridos com sucesso.')
}

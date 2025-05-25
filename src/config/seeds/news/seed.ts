import { checkingDBToInsertSeeds } from '~/helpers/index'

export async function newsSeeds() {
	/* ------------------ News Flag ------------------ */
	const newsFlag = [
		{
			id: '14ff275d-a7ab-4190-9c4e-60b09fa094dc',
			name: 'Principal',
			description: 'Será mostrada no topo, como notícia principal',
		},
		{
			id: '73f4254d-9fe0-4b82-a40b-55afe229a165',
			name: 'Mediana',
			description: 'Será mostrada na sessão secundária de notícias, abaixo do topo',
		},
		{
			id: 'e8dc70bf-0e61-4cbe-ad15-64ce61d219d8',
			name: 'Simples',
			description: 'Será mostrada na sessão de notícias mais simples, abaixo das secundárias',
		},
	]
	await checkingDBToInsertSeeds(newsFlag, 'newsFlag', 'name')
	console.table('Tipos das notícias inseridos com sucesso.')

	/* ------------------ News ------------------ */
	const news = [
		{
			title: '31 Anos de "CompanyName" 😊',
			description:
				'Nos anos 2000, estava nascendo a "CompanyName", e agora estamos aqui, celebrando seus 31 anos de operação. Foram inúmeros desafios e conquistas que estão nos mantendo até aqui. A "CompanyName" só tem a agradecer por todos.',
			flag_id: '14ff275d-a7ab-4190-9c4e-60b09fa094dc',
			avatar: '1745173741959-mainfirstnew.jpg',
		},
		{
			title: 'Você disse Vale Combustível? ⛽',
			description:
				'A "CompanyName" tem o prazer de comunicar a todos que estaremos implementando o benefício do Vale Combustível como uma forma de ajuda aos nossos Colaboradores.',
			flag_id: '73f4254d-9fe0-4b82-a40b-55afe229a165',
			avatar: '1745262406296-midfirstnew.jpg',
		},
		{
			title: 'Implementação de Home Office 💻',
			description:
				'Visando o bem-estar de nossos colaboradores, a "CompanyName" está implementando a política de Home Office para todos os cargos que permitem essa flexibilidade. A partir de agora, todos terão a possibilidade de trabalhar remotamente até 3 dias por semana.',
			flag_id: '73f4254d-9fe0-4b82-a40b-55afe229a165',
			avatar: '1745173833767-midsecondnew.jpg',
		},
		{
			title: 'Abertura de Vagas para Estágio 🎓',
			description:
				'Estamos com vagas abertas para o programa de estágio da "CompanyName"! Se você é estudante e está em busca de uma oportunidade de aprender e crescer em um ambiente dinâmico e inovador, não deixe de se inscrever.',
			flag_id: '73f4254d-9fe0-4b82-a40b-55afe229a165',
			avatar: '1745173845956-midthirdnew.jpg',
		},
		{
			title: 'Nova Política de Férias 💼',
			description:
				'A "CompanyName" agora adota uma política de férias flexível, permitindo que os colaboradores escolham o período de descanso conforme sua conveniência. Acreditamos que isso ajudará a melhorar a qualidade de vida e o equilíbrio entre trabalho e lazer.',
			flag_id: '73f4254d-9fe0-4b82-a40b-55afe229a165',
			avatar: '1745173883106-midfourthnew.jpg',
		},
		{
			title: 'Novos Horários para o Escritório 🚀',
			description:
				'A partir do próximo mês, o escritório da "CompanyName" adotará novos horários para atender melhor as necessidades de todos. Agora, estaremos funcionando de segunda a sexta, das 9h às 18h, com uma hora de intervalo para o almoço.',
			flag_id: 'e8dc70bf-0e61-4cbe-ad15-64ce61d219d8',
			avatar: '1745173795196-simpfirstnew.jpg',
		},
		{
			title: 'Benefício de Seguro de Vida para Todos 🔐',
			description:
				'Pensando no bem-estar de nossos colaboradores, a "CompanyName" implementou o benefício de Seguro de Vida, disponível para todos os membros da equipe. A seguradora parceira será a "SeguroPlus", que oferece uma cobertura completa.',
			flag_id: 'e8dc70bf-0e61-4cbe-ad15-64ce61d219d8',
			avatar: '1745173899556-simpsecondnew.jpg',
		},
		{
			title: 'Treinamento de Desenvolvimento de Carreira 🏆',
			description:
				'A "CompanyName" está organizando uma série de treinamentos e workshops para o desenvolvimento de carreira de seus colaboradores. Os treinamentos serão oferecidos de forma contínua, cobrindo temas como liderança, gestão de tempo, comunicação e muito mais.',
			flag_id: 'e8dc70bf-0e61-4cbe-ad15-64ce61d219d8',
			avatar: '1745173910146-simpthirdnew.jpg',
		},
		{
			title: 'Nova Parceria com a "TechCorp" 💡',
			description:
				'É com grande entusiasmo que anunciamos nossa nova parceria com a "TechCorp", uma das líderes no setor de tecnologia. Essa colaboração visa melhorar a infraestrutura tecnológica de nossa empresa e criar soluções inovadoras para nossos clientes.',
			flag_id: 'e8dc70bf-0e61-4cbe-ad15-64ce61d219d8',
			avatar: '1745174515453-simpfourthnew.jpg',
		},
		{
			title: 'Campanha de Doação de Alimentos 🍞',
			description:
				'A "CompanyName" está lançando uma campanha de doação de alimentos para ajudar as comunidades locais. Pedimos a todos que se juntem a nós nessa causa e contribuam com alimentos não perecíveis, que serão destinados a famílias carentes.',
			flag_id: 'e8dc70bf-0e61-4cbe-ad15-64ce61d219d8',
			avatar: '1745174526716-simpfifthnew.jpg',
		},
	]
	await checkingDBToInsertSeeds(news, 'news', 'title')
	console.table('Notícias inseridas com sucesso.')
}

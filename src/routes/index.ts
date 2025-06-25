import type { Server } from 'socket.io'
import humanResourcesPointsRoutes from './human-resources/points/points-routes'
import incidentsRoutes from './incidents/incidents/incidents-routes'
import baseRoute from './intranet-sys/base/base-route'
import departmentsRoutes from './intranet-sys/departments/departments-routes'
import { makeNewsRoutes } from './intranet-sys/news/news-routes'
import notificationsRoutes from './intranet-sys/notifications/notifications-routes'
import usersRoute from './intranet-sys/users/users-routes'

export const makeAppRoutes = (io: Server) => [
	humanResourcesPointsRoutes,
	incidentsRoutes,
	baseRoute,
	departmentsRoutes,
	makeNewsRoutes(io),
	notificationsRoutes,
	usersRoute,
]

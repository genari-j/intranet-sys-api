import type { Server } from 'socket.io'
import humanResourcesPointsRoutes from './human-resources/points/points-routes'
import incidentsRoutes from './incidents/incidents/incidents-routes'
import baseRoute from './intranet-sys/base/base-route'
import { makeNewsRoutes } from './intranet-sys/news/news-routes'
import notificationsRoutes from './intranet-sys/notifications/notifications-routes'
import usersRoute from './intranet-sys/users/users-routes'

export const makeAppRoutes = (io: Server) => [
	humanResourcesPointsRoutes,
	incidentsRoutes,
	baseRoute,
	makeNewsRoutes(io),
	notificationsRoutes,
	usersRoute,
]

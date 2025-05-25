import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const SigninLogsRepository = new Repository('signinLogs')

export default SigninLogsRepository

import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const NewsFlagRepository = new Repository('newsFlag')

export default NewsFlagRepository

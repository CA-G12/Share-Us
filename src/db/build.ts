import { sequelize } from '.'

const build = async () => {
  await sequelize.sync({ force: true })
}

build()

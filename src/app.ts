import { envs } from './config/plugins/envs.plugin'
import { Server } from './presentation/Server'

(async () => {
  main()
})()

function main() {
  // Server.start()

  console.log(envs.PORT)
}

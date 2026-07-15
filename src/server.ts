import { app } from '@/app.js'
import { env } from '@/config/env.config.js'

app.listen(env.PORT, () => {
  console.log(`Running at http://localhost:${env.PORT}`)
})

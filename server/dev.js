import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import { createApp } from './app.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const port = Number(process.env.PORT || 5173)
const app = createApp()
const server = app.listen(port, '127.0.0.1')
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is in use. Close the other development server and try again.` : 'Could not start the development server.')
  process.exit(1)
})
const vite = await createServer({ root, server: { middlewareMode: true, hmr: { server } }, appType: 'spa' })
app.use(vite.middlewares)
console.log(`SANJEEV frontend and API: http://localhost:${port}`)
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    await vite.close()
    server.closeAllConnections()
    server.close(() => process.exit(0))
  })
}
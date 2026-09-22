import express from 'express'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createApp } from './app.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
if (!existsSync(`${dist}/index.html`)) {
  console.error('Build the website first: npm run build')
  process.exit(1)
}
const app = createApp()
app.use(express.static(dist))
const port = Number(process.env.PORT || 4173)
const server = app.listen(port, '127.0.0.1', () => console.log(`SANJEEV preview and API: http://localhost:${port}`))
server.on('error', () => {
  console.error(`Could not start preview on port ${port}. Check whether another server is using it.`)
  process.exit(1)
})
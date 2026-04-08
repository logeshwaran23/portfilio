import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserOrOrgPagesRepo = repoName.toLowerCase().endsWith('.github.io')
const githubPagesBase = isUserOrOrgPagesRepo ? '/' : `/${repoName}/`

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : '/',
})

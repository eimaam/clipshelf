import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    main: {
        build: {
            externalizeDeps: true,
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/electron/main.ts')
                },
                output: {
                    format: 'cjs'
                }
            },
            outDir: 'out/main'
        }
    },
    preload: {
        build: {
            externalizeDeps: true,
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/electron/preload.ts')
                },
                output: {
                    format: 'cjs'
                }
            },
            outDir: 'out/preload'
        }
    },
    renderer: {
        root: '.',
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'index.html')
                }
            },
            outDir: 'out/renderer'
        },
        server: {
            port: 3000,
        },
        plugins: [react()]
    }
})

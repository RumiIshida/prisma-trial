import adapter from '@hono/vite-dev-server/cloudflare';
import honox from 'honox/vite';
import client from 'honox/vite/client';
import { defineConfig } from 'vite';

const baseConfig = {
  ssr: {
    external: ['@prisma/client',],
  },
  build: { commonjsOptions: { transformMixedEsModules: true, exclude: [ 'node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**', ] } },
};

// export default defineConfig({
//   plugins: [honox({ devServer: { adapter } }), build()]
// })

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      ...baseConfig,
      plugins: [client()],
    };
  } else {
    return {
      ...baseConfig,
      plugins: [
        honox({
          devServer: { adapter },
        }),
      ],
    };
  }
});
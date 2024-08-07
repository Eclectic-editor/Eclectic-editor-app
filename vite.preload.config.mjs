import { defineConfig, mergeConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import {
  getBuildConfig,
  external,
  pluginHotRestart,
} from './vite.base.config.mjs';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env;
  const { forgeConfigSelf } = forgeEnv;
  const config = {
    build: {
      outDir: '.vite/build',
      rollupOptions: {
        external,
        input: forgeConfigSelf.entry,
        output: {
          format: 'cjs',
          inlineDynamicImports: true,
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
      },
    },
    plugins: [
      pluginHotRestart('reload'),
      copy({
        targets: [
          { src: 'src/highlight.js', dest: '.vite/build' },
          { src: 'src/utils/styleUtils.js', dest: '.vite/build/utils' },
        ],
        hook: 'writeBundle',
      }),
    ],
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});

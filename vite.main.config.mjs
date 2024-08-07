import { defineConfig, mergeConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import {
  getBuildConfig,
  getBuildDefine,
  external,
  pluginHotRestart,
} from './vite.base.config.mjs';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config = {
    build: {
      outDir: '.vite/build',
      lib: {
        entry: forgeConfigSelf.entry,
        fileName: () => '[name].js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [
      pluginHotRestart('restart'),
      copy({
        targets: [
          { src: 'src/highlight.js', dest: '.vite/build' },
          { src: 'src/utils/styleUtils.js', dest: '.vite/build/utils' },
        ],
        hook: 'writeBundle',
      }),
    ],
    define,
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});

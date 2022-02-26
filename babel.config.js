module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/plugin-syntax-jsx',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-syntax-jsx',
    'jsx',
    'flow',
    'typescript',
  ],
};

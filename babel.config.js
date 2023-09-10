module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@controllers': './src/controllers',
        '@data': './src/data',
        '@models': './src/models',
        '@routes': './src/routes',
        '@services': './src/services',
        '@utils': './src/utils',
        '@validations': './src/validations',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
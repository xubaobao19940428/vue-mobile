module.exports = {
  presets: [
      '@vue/app'
  ],
  plugins: [
      [
          'import',
          {
              libraryName: 'Vant',
              libraryDirectory: 'es',
              style: true
          },
          'vant'
      ]
  ],
  exclude: /node_modules/
}

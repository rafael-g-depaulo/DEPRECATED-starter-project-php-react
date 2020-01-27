// filepaths and folder structure for the project
export const config = {
  js: {
    source: './src',
    main:   'index.js',
    bundle: 'bundle.js',
    fileTypes: ['js'],
    get code() { return this.fileTypes.map(ext => `${this.source}/**/*.${ext}`) },
  },
  css: {
    source: './style',
    main:   'index.scss',
    bundle: 'style.css',  
    fileTypes: ['css', 'scss'],
    get code() { return this.fileTypes.map(ext => `${this.source}/**/*.${ext}`) },
  },
  build: './build',
}

export default config
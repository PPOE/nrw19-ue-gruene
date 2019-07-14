# nrw19-ue-gruene

Tool zum Unterstützungserklärungen ausfüllen

Demo: https://ppoe.github.io/nrw19-ue-gruene/

### Project structure

Vue.js + Bootstrap + pdf-lib

/src/components
 - App.vue, main.js - Gerüst
 - Header.vue, Footer.vue
 - Form.vue - Formularclickstrecke
 - PDFService.vue - UI + Logic zum modifzieren des PDFs mit den ausgefüllten Daten
 - Unterstuetzungserklaerung_NR_mit_Anleitung.pdf - Vorlage

vue.config.js
 - publicPath: Setzt den basepath auf / (für Dev) bzw. /nrw19-ue-gruene/ (für Prod). Muss ggf. angepasst werden, wenn woanders als gh-pages deployed werden soll
 - transpileDependencies: By default babel-loader ignores all files inside node_modules. If you want to explicitly transpile a dependency with Babel, you can list it in this option (polyfills für pdf-lib)
 - chainWebpack: uint8array-loader für *.pdf
 
.browserslistrc
- Browsersupport

### Todos

 - Ggf. das Formular bisschen inteligenter machen (z.B. Bundesland aus PLZ)
 - Unit-Tests

### Project setup
```
npm install

#Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Run your tests
npm run test

# Lints and fixes files
npm run lint

# Run your unit tests
npm run test:unit
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy to github pages
```
./deploy.sh
```
Builds, commit and pushes to gh-pages branch
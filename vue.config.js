const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
})
module.exports = {
  devServer: {
    proxy: {
      "/attributes": {
        target: "http://localhost:8082/",
        secure: false
      }
    }
  }
};
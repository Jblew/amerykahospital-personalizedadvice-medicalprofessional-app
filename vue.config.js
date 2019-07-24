module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: config => {
        return config.target("web");
      },
      builderOptions: {
        appId: "pl.com.ameryka.advicesystem.medicalprofessionalapp",
        productName: "Spersonalizowane porady — panel profesjonalisty — Ameryka Szpital",
        copyright: "Copyright 2019-today by Jędrzej Lewandowski",
      }
    }
  }
}
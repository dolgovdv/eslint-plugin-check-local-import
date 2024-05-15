const {isRelativePath} = require("./checkRelativePath");
const path = require('path')

/**
 * Check path slayers
 */
function checkPathInsideSlice(rootPath, pathCurrentFile, pathImport, layers) {
    if (isRelativePath(pathImport)) return false

    // Разбираем путь импорта
    const arrayPathImport = pathImport.split('/')
    const pathImportLayer = arrayPathImport[0]
    const pathImportSlice = arrayPathImport[1]

    if(!pathImportLayer || !pathImportSlice || !layers[pathImportLayer]) {
        return false;
    }

    // Разбираем путь файла
    const normalizedPathFile = path.toNamespacedPath(pathCurrentFile)
    const projectPartPathFile = normalizedPathFile.split(`${rootPath}\\`)[1]
    const pathFileArray = projectPartPathFile.split('\\')
    const pathFileLayer = pathFileArray[0]
    const pathFileSlice = pathFileArray[1]

    if (!pathFileLayer || !pathFileSlice || !layers[pathFileLayer]) {
        return false
    }

    return pathImportLayer === pathFileLayer && pathImportSlice === pathFileSlice
}
module.exports = {checkPathInsideSlice};
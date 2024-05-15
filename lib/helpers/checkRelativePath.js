const path = require('path')
// import path from 'path'

function isRelativePath(path) {
    // return path.relative(process.cwd(), path) === '/'
    return path === '.' || path.startsWith('./') || path.startsWith('../')
}

// export function shouldBeRelative(pathCurrentFile, pathImport, layers) {
function checkRelativePath(rootPath, pathCurrentFile, pathImport, layers) {
    if (isRelativePath(pathImport)) return false

    // Разбираем путь импорта
    const arrayPathImport = pathImport.split('/')
    const pathImportLayer = arrayPathImport[0]

    if (!pathImport || !layers[pathImportLayer]) {
        return false
    }

    // Разбираем путь файла
    const normalizedPathFile = path.toNamespacedPath(pathCurrentFile)
    const projectPartPathFile = normalizedPathFile.split(`${rootPath}\\`)[1]
    const pathFileArray = projectPartPathFile.split('\\')
    const pathFileLayer = pathFileArray[0]
    if (!pathFileLayer || !layers[pathFileLayer]) {
        return false
    }

    return pathImportLayer === pathFileLayer
}

module.exports = {checkRelativePath, isRelativePath}
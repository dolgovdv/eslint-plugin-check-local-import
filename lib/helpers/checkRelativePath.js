const path = require('path')
// import path from 'path'

function isRelativePath(path) {
    // return path.relative(process.cwd(), path) === '/'
    return path === '.' || path.startsWith('./')
}

// export function shouldBeRelative(pathCurrentFile, pathImport, layers) {
function checkRelativePath(pathCurrentFile, pathImport, layers) {
    if (isRelativePath(pathImport)) return false

    // Разбираем путь импорта
    const arrayPathImport = pathImport.split('/')
    const pathImportLayer = arrayPathImport[0]

    if (!pathImport || !layers[pathImport]) {
        return false
    }

    // Разбираем путь файла
    const normalizedPathFile = path.toNamespacedPath(pathCurrentFile)
    const projectPartPathFile = normalizedPathFile.split('assets\\')[1]
    const pathFileArray = projectPartPathFile.split('\\')
    const pathFileLayer = pathFileArray[0]
    if (!pathFileLayer || !layers[pathFileLayer]) {
        return false
    }

    return pathImportLayer === pathFileLayer
}

module.exports = {checkRelativePath}
import FileOps from './fileops'

module.exports = {
  cleanupOutput: (path) => {
    let markdowns = FileOps.walkFiles(path)
    markdowns.forEach(name => FileOps.remove(`${path}/${name}`))
    console.log("** Cleaned output markdown folder")
  }
}

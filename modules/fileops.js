let fs = require ('fs')
let nl = require('os').EOL;

var self = module.exports  = {
  walkFiles: (path='', pattern=null) => {
    try {
        var fl = fs.readdirSync(path)
				if (pattern) {
					var fo = fl.filter((e) => e.includes(pattern))
					return fo
				}
				else {
					return fl
				}
    }
    catch(e)
    {
      console.log(`Error reading input directory, path: ${path}, ${e}`)
			throw e
    }
  },

  loadFile: (path='') => {
    try {
        return fs.readFileSync(path, 'utf8').toString().split(nl)
    }
    catch(e)
    {
      console.log(`Error loading the input file, path: ${path}, ${e}`)
			throw e
    }
  },
	loadJson: (path='') => {
		try {
				return fs.readFileSync(path, 'utf8').toString()
		}
		catch(e)
		{
			console.log(`Error loading the input JSON file, path: ${path}, ${e}`)
			throw e
		}
	},

  writeFile:(lines=[], path='') => {
    path = path.replace(/'/g,'').toLowerCase()
    try {
        fs.writeFileSync(path, lines.join(nl))
    }
    catch(e)
    {
      console.log(`Error loading the input file, path: ${path}, ${e}`)
	  throw e
    }
  },

  writeObject: (o={}, path='') => {
    try {
        fs.writeFileSync(path, JSON.stringify(o, null, 2))
    }
    catch(e)
    {
      console.log(`Error loading the input file with string input, path: ${path}, ${e}`)
			throw e
    }
  },
  createFolder: (path='') => {
    try {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
    catch(e)
    {
      console.log(`Error creating folder, path: ${path}`)
			throw e
    }
  },

removeFolderRec: (path='') => {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach((file,index) => {
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                self.removeFolderRec(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
},
  remove: (path='') => {
    try {
        fs.unlinkSync(path)
    }
    catch(e)
    {
      console.log(`Error removing the output file, path: ${path}, ${e}`)
			throw e
    }
  }
}

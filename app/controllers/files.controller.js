exports.upload = async(req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: 400,
                message: 'File must be included'
            });
        } else {
            let file = req.files.file
            const path = `./app/files/${file.name}`

            file.mv(path);

            res.send({
                status: 200,
                message: 'upload success',
                path,
            })
        }
    } catch (err) {
        res.send({
            status: 'failure',
            message: 'upload failed',
            err
        });
    }
};

exports.getFiles = (req, res) => {
    try {
        const fs = require('fs');

        fs.readdir('./app/files', (err, files) => {
            const fileNames = []
            files.forEach(file => {
                console.log(file)
                fileNames.push(file)
            });

            res.send({
                status: 200,
                data: fileNames
            });
        });        
        
    } catch (err) {
        res.send({
            status: 500,
            message: 'error finding files',
            err
        });
    }
};

exports.downloadFile = (req, res) => {
    try {
        const fileName = req.params.fileName;

        res.download(`./app/files/${fileName}`)
    } catch (err) {
        res.send({
            status: 500,
            message: 'download failed',
            err
        });
    }
}
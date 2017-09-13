const fs = require('fs')
const path = require('path')

exports.signinRequired = (req, res, next) => {
    let _user = req.session.user

    if (!_user) {
        console.log('not signin')
        return res.redirect('/signin')
    }
    next()
}

exports.adminRequired = (req, res, next) => {
    let _user = req.session.user
    console.log(_user.role)
    if (_user.role <= 10) {
        console.log('no role')
        return res.redirect('/signin')
    }
    next()
}

exports.savePoster = (req, res, next) => {
    // 读取上传文件信息,这要配合connect-multiparty中间件使用
    let posterData = req.files.uploadPoster
    let filePath = posterData.path
    let originalFilename = posterData.originalFilename

    if (originalFilename) {
        fs.readFile(filePath, (err, data) => {
            let timestamp = Date.now()
            let type = posterData.type.split('/')[1]
            let poster = `${timestamp}.${type}`
            let newPath = path.join(__dirname, '../', `/public/upload/${poster}`)

            fs.writeFile(newPath, data, (err) => {
                req.poster = poster
                next()
            })
        })
    } else {
        next()
    }
}
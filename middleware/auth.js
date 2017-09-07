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
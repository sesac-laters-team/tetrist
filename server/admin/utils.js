// 관리자 권한 확인
function checkAdmin(req, res, next) {
    if (req.session.admin) {
        // 관리자
        next();
    } else {
        // 일반 유저
        res.render("adminLogin", { fromNoAuth: true });
    }
}

module.exports = { checkAdmin };

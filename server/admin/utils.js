// 관리자 권한 확인
function checkAdmin(req, res, next) {
    if (req.session.admin) {
        // 관리자
        next();
    } else {
        // 일반 유저
        res.status(403).send(`<script>
        alert('권한이 없습니다.')
        document.location.href = "http://52.78.163.112/login";
        </script>`);
    }
}

module.exports = { checkAdmin };

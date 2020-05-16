$(function () {
    $(".login_form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            // url: 'http://localhost:8080/api/v1/admin/user/login',
            url: BigNew.user_login,
            data: $(this).serialize(),
            beforeSend: function () {
                var flag = false
                $('.login_form input[name]').each(function (index, ele) {
                    if ($.trim($(ele).val()) == '') {
                        flag = true
                    }
                })
                if (flag) {
                    $('#myModal').modal('show')
                    $('#myModal .modal-body').text('账号和密码不能为空')
                    // alert('账号和密码不能为空')
                    return false
                }
            },
            success: function (res) {
                $('#myModal').modal('show')
                $('#myModal .modal-body').text(res.msg)
                if (res.code == 200) {
                    window.localStorage.setItem("token", res.token);
                    $("#myModal").on("hidden.bs.modal", function (e) {
                        window.location.href = "./index.html";
                    });

                }
            }
        })
    })
})

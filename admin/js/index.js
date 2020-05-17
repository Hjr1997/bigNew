$(function () {
    $.ajax({
        type: 'get',
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url: BigNew.user_info,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                $('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
                $('.sider .user_info img').attr('src', res.data.userPic)
                $('.header_bar .user_center_link img').attr('src', res.data.userPic)
            }
        }
    })
    $('.logout').on('click', function () {
        // $(this).attr('href', '../login.html')
        window.location.href = './login.html'
        window.localStorage.removeItem('token')
    })
    $('.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).index() == 1) {
            $('.level02').slideToggle()
            $('.level02 li:eq(0)').trigger('click')
            $(this).find("b").toggleClass("rotate0");

        }
        $('.level02 li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
    })

})
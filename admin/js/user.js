$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                for (var key in res.data) {
                    $('#form .' + key).val(res.data[key])
                }
                // $('#form .username').val(res.data.name)
                // $('#form .nickname').val(res.data.nickname)
                // $('#form .email').val(res.data.email)
                $('#form .user_pic').attr('src', res.data.userPic)
                // $('#form .password').val(res.data.password)
            }

        }
    })
    $('#exampleInputFile').on('change', function () {
        console.dir(this)
        var file = this.files[0]
        var url = URL.createObjectURL(file)
        $('.user_pic').attr('src', url)
    })
    $('#form').on('submit', function (e) {
        e.preventDefault()
        var data = new FormData(this)
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {

                if (res.code == 200) {
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_detail,
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                parent.$('.sider .user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
                                parent.$('.sider .user_info img').attr('src', res.data.userPic)
                                parent.$('.header_bar .user_center_link img').attr('src', res.data.userPic)
                            }
                        }
                    })
                }


            }
        })

    })
})
$(function () {
    BigNewAjax(1, pagination)
    function BigNewAjax(myPage, checked) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: myPage,
                perpage: 7
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    var htmlStr = template('item', { list: res.data.data })
                    $('tbody').html(htmlStr)
                    if (res.totalCount == 0 && myPage == 1) {
                        $('#pagination').hide().next().show()

                    } else if (res.totalCount != 0 && checked != null) {
                        $('#pagination').show().next().hide()
                        checked(res)
                    } else if (res.totalCount != 0 && res.data.data.length == 0) {
                        BigPage -= 1
                        $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, BigPage)
                    }


                }
            }
        })
    }
    var BigPage = 1
    function pagination(res, visiblePages) {
        $('#pagination').twbsPagination({
            totalPages: res.data.totalPage, // 总页数
            visiblePages: visiblePages || 7, // 可见最大上限页码值
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false, // 不要默认点击 
            onPageClick: function (event, page) {
                //  console.log(event,page);
                // page是当前页码
                // window.BigPage = page
                BigPage = page
                BigNewAjax(page, null)

            }
        })
    }
    // 删除按钮
    $('tbody').on('click', '.btn-delete', function () {
        id = $(this).data('id')
        console.log(id)
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    BigNewAjax(BigPage, null)
                }
            }
        })
    })
    // 拒绝按钮
    $('tbody').on('click', '.btn-reject', function () {
        id = $(this).data('id')
        var temp = $(this)
        console.log(id)
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    temp.parent().prev().text(res.msg)
                    var temps = temp.parent().prev().text()
                    if (res.msg == temps) {
                        temp.remove()
                    }
                }
            }
        })
    })
    // 批准按钮
    $('tbody').on('click', '.btn-pass', function () {
        id = $(this).data('id')
        var temp = $(this)
        console.log(id)
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    temp.parent().prev().text(res.msg)
                    var temps = temp.parent().prev().text()
                    if (res.msg == temps) {
                        temp.parent().parent().removeClass("danger")
                        temp.remove()
                    }
                }
            }
        })
    })
})
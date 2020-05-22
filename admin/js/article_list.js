$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStrs = template('items', res)
                console.log(res.data)
                $('#selCategory').html(htmlStrs)
            }
        }

    })
    getDataByParams(1, pagination)
    function getDataByParams(myPage, checked) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#keys').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: myPage,
                perpage: 6,
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    var htmlStr = template('item', { list: res.data.data })
                    console.log(res.data)
                    $('tbody').html(htmlStr)
                    if (res.data.totalPage == 0 && myPage == 1) {
                        $('#pagination-demo').hide().next().show()
                    } else if (res.data.totalPage != 0 && checked != null) {
                        $('#pagination-demo').show().next().hide()
                        checked(res)
                    } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                        BigPage -= 1
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, BigPage)
                    }

                    // $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
                }
            }
        })
    }
    $('.btn-sm').on('click', function (e) {
        e.preventDefault()
        getDataByParams(1, function (res) {
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        })

    })
    var BigPage = 1
    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
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
                BigPage = page
                getDataByParams(page, null)
            }
        })
    }
    $('#delModal').on('show.bs.modal', function (e) {
        window.id = $(e.relatedTarget).data('id')
        console.log(id);
    })
    $('.btn-sure').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: id
            },
            success: function (res) {
                // if ()
                console.log(res)
                if (res.code == 204) {
                    $('#delModal').modal('hide')
                    getDataByParams(BigPage, null)
                }

            }
        })
    })
    $('#release_btn').on('click', function () {
        parent.$('.level02 li').eq(1).click()
    })
})
// $(function () {
//     // 先将所有分类渲染

//     $.ajax({
//         type: 'get',
//         url: BigNew.category_list,
//         success: function (res) {
//             console.log(res)
//             if (res.code == 200) {
//                 var htmlStrs = template('items', res)
//                 console.log(res.data)
//                 $('#selCategory').html(htmlStrs)
//             }
//         }

//     })
//     // 将所有文章渲染
//     $.ajax({
//         type: "get",
//         url: BigNew.article_query,
//         data: {
//             key: $('#keys').val(),
//             type: $('#selCategory').val(),
//             state: $('#selStatus').val(),
//             page: 1,
//             perpage: 7
//         },
//         success: function (res) {
//             console.log(res)
//             if (res.code == 200) {
//                 var htmlStr = template('item', { list: res.data.data })
//                 $('tbody').html(htmlStr)
//                 if (res.data.totalPage == 0) {
//                     $('#pagination-demo').hide().next().show()
//                 } else {
//                     $('#pagination-demo').show().next().hide()
//                     pagination(res)
//                 }
//                 // 刚开始调用分页按钮

//             }

//         }
//     })
//     // 给筛选按钮注册事件
//     $('#btnSearch').on('click', function (e) {
//         e.preventDefault()
//         $.ajax({
//             type: "get",
//             url: BigNew.article_query,
//             data: {
//                 key: $('#keys').val(),
//                 type: $('#selCategory').val(),
//                 state: $('#selStatus').val(),
//                 page: 1,
//                 perpage: 7
//             },
//             success: function (res) {
//                 if (res.code == 200) {
//                     var htmlStr = template('item', { list: res.data.data })
//                     $('tbody').html(htmlStr)
//                     // 筛选过后让按钮先销毁再再重新根据筛选结果显示页数
//                     if (res.data.totalPage == 0) {
//                         $('#pagination-demo').hide().next().show()
//                     } else {
//                         $('#pagination-demo').show().next().hide()
//                         // pagination(res)
//                         $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
//                     }

//                 }

//             }
//         })
//     })
//     // 分页按钮
//     function pagination(res, visiblePages) {
//         $('#pagination-demo').twbsPagination({
//             totalPages: res.data.totalPage, // 总页数
//             visiblePages: visiblePages || 7, // 可见最大上限页码值
//             first: '首页',
//             last: '最后一页',
//             next: '下一页',
//             prev: '上一页',
//             initiateStartPageClick: false, // 不要默认点击 
//             onPageClick: function (event, page) {
//                 //  console.log(event,page);
//                 // page是当前页码
//                 window.BigPage = page
//                 $.ajax({
//                     type: "get",
//                     url: BigNew.article_query,
//                     data: {
//                         key: $('#keys').val(),
//                         type: $('#selCategory').val(),
//                         state: $('#selStatus').val(),
//                         page: page,
//                         perpage: 7
//                     },
//                     success: function (res) {
//                         if (res.code == 200) {
//                             var htmlStr = template('item', { list: res.data.data })
//                             $('tbody').html(htmlStr)

//                         }

//                         // 刚开始调用分页按钮
//                         // pagination(res, visiblePages)
//                     }
//                 })
//             }
//         })
//     }
//     // 调用模态框获取当前单击事件的id
//     $('#delModal').on('show.bs.modal', function (e) {
//         window.id = $(e.relatedTarget).data('id')
//         console.log(id);
//     })
//     // 点击删除按钮让模态框隐藏并再次刷新页面
//     $('.btn-sure').on('click', function () {
//         $.ajax({
//             type: 'post',
//             url: BigNew.article_delete,
//             data: {
//                 id: id
//             },
//             success: function (res) {
//                 $('#delModal').modal('hide')
//                 $.ajax({
//                     type: "get",
//                     url: BigNew.article_query,
//                     data: {
//                         key: $('#keys').val(),
//                         type: $('#selCategory').val(),
//                         state: $('#selStatus').val(),
//                         page: BigPage,
//                         perpage: 7
//                     },
//                     success: function (res) {
//                         if (res.code == 200) {
//                             var htmlStr = template('item', { list: res.data.data })
//                             $('tbody').html(htmlStr)
//                             if (res.data.totalPage != 0 && res.data.data.length == 0) {
//                                 BigPage -= 1
//                                 $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, BigPage)
//                                 if (res.data.totalPage == 0) {
//                                     $('#pagination-demo').hide().next().show()
//                                 } else {
//                                     $('#pagination-demo').show().next().hide()

//                                 }
//                             }
//                         }

//                         // 刚开始调用分页按钮
//                         // pagination(res, visiblePages)

//                     }
//                 })
//             }
//         })
//     })
//     $('#release_btn').on('click', function () {
//         parent.$('.level02 li').eq(1).click()
//     })
// })
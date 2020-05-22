$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('item', { list: res.data })
                $('tbody').html(htmlStr)

                window.res = res.data
                console.log(window.res)

            }
        }

    })
    $('.btn-success').on('click', function () {
        $('.addModal').modal('show')
        $('.modal-title').text('添加文章')
        $('#myForm')[0].reset()
    })
    $('tbody').on('click', '.btn-add', function () {
        $('.addModal').modal('show')
        $('.modal-title').text('编辑文章')
        console.log($(this).data('index'))
        var index = $(this).data('index')
        var list = res[index]
        console.log(list)
        $('#myForm input[name=id]').val(list.id)

        $('#myForm input[name=name]').val(list.name)
        $('#myForm input[name=slug]').val(list.slug)
        // $.ajax({
        //     type: 'get',

        // })

    })
    $('tbody').on('click', '.btn-del', function () {
        $('.delModal').modal('show')
        window.id = $(this).data('id')
    })
    $('.btn-dels').on('click', function () {
        var id = window.id
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 204) {
                    $.ajax({
                        type: 'get',
                        url: BigNew.category_list,
                        success: function (res) {
                            console.log(res)
                            if (res.code == 200) {
                                var htmlStr = template('item', { list: res.data })
                                $('tbody').html(htmlStr)

                                window.res = res.data
                                console.log(window.res)
                                $('.delModal').modal('hide')

                            }
                        }

                    })
                }
            }
        })
    })
    $('.addModal .btn-sure').on('click', function () {
        var id = $('#myForm input[name=id]').val()
        $.ajax({
            type: 'post',
            url: id ? BigNew.category_edit : BigNew.category_add,
            data: $('#myForm').serialize(),
            // beforeSend: function () {

            //     var name = $('#myForm input[name=name]').val()
            //     var slug = $('#myForm input[name=slug]').val()
            //     if ($.trim(name) == '' || $.trim(slug) == '') {
            //         alert('内容不能为空')
            //         return false
            //     }

            // },
            success: function (res) {
                console.log(res)
                if (res.code == 200 || res.code == 201) {
                    $.ajax({
                        type: 'get',
                        url: BigNew.category_list,
                        success: function (res) {
                            console.log(res)
                            if (res.code == 200) {
                                var htmlStr = template('item', { list: res.data })
                                $('tbody').html(htmlStr)
                            }
                        }
                    })

                    $('.modal').modal('hide')
                }



            }

        })
    })
})
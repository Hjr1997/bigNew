$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('item', { list: res.data })
                $('tbody').html(htmlStr)
            }
        }

    })
    $('.btn-success').on('click', function () {
        $('.modal').modal('show')
    })
})
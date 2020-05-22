$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('item', res)
                $('.level_two').html(' <li class="up"></li>' + htmlStr)
                $('.left_menu').html(htmlStr)
            }
        }
    })
    $.ajax({
        type: 'get',
        url: BigNew.hotPic_news,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('items', res)
                $('.focus_list').html(htmlStr)
            }
        }
    })
    $.ajax({
        type: 'get',
        url: BigNew.latest_news,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('itemss', res)
                $('.common_news').html(htmlStr)
            }
        }
    })
    $.ajax({
        type: 'get',
        url: BigNew.hotrank_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('itemsss', res)
                $('.hotrank_list').html(htmlStr)

            }
        }
    })
    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('itemssss', res)
                $('.comment_list').html(htmlStr)

            }
        }
    })
    $.ajax({
        type: 'get',
        url: BigNew.attention_news,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('itemsssss', res)
                $('.guanzhu_list').html(htmlStr)

            }
        }
    })
    $('.search_btn').on('click', function () {
        var txtValue = $('.search_txt').val()
        if (!txtValue.trim()) {
            alert('搜索内容不能为空')
            return
        }
        window.location.href = './list.html?seach=' + txtValue
        $('.search_txt').val('')
    })
})
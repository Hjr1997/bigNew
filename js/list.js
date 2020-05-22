$(function () {
    var str = location.search
    if (!str) {
        window.location.href = './index.html'
    }

    var obj = utils.convertToObj(str.slice(1))
    var data;
    if (obj.id) {
        data = { type: obj.id }
    } else {
        data = { key: decodeURI(obj.seach) }
    }
    $.ajax({
        type: 'get',
        url: BigNew.artilce_list,
        data: data,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                // console.log(res.data.data[0].category)
                if (res.data.data.length == 0) {
                    $('.list_title h3').text('没有数据')
                } else {
                    if (obj.id) {
                        $('.list_title h3').text(res.data.data[0].category)

                    } else {
                        $('.list_title h3').text(decodeURI(obj.seach))
                    }
                    var htmlStr = template('item', { list: res.data.data })
                    $('.box').html(htmlStr)
                }
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
                $('.content_list').html(htmlStr)

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
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStr = template('item1', res)
                $('.level_two').html(' <li class="up"></li>' + htmlStr)
                $('.left_menu').html(htmlStr)
            }
        }
    })

})
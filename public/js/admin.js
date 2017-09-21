$(function() {
    $('.del').click(function(e) {
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
                type: 'DELETE',
                url: '/admin/movie/list?id=' + id
            })
            .done(function(results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove()
                    }
                }
            })
    })
    var bb;
    // 输入对应豆瓣电影id，获取电影信息
    $("#douban").blur(function(e) {
        var id = $(this).val()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/subject/' + id,
            cache: true,
            crossDomain: true,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data) {
                $('#inputTitle').val(data.title)
                $('#inputDoctor').val(data.directors[0].name)
                $('#inputYear').val(data.year)
                $('#inputCountry').val(data.countries)
                $('#inputPoster').val(data.images.large)
                $('#inputSummary').val(data.summary)
            }
        })
    })
})
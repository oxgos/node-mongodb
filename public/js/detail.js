$(function() {
    $('.comment').click(function(e) {
        let target = $(this)
        let toId = target.data('tid')
        let commentId = target.data('cid')

        if ($('toId').length > 0) {
            $('toId').val(toId)
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm')
        }

        if ($('commentId').length > 0) {
            $('commentId').val(commentId)
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm')
        }
    })
})
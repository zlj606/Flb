$(function(){
	$("#page").pagination({
        displayedPages: 10,
        edges: 1,
        items: 200,
        itemsOnPage: 10,
        onPageClick: function(pageNum, events) {
            //alert(pageNum + events);
            //$('.test>label').text('Current Page Number:' + pageNum);
        },
        onInit: function() {
            //$('.test>label').text('Current Page Number:' + 1);
        }
    });
});
var keepScroll = (h) => {
    var root = document.documentElement;
    var maxH = root.scrollHeight - root.clientHeight;
    var bd = document.body;
    window.scrollTo(0, bd.scrollTop + (h||400) );
    if( bd.scrollTop < maxH ) {
        setTimeout(keepScroll, 300);
    } else {
        // setTimeout(function, 300);
        setTimeout(function () {
        	window.scrollTo(0, 0);
        }, 1000);
    }
}
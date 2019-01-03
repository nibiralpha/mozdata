setTimeout(function () {
    var infos = [];
    var count = $('.mozbar-serp-item-wGA7MhRhQ3WS');

    if (count.length < 1) {
        return;
    }

    var hasMore = false;
    var q = $("input[name*='q']").val();
    var vol = $("#xt-info").html();

    if (vol !== undefined) {
        vol = vol.split("/");
        vol = vol[0].replace(/[^0-9]/g, '');
    }

    console.log($(".JolIg").html());


    if ($(".JolIg").html() == "People also ask") {
        hasMore = true;
    }   

    var schema = {
        dataInfo: {
            keyword: q,
            vol: vol,
            hasMore: hasMore,
            data: [

            ]
        },
        keyInfo: {
            id: 0
        }
    }

    var stack = [];

    for (let i = 0; i < count.length; i++) {
        var a = $('.mozbar-serp-item-wGA7MhRhQ3WS')[i].contentWindow.document;
        var b = $('.mozbar-serp-item-wGA7MhRhQ3WS')[i];
        var link = $(b).prev().prev().prev().find("a").attr('href');

        var pa = $(a).find('.title:nth-child(2)').html();
        pa = pa.replace(/[^0-9]/g, '');
        var da = $(a).find('.title:nth-child(1)').html();
        da = da.replace(/[^0-9]/g, '')
        var counts = $(a).find('.mozbar-css-wGA7MhRhQ3WS p.line').html();
        counts = counts.replace(/[^0-9]/g, '');
        // var link = $(a).find('.mozbar-css-wGA7MhRhQ3WS a').html();

        schema.dataInfo.data.push({
            pa: pa,
            da: da,
            count: counts,
            link: link
        });
    }

    var widget = $("#xt-related-search");
    var keywords = $(widget).find("tbody tr").each(function () {
        if ($(this).find("td:eq(1)").length > 0) {
            var keyWord = $(this).find("td:eq(1)").html().split("<")[0];

            var keyVol = $(this).find("td:eq(2)").html().replace(/[^0-9]/g, '');
            if(keyVol > 999){
                stack.push({ keyword: keyWord, number: 0, vol: keyVol, c: false });    
            }
            
        }
    });

    var similerSrch = $("#xt-google-people-search");
    var similerKeywords = $(similerSrch).find("tbody tr").each(function () {
        if ($(this).find("td:eq(1)").length > 0) {
            var similerKeyWord = $(this).find("td:eq(1)").html().split("<")[0];
            var similerKeyWordVol = $(this).find("td:eq(2)").html().replace(/[^0-9]/g, '');
            if(similerKeyWordVol > 999){
                stack.push({ keyword: similerKeyWord, number: 0, vol: similerKeyWordVol, c: false });
            }
        }
    });

    // console.log(stack);

    $.post("http://127.0.0.1:3000/keyword",
        {
            keywords: stack
        },
        function (data, status) {

        });

    $.post("http://127.0.0.1:3000/app",
        {
            resources: schema
        },
        function (data, status) {
            window.close();
        });

}, 5000);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        window.postMessage({ id: 123 }, 'http://localhost');
    }
);



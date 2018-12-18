$(function () {
    $('#name').keyup(function () {
        chrome.tabs.query({ index: 0 }, function (tabs) {
            console.log(tabs);

            chrome.tabs.sendMessage(tabs[0].id, { task: "tabClosed" }, function (response) {
                console.log(response);
            });
        });
    });
});

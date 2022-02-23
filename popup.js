let button = document.getElementById("button");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let buttonAction = inProfile(tab.url) ? handleProfileClick : handleTimelineClick;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: buttonAction,
    });
});

function inProfile(url) {
    return url.match(/.*\..*\/@.*/);
}

function handleProfileClick() {
    let retoots = document.getElementsByClassName("entry h-cite entry-reblog");
    for (r of retoots) {
        let style = r.style.display;
        r.style.display = style == "none" ? "block" : "none";
    };
}

function handleTimelineClick() {
    let retoots = document.getElementsByClassName("status__prepend");
    for (r of retoots) {
        // Due to autoreload and the way retoot is implemented on timeline
        // there's no direct way to query for the root element
        // thus querying the lowest common ancestor (yes I just said that) of the components
        // If you query the root element <article>
        // hiding it will result element structure change and will not be able to re show it
        let node = r.parentNode.parentNode;
        let style = node.style.display;
        node.style.display = style == "none" ? "block" : "none";
    };
}

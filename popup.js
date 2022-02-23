let button = document.getElementById("button");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let buttonAction = inProfile(tab.url) ? handleClick : showTips;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: buttonAction,
    });
});

function inProfile(url) {
    return url.match(/.*\..*\/@.*/);
}

function handleClick() {
    let retoots = document.getElementsByClassName("entry h-cite entry-reblog");
    for (r of retoots) {
        let style = r.style.display;
        r.style.display = style == "none" ? "block" : "none";
    };
}

function showTips() {
    alert("Click on the avatar of the user to go to their profile page on their instance.");
}

var modal = document.getElementById("create-feed-modal");
function toggleModal()
{
    var backdrop = document.getElementById("modal-backdrop");
    //backdrop.classList.toggle("hidden");
    modal.classList.toggle("hidden");
     
}

var createBtn = document.getElementById("create-feed-button");
createBtn.addEventListener("click", function (event) {
    toggleModal();
})

modal.addEventListener("click", function (event) {
    var feedUrl = event.currentTarget.querySelector("#feed-name-input").value;

    if (event.target.classList.contains("modal-accept-button")) {
        if (feedUrl) {
            toggleModal();
            var request = new XMLHttpRequest();
            var url = window.location.pathname + '/addFeed';
            console.log(url);
            request.open("POST", url);
            console.log(feedUrl);
            var reqBody = JSON.stringify({
                feedURL : feedUrl
            });
            
            request.addEventListener('load', function (event) {
                if (event.target.status === 200) {
                    location.reload();
                    feedUrl = "";
                } else {
                    alert("Error adding feed: " + event.target.response);
                }
            });

            request.setRequestHeader("Content-Type", "application/json");
            request.send(reqBody);
        } else {
            alert("URL is empty!");
        }
    } else if (event.target.classList.contains("modal-close-button") ||
                event.target.classList.contains("modal-cancel-button")) {
        event.currentTarget.querySelector("#feed-name-input").value = "";
        toggleModal();
    }
})

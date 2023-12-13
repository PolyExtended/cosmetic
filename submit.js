    // Add event listener for Enter key press
    document.getElementById("searchInput").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchCosmetics();
        }
    });

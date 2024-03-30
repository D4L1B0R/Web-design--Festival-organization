function openModal() {
    document.getElementById('videoModal').style.display = 'block';
}
function closeModal() {
    document.getElementById('videoModal').style.display = 'none';
}
document.getElementById("submitButton").addEventListener("click", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
});
  // Function to show the pop-up
function showPopup() {
    $("#signup-popup").fadeIn();
    $("#overlay").fadeIn();
}

// Function to hide the pop-up
function hidePopup() {
    $("#signup-popup").fadeOut();
    $("#overlay").fadeOut();
}

// Event listener for the sign-up link
$("#signup-link").click(function (event) {
    event.preventDefault();
    showPopup();
});

// Event listener for the overlay (to close the pop-up when clicking outside of it)
$("#overlay").click(function () {
    hidePopup();
});
function showPopup() {
    $("#signup-popup-2").fadeIn();
    $("#overlay").fadeIn();
}

// Function to hide the pop-up
function hidePopup() {
    $("#signup-popup-2").fadeOut();
    $("#overlay").fadeOut();
}

// Event listener for the sign-up link
$("#signup-link-2").click(function (event) {
    event.preventDefault();
    showPopup();
});
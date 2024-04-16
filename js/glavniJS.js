//pokretanje funkcije za učitavanje video snimka
function openModal() {
    document.getElementById('videoModal').style.display = 'block';
}
function closeModal() {
    document.getElementById('videoModal').style.display = 'none';
}
document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault();
});
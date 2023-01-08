
/**
 * Shows custom message on web page.
 * @param {string} message 
 * @param {string} placeInElement id of element to place message in.
 * @param {string} [bsMessageType] Bootstrap alert message type (optional).
 */

export function showMessage(message, placeInElement, bsMessageType = "alert-light") {
    const alertDiv = document.createElement("div");
    alertDiv.setAttribute("role", "alert");
    alertDiv.classList.add("alert", bsMessageType, "mt-3", "mb-3");
    alertDiv.innerHTML = message;
    const container = document.getElementById(placeInElement);
    container.insertAdjacentElement("afterbegin", alertDiv);
}
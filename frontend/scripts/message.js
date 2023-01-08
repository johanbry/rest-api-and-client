
/**
 * Shows custom message on web page.
 * @param {string} message 
 * @param {string} [bsMessageType] Bootstrap alert message type.
 */

export function showMessage(message, bsMessageType) {
    const alertDiv = document.createElement("div");
    alertDiv.setAttribute("role", "alert");
    alertDiv.classList.add("alert", bsMessageType || "alert-light", "mt-3", "mb-2");
    alertDiv.innerHTML = message;

    document.querySelector("main").appendChild(alertDiv);
}
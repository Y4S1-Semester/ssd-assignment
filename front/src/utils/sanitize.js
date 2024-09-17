import DOMPurify from "dompurify";

// Sanitize HTML content
const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html);
};

// Sanitize HTML and extract text content
const getTextFromHTML = (html) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    const doc = new DOMParser().parseFromString(sanitizedHtml, "text/html");
    return doc.body.textContent || "";
};

// Validate and sanitize image URLs
const sanitizeURL = (url) => {
    const sanitizedUrl = DOMPurify.sanitize(url);

    // Only allow URLs with http/https or relative paths
    const isValidUrl = sanitizedUrl.startsWith("http://") ||
        sanitizedUrl.startsWith("https://") ||
        sanitizedUrl.startsWith("../upload/");

    return isValidUrl ? sanitizedUrl : ""; // Return empty string if invalid
};

export { sanitizeHTML, getTextFromHTML, sanitizeURL };

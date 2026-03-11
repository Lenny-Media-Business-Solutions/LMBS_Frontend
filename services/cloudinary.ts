/**
 * Optimizes a Cloudinary URL by adding q_auto and f_auto parameters.
 * 
 * Cloudinary URLs typically look like:
 * https://res.cloudinary.com/cloud_name/image/upload/v1234567890/sample.jpg
 * 
 * After optimization:
 * https://res.cloudinary.com/cloud_name/image/upload/q_auto,f_auto/v1234567890/sample.jpg
 */
export const optimizeCloudinaryUrl = (url: string): string => {
    if (!url || typeof url !== 'string') return url;

    // Check if it's a Cloudinary URL
    if (!url.includes('cloudinary.com')) return url;

    // If it already has optimization parameters, return as is
    if (url.includes('q_auto') || url.includes('f_auto')) return url;

    // Regex to find the 'upload/' or 'video/upload/' part and insert parameters after it
    // We handle both images and videos
    const regex = /(\/(?:image|video|raw)\/upload\/)/;
    const match = url.match(regex);

    if (match) {
        return url.replace(regex, `$1q_auto,f_auto/`);
    }

    return url;
};

/**
 * Validate the UTM form data
 * @param {Object} formData The form data to validate
 * @returns {Object} An object with validation errors, if any
 */
export const validateForm = (formData) => {
  const errors = {};
  
  // Validate Website URL
  if (!formData.websiteUrl) {
    errors.websiteUrl = 'Website URL is required';
  } else if (!isValidUrl(formData.websiteUrl)) {
    errors.websiteUrl = 'Please enter a valid URL (e.g., https://www.example.com)';
  }
  
  // Validate Campaign Source
  if (!formData.campaignSource) {
    errors.campaignSource = 'Campaign Source is required';
  }
  
  // Validate Campaign Medium
  if (!formData.campaignMedium) {
    errors.campaignMedium = 'Campaign Medium is required';
  }
  
  // Validate that either Campaign Name or Campaign ID is provided
  if (!formData.campaignName && !formData.campaignId) {
    errors.campaignNameOrId = 'Either Campaign Name or Campaign ID must be provided';
  }
  
  // Additional parameter validations (spaces, special characters)
  if (formData.campaignName && formData.campaignName.includes(' ')) {
    errors.campaignName = 'Campaign Name should not contain spaces. Use underscores or hyphens instead.';
  }
  
  if (formData.campaignTerm && formData.campaignTerm.includes(' ')) {
    errors.campaignTerm = 'Campaign Term should not contain spaces. Use plus signs (+) or hyphens instead.';
  }
  
  return errors;
};

/**
 * Check if a string is a valid URL
 * @param {string} url The URL string to validate
 * @returns {boolean} Boolean indicating if URL is valid
 */
export const isValidUrl = (url) => {
  try {
    // If the URL doesn't start with http:// or https://, add https://
    const urlString = url.match(/^https?:\/\//) ? url : `https://${url}`;
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Generate a UTM URL from form data
 * @param {Object} formData The form data to use for URL generation
 * @returns {string} The generated UTM URL
 */
export const generateUTMUrl = (formData) => {
  try {
    // Ensure URL has protocol
    const baseUrl = formData.websiteUrl.match(/^https?:\/\//) 
      ? formData.websiteUrl 
      : `https://${formData.websiteUrl}`;
    
    // Create URL object for proper handling
    const url = new URL(baseUrl);
    
    // Add UTM parameters if they exist
    if (formData.campaignSource) {
      url.searchParams.append('utm_source', formData.campaignSource);
    }
    
    if (formData.campaignMedium) {
      url.searchParams.append('utm_medium', formData.campaignMedium);
    }
    
    if (formData.campaignName) {
      url.searchParams.append('utm_campaign', formData.campaignName);
    }
    
    if (formData.campaignId) {
      url.searchParams.append('utm_id', formData.campaignId);
    }
    
    if (formData.campaignTerm) {
      url.searchParams.append('utm_term', formData.campaignTerm);
    }
    
    if (formData.campaignContent) {
      url.searchParams.append('utm_content', formData.campaignContent);
    }
    
    return url.toString();
  } catch (error) {
    throw new Error('Invalid URL or parameters');
  }
};

/**
 * Save UTM history to local storage
 * @param {Array} history Array of UTM results
 */
export const saveUTMHistory = (history) => {
  localStorage.setItem('utm_history', JSON.stringify(history));
};

/**
 * Load UTM history from local storage
 * @returns {Array} Array of UTM results or empty array if none found
 */
export const loadUTMHistory = () => {
  const history = localStorage.getItem('utm_history');
  return history ? JSON.parse(history) : [];
}; 
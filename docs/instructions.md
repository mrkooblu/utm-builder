# UTM Campaign Builder Application - Developer Instructions

## Overview
Create a web application that allows users to easily generate URLs with UTM parameters for tracking marketing campaigns in Google Analytics. The application should have a clean, user-friendly interface similar to the provided screenshot.

## UI Components

### Header Section
- Background color: Blue (#3079FF)
- Title: "UTM Campaign Builder" (large, white, centered text)
- Subtitle: "This tool allows you to easily add campaign parameters to URLs so you can measure Custom Campaigns in Google Analytics."
- "Custom Campaigns" should be a hyperlink

### Form Section
Create a form with the following fields:
1. **Website URL** (required)
   - Label: "Website URL *"
   - Help text: "The full website URL (e.g., https://www.example.com)"
   - Input type: Text field

2. **Campaign ID**
   - Label: "Campaign ID"
   - Help text: "The ads campaign id."
   - Input type: Text field

3. **Campaign Source** (required)
   - Label: "Campaign Source *"
   - Help text: "The referrer (e.g., google, newsletter)"
   - Input type: Text field

4. **Campaign Medium** (required)
   - Label: "Campaign Medium *"
   - Help text: "Marketing medium (e.g., cpc, banner, email)"
   - Input type: Text field

5. **Campaign Name**
   - Label: "Campaign Name"
   - Help text: "Product, promo code, or slogan (e.g., spring_sale). One of campaign name or campaign id are required."
   - Input type: Text field

6. **Campaign Term**
   - Label: "Campaign Term"
   - Help text: "Identify the paid keywords"
   - Input type: Text field

7. **Campaign Content**
   - Label: "Campaign Content"
   - Help text: "Use to differentiate ads"
   - Input type: Text field

8. **Generate URL Button**
   - Text: "Generate URL"
   - Style: Green (#10B981) button with white text, full width

### Information Section
Create a collapsible section titled "More information and examples for each parameter" with a table containing the following columns:
- Parameter
- Required
- Example
- Description

Populate the table with the data from the screenshot, which includes details for each UTM parameter.

## Functionality

### Core Features
1. **Form Validation**
   - Validate required fields (Website URL, Campaign Source, Campaign Medium)
   - Validate that either Campaign Name or Campaign ID is provided
   - Validate that Website URL is in a valid URL format
   - Display appropriate error messages for invalid inputs

2. **URL Generation**
   - When the "Generate URL" button is clicked, construct a URL with the appropriate UTM parameters
   - Format: `{websiteURL}?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_id={id}&utm_term={term}&utm_content={content}`
   - Only include parameters that have values (don't add empty parameters)
   - Display the generated URL in a results section below the form

3. **Copy to Clipboard**
   - Add a "Copy to Clipboard" button next to the generated URL
   - Provide visual feedback when the URL is copied

### Additional Features
1. **URL Preview**
   - Show a live preview of the URL as the user fills out the form
   
2. **URL Shortening** (optional)
   - Option to generate a shortened URL using a URL shortening service
   
3. **URL History**
   - Save previously generated URLs in local storage
   - Allow users to view and reuse previous URLs

4. **Parameter Validation**
   - Provide warnings for parameters that don't follow best practices (e.g., spaces instead of underscores)

## Technical Requirements

### Frontend
- Use HTML5, CSS3, and JavaScript (vanilla or a framework of your choice)
- Make the application responsive for all screen sizes
- Implement proper form validation with clear error messages
- Use modern CSS techniques for styling (Flexbox/Grid)
- Ensure the UI matches the design in the screenshot
- Leverage the components and styling provided in the example-code directory (see Component and Styling Reference section)

### Code Structure
- Organize code with clear separation of concerns
- Comment code appropriately
- Use descriptive variable and function names
- Implement proper error handling
- Follow the architecture pattern demonstrated in the example-code directory
- Maintain consistent styling by extending the theme provided in example-code

### Testing
- Test the application in multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify that all validation rules work correctly
- Ensure the generated URLs are correctly formatted

## Component and Styling Reference

The example-code directory contains a complete reference implementation with components and styling that should be leveraged for this project. Key resources include:

- **Component Library**: Use the components in `docs/example-code/src/components/` as building blocks for your UI
  - Form components (in `Form/` directory) for input fields, buttons, and form layout
  - Layout components (in `Layout/` directory) for page structure
  - Results components (in `Results/` directory) for displaying generated URLs
  - Common components for reusable UI elements

- **Styling**: Follow the styling approach in `docs/example-code/src/styles/`
  - Use the provided theme.ts for consistent colors, spacing, and typography
  - Extend the global styles as needed while maintaining consistency
  - Reference the GlobalStyle.ts for overall styling approach

- **Utility Functions**: Leverage the provided utilities in `docs/example-code/src/utils/` for common operations
  - URL validation and formatting
  - Form handling
  - Data processing

This reference implementation demonstrates best practices for project structure, component composition, and styling that should be followed in your implementation. Adapt and extend these components as needed while maintaining visual and functional consistency.

## Parameter Information Table Data
Include this table in the collapsible "More information" section:

| Parameter | Required | Example | Description |
|-----------|----------|---------|-------------|
| Campaign ID (`utm_id`) | No | abc-123 | Used to identify which ads campaign this referral references. Use utm_id to identify a specific ads campaign. |
| Campaign Source (`utm_source`) | Yes | google | Use utm_source to identify a search engine, newsletter name, or other source. |
| Campaign Medium (`utm_medium`) | Yes | cpc | Use utm_medium to identify a medium such as email or cost-per-click. |
| Campaign Name (`utm_campaign`) | No | spring_sale | Used for keyword analysis. Use utm_campaign to identify a specific product promotion or strategic campaign. |
| Campaign Term (`utm_term`) | No | running+shoes | Used for paid search. Use utm_term to note the keywords for this ad. |
| Campaign Content (`utm_content`) | No | logolink | Used for A/B testing and content-targeted ads. Use utm_content to differentiate ads or links that point to the same URL. |

## Best Practices
- Use semantic HTML elements
- Implement proper accessibility features (ARIA labels, keyboard navigation)
- Optimize for performance
- Provide clear user feedback for actions
- Use consistent styling throughout the application

## Deliverables
1. Complete source code
2. Brief documentation explaining how to use the application
3. Instructions for deploying the application

## Notes
- Prioritize user experience and ease of use
- The application should be intuitive for marketers with varying levels of technical expertise
- Focus on clean, modern design that's easy to navigate
- When implementing the application, follow these steps:
  1. Set up project structure following the pattern in example-code
  2. Build UI components by extending the components from example-code
  3. Implement form validation and URL generation
  4. Add copy functionality and additional features
  5. Perform thorough testing
- The example-code serves as both a reference for implementation details and a source of reusable components
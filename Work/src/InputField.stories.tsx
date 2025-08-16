import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import InputField from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# InputField Component

A flexible, accessible, and feature-rich input component built with React, TypeScript, and TailwindCSS. Designed for modern web applications with comprehensive form handling capabilities.

## Overview

The InputField component provides a complete input solution with built-in validation, multiple visual variants, interactive features, and full accessibility support. It's designed to handle common form scenarios while maintaining consistency across your application.

---

## Props & API Definition

### Primary Props
\`\`\`typescript
interface InputFieldProps {
  // Core Input Properties
  value?: string;                                    // Current input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Change handler
  
  // Content & Labeling
  label?: string;                                   // Input label text
  placeholder?: string;                             // Placeholder text
  helperText?: string;                             // Helper text below input
  errorMessage?: string;                           // Error message (shown when invalid)
  
  // Input Behavior
  type?: 'text' | 'password' | 'email' | 'number'; // HTML input type
  disabled?: boolean;                              // Disable input interaction
  
  // Visual States
  variant?: 'filled' | 'outlined' | 'ghost';      // Visual style variant
  size?: 'sm' | 'md' | 'lg';                      // Input size
  invalid?: boolean;                               // Error state flag
  loading?: boolean;                               // Loading state with spinner
  
  // Interactive Features
  showClearButton?: boolean;                       // Show X button to clear input
  showPasswordToggle?: boolean;                    // Show eye icon for password visibility
  
  // Styling
  className?: string;                              // Additional CSS classes
}
\`\`\`

---

## Component Anatomy & Structure

\`\`\`jsx
<div className="input-field-container">
  {/* Label */}
  <label htmlFor={inputId} className="input-label">
    {label}
  </label>
  
  {/* Input Container */}
  <div className="input-wrapper relative">
    <input 
      id={inputId}
      className="input-element"
      aria-invalid={invalid}
      aria-describedby={helperId || errorId}
    />
    
    {/* Loading Spinner (conditional) */}
    {loading && <LoadingSpinner />}
    
    {/* Clear Button (conditional) */}
    {showClearButton && value && <ClearButton />}
    
    {/* Password Toggle (conditional) */}
    {showPasswordToggle && type === 'password' && <PasswordToggle />}
  </div>
  
  {/* Helper Text */}
  {helperText && !invalid && (
    <p id={helperId} className="helper-text">{helperText}</p>
  )}
  
  {/* Error Message */}
  {errorMessage && invalid && (
    <p id={errorId} className="error-message">{errorMessage}</p>
  )}
</div>
\`\`\`

---

## Visual Variants

### 1. **Outlined** (Default)
- Clean border design
- Background: transparent/white
- Border: visible, changes color on focus/error
- Best for: General forms, professional interfaces

### 2. **Filled**
- Subtle background fill
- Background: light gray, becomes white on focus
- Border: minimal, appears on focus
- Best for: Dense forms, modern interfaces

### 3. **Ghost**
- Minimalist underline only
- Background: transparent
- Border: bottom border only
- Best for: Clean designs, mobile interfaces

---

## Size Variants

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| **sm** | 32px | 8px 12px | 14px | Compact forms, sidebars |
| **md** | 40px | 12px 16px | 16px | Standard forms, default |
| **lg** | 48px | 16px 20px | 18px | Prominent forms, landing pages |

---

## States & Behavior

### Interactive States
- **Default**: Ready for input
- **Focused**: Active input with focus ring
- **Filled**: Contains user input
- **Disabled**: Non-interactive, grayed out
- **Loading**: Shows spinner, input disabled
- **Invalid**: Error styling with error message

### State Transitions
\`\`\`
Default → Focus → Input → Blur → Default
         ↓
      Validation
         ↓
   Valid/Invalid
\`\`\`

---

## Accessibility Features

### ARIA Support
- \`aria-invalid\`: Indicates validation state
- \`aria-describedby\`: Links to helper/error text
- \`aria-label\`: Clear button and password toggle labels
- \`role\`: Implicit input role

### Keyboard Navigation
- **Tab**: Focus input field
- **Shift+Tab**: Move to previous focusable element
- **Escape**: Clear focus (when applicable)
- **Enter**: Submit form (if in form context)

### Focus Management
- Clear focus indicators with 2px blue ring
- Focus trapped within input area
- Visible focus for keyboard users
- Focus moves to clear/toggle buttons when present

### Screen Reader Support
- Label properly associated with input
- Error messages announced on change
- State changes announced (loading, cleared, etc.)
- Helper text read with input

---

## Theming & Responsiveness

### Dark Mode Support
- Automatic color scheme detection
- Consistent contrast ratios (WCAG AA)
- Proper color tokens for all states
- Toggle-friendly design system integration

### Responsive Behavior
- Mobile-optimized touch targets (44px minimum)
- Flexible width (100% of container)
- Scalable typography
- Touch-friendly interactive elements

### Color System
\`\`\`css
/* Light Mode */
--input-bg: white;
--input-border: #d1d5db;
--input-text: #111827;
--input-focus: #3b82f6;

/* Dark Mode */
--input-bg: #1f2937;
--input-border: #4b5563;
--input-text: #f9fafb;
--input-focus: #60a5fa;
\`\`\`

---

## Real-World Use Cases

### 1. **Authentication Forms**
\`\`\`jsx
<InputField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
  required
/>
\`\`\`

### 2. **Search Interfaces**
\`\`\`jsx
<InputField
  placeholder="Search products..."
  variant="filled"
  showClearButton
  size="lg"
/>
\`\`\`

### 3. **Password Entry**
\`\`\`jsx
<InputField
  label="Password"
  type="password"
  showPasswordToggle
  showClearButton
  helperText="Minimum 8 characters"
/>
\`\`\`

### 4. **Form Validation**
\`\`\`jsx
<InputField
  label="Username"
  value={username}
  invalid={hasError}
  errorMessage="Username must be at least 3 characters"
  onChange={handleUsernameChange}
/>
\`\`\`

---

## Best Practices

### Do's ✅

1. **Use Descriptive Labels**
   - Always provide clear, descriptive labels
   - Avoid generic labels like "Input" or "Field"
   - Use sentence case for labels

2. **Provide Helpful Feedback**
   - Use helper text for format requirements
   - Provide specific, actionable error messages
   - Show success states when appropriate

3. **Choose Appropriate Types**
   - Use \`type="email"\` for email inputs
   - Use \`type="password"\` for sensitive data
   - Leverage HTML5 input types for better UX

4. **Maintain Consistency**
   - Use consistent variants across similar contexts
   - Maintain consistent sizing within forms
   - Follow established patterns in your app

### Don'ts ❌

1. **Don't Rely on Placeholders Alone**
   - Never use placeholder as the only label
   - Don't use placeholders for critical information
   - Avoid long placeholder text

2. **Don't Overcomplicate**
   - Don't use multiple variants in the same form
   - Avoid unnecessary interactive features
   - Don't override standard keyboard behavior

3. **Don't Ignore Accessibility**
   - Never skip labels for screen readers
   - Don't rely on color alone for error states
   - Avoid focus traps or keyboard navigation issues

4. **Don't Break Expectations**
   - Don't change input behavior unexpectedly
   - Avoid non-standard validation timing
   - Don't hide important information in tooltips

---

## Performance Considerations

- Debounced validation for better performance
- Optimized re-renders using React.memo patterns
- Efficient state management
- Minimal DOM updates
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input is in a loading state',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show the clear button when input has value',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show password visibility toggle (only for password type)',
    },
    onChange: { action: 'changed' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text here...',
  },
};

// Variants
export const Filled: Story = {
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Filled style input',
    helperText: 'This is a filled input variant',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    variant: 'outlined',
    placeholder: 'Outlined style input',
    helperText: 'This is the default outlined variant',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Input',
    variant: 'ghost',
    placeholder: 'Ghost style input',
    helperText: 'This is a minimalist ghost variant',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size input',
    helperText: 'Compact size for tight spaces',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: 'md',
    placeholder: 'Medium size input',
    helperText: 'Standard size for most use cases',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size input',
    helperText: 'Larger size for better visibility',
  },
};

// States
export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Please wait...',
    loading: true,
    helperText: 'Input is in loading state',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this field',
    disabled: true,
    helperText: 'This field is disabled',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid Input',
    value: 'invalid@email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input with Value',
    value: 'Pre-filled value',
    helperText: 'This input has a pre-filled value',
  },
};

// Interactive Features
export const WithClearButton: Story = {
  args: {
    label: 'Input with Clear Button',
    value: 'Clear me!',
    showClearButton: true,
    helperText: 'Click the X to clear the input',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    helperText: 'Click the eye icon to toggle visibility',
  },
};

export const PasswordWithClear: Story = {
  args: {
    label: 'Password with Clear',
    type: 'password',
    value: 'mypassword',
    showPasswordToggle: true,
    showClearButton: true,
    helperText: 'Password input with both toggle and clear buttons',
  },
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    helperText: 'We\'ll never share your email',
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
    helperText: 'Enter your age in years',
  },
};

// Complex Examples
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        variant="outlined"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        showPasswordToggle
        variant="outlined"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a login form using two InputField components.',
      },
    },
  },
};

export const RegistrationForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Full Name"
        placeholder="John Doe"
        variant="filled"
        size="lg"
      />
      <InputField
        label="Email"
        type="email"
        placeholder="john@example.com"
        variant="filled"
        size="lg"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Create a password"
        showPasswordToggle
        variant="filled"
        size="lg"
        helperText="At least 8 characters with one uppercase, one lowercase, and one number"
      />
      <InputField
        label="Company (Optional)"
        placeholder="Company name"
        variant="filled"
        size="lg"
        helperText="Leave blank if not applicable"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a registration form with multiple InputField components.',
      },
    },
  },
};

// Error Scenarios
export const MultipleErrors: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Email"
        value="invalid-email"
        invalid
        errorMessage="Please enter a valid email address"
      />
      <InputField
        label="Password"
        type="password"
        value="123"
        invalid
        errorMessage="Password must be at least 8 characters long"
        showPasswordToggle
      />
      <InputField
        label="Confirm Password"
        type="password"
        value="456"
        invalid
        errorMessage="Passwords do not match"
        showPasswordToggle
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple inputs in error states.',
      },
    },
  },
};

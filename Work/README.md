# React Components Demo

A comprehensive React component library built with TypeScript, TailwindCSS, and Storybook documentation.

## 🚀 Components Built

### 1. InputField Component
A flexible and accessible input component with comprehensive features:

**Features:**
- ✅ Multiple variants: filled, outlined, ghost
- ✅ Three sizes: small, medium, large  
- ✅ Validation states with error messaging
- ✅ Loading state with spinner
- ✅ Optional clear button
- ✅ Password toggle for password inputs
- ✅ Full dark mode support
- ✅ Complete accessibility (ARIA labels, keyboard navigation)
- ✅ TypeScript support with proper interfaces

**Props Interface:**
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}
```

### 2. DataTable Component
A powerful data table component with advanced functionality:

**Features:**
- ✅ Column sorting (ascending/descending)
- ✅ Row selection (single/multiple)
- ✅ Loading state with spinner
- ✅ Empty state handling
- ✅ Custom cell renderers
- ✅ Responsive design with horizontal scroll
- ✅ Full dark mode support
- ✅ Complete accessibility
- ✅ TypeScript support with generics

**Props Interface:**
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
}

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}
```

## 🎨 Theme Support

Both components include comprehensive dark mode support:
- Light/Dark theme toggle button
- Proper color schemes for all states
- Consistent styling across themes
- System preference detection
- Theme persistence in localStorage

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Horizontal scroll for large tables
- Touch-friendly interactions
- Consistent spacing across screen sizes

## ♿ Accessibility Features

- Full ARIA support
- Keyboard navigation
- Screen reader compatibility
- Focus management
- High contrast support
- Semantic HTML structure

## 🛠 Tech Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Full type safety
- **TailwindCSS** - Utility-first styling
- **Vite** - Fast build tool
- **Storybook** - Component documentation (stories ready)

## 📁 Project Structure

```
src/
├── InputField.tsx          # Input component
├── DataTable.tsx           # Data table component
├── ThemeContext.tsx        # Theme management
├── InputField.stories.tsx  # InputField documentation
├── DataTable.stories.tsx   # DataTable documentation
├── types.ts                # TypeScript interfaces
└── App.jsx                 # Demo application
```

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **View Storybook documentation:**
   ```bash
   npm run storybook
   ```

## 📖 Storybook Documentation

Comprehensive Storybook documentation includes:

### For Each Component:
- ✅ Component overview and description
- ✅ Props & API definitions with TypeScript types
- ✅ Interactive controls for all props
- ✅ Multiple usage examples and stories
- ✅ Real-world use cases
- ✅ Component anatomy breakdown
- ✅ All states and variants demonstrated
- ✅ Accessibility guidelines
- ✅ Best practices and do's/don'ts
- ✅ Theming and responsive behavior

### Story Examples:
- **InputField**: 15+ stories covering all variants, sizes, states, and complex scenarios
- **DataTable**: 10+ stories including loading states, empty states, custom renderers, and large datasets

## ✨ Key Features Implemented

### InputField Highlights:
- Three distinct visual variants with hover states
- Smooth animations and transitions  
- Smart button positioning (clear + password toggle)
- Proper focus management and accessibility
- Error state styling with validation

### DataTable Highlights:
- Sortable columns with visual indicators
- Row selection with indeterminate state
- Custom cell rendering for complex data
- Elegant loading and empty states
- Responsive horizontal scrolling

## 🎯 Best Practices Followed

- **Component Design**: Single responsibility, composable, reusable
- **TypeScript**: Strict typing, generic components, proper interfaces
- **Accessibility**: WCAG guidelines, ARIA attributes, keyboard support
- **Performance**: Optimized re-renders, efficient state management
- **Code Quality**: Clean, readable, well-documented code
- **User Experience**: Smooth animations, intuitive interactions

## 🧪 Usage Examples

### InputField Examples:
```jsx
// Basic usage
<InputField 
  label="Email" 
  type="email" 
  placeholder="Enter your email" 
/>

// With validation
<InputField 
  label="Password"
  type="password"
  invalid={hasError}
  errorMessage="Password must be at least 8 characters"
  showPasswordToggle
/>

// Different variants
<InputField variant="filled" label="Filled Input" />
<InputField variant="ghost" label="Ghost Input" />
```

### DataTable Examples:
```jsx
// Basic table
<DataTable 
  data={users} 
  columns={columns} 
/>

// With selection and custom rendering
<DataTable
  data={users}
  columns={columnsWithCustomRender}
  selectable
  onRowSelect={handleSelection}
  loading={isLoading}
/>
```

This project demonstrates modern React development practices with a focus on accessibility, user experience, and comprehensive documentation.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

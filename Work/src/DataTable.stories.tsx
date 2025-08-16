import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import DataTable from './DataTable';

// Sample data for stories
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, role: 'Developer', status: 'Active', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'Designer', status: 'Active', department: 'Design' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Manager', status: 'Inactive', department: 'Engineering' },
  { id: 4, name: 'Alice Wilson', email: 'alice@example.com', age: 28, role: 'Developer', status: 'Active', department: 'Engineering' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', age: 32, role: 'Designer', status: 'Active', department: 'Design' },
];

const basicColumns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
];

const enhancedColumns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
  { 
    key: 'role', 
    header: 'Role', 
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Developer' ? 'bg-blue-100 text-blue-800' :
        value === 'Designer' ? 'bg-green-100 text-green-800' :
        'bg-purple-100 text-purple-800'
      }`}>
        {value}
      </span>
    )
  },
  { 
    key: 'status', 
    header: 'Status', 
    sortable: true,
    render: (value: string) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <span className={`w-2 h-2 rounded-full mr-1 ${
          value === 'Active' ? 'bg-green-400' : 'bg-red-400'
        }`}></span>
        {value}
      </span>
    )
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable Component

A powerful, flexible, and accessible data table component built with React, TypeScript, and TailwindCSS. Designed for modern data-heavy applications with comprehensive table functionality.

## Overview

The DataTable component provides a complete table solution with sorting, selection, custom rendering, and state management. It's optimized for performance and accessibility while maintaining a clean, professional appearance across different themes and screen sizes.

---

## Props & API Definition

### Primary Props
\`\`\`typescript
interface DataTableProps<T> {
  // Data & Structure
  data: T[];                                        // Array of data objects
  columns: Column<T>[];                             // Column definitions
  
  // Interactive Features
  loading?: boolean;                                // Loading state with spinner
  selectable?: boolean;                             // Enable row selection
  onRowSelect?: (selectedRows: T[]) => void;        // Selection change handler
  
  // Styling
  className?: string;                               // Additional CSS classes
}

interface Column<T> {
  key: keyof T;                                     // Data property key
  header: string;                                   // Column header text
  sortable?: boolean;                               // Enable column sorting
  render?: (value: any, row: T) => React.ReactNode; // Custom cell renderer
}
\`\`\`

### Generic Type Support
The component uses TypeScript generics (\`<T>\`) to provide type safety for your data:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Fully typed DataTable
<DataTable<User> 
  data={users} 
  columns={userColumns} 
  selectable 
/>
\`\`\`

---

## Component Anatomy & Structure

\`\`\`jsx
<div className="table-container">
  {/* Loading State */}
  {loading && (
    <div className="loading-overlay">
      <Spinner /> Loading...
    </div>
  )}
  
  {/* Empty State */}
  {!data.length && (
    <div className="empty-state">
      <Icon /> No data available
    </div>
  )}
  
  {/* Table */}
  <div className="table-wrapper">
    <table className="data-table">
      {/* Header */}
      <thead>
        <tr>
          {selectable && (
            <th><input type="checkbox" aria-label="Select all" /></th>
          )}
          {columns.map(column => (
            <th 
              key={column.key}
              onClick={handleSort}
              className={sortable ? 'sortable' : ''}
              role="columnheader"
              aria-sort={getSortDirection()}
            >
              {column.header}
              {sortable && <SortIndicator />}
            </th>
          ))}
        </tr>
      </thead>
      
      {/* Body */}
      <tbody>
        {data.map((row, index) => (
          <tr 
            key={index}
            className={isSelected ? 'selected' : ''}
            role="row"
          >
            {selectable && (
              <td>
                <input 
                  type="checkbox" 
                  aria-label={\`Select row \${index + 1}\`}
                  onChange={handleRowSelect}
                />
              </td>
            )}
            {columns.map(column => (
              <td key={column.key} role="cell">
                {column.render 
                  ? column.render(row[column.key], row)
                  : row[column.key]
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  {/* Footer */}
  {selectable && selectedRows.length > 0 && (
    <div className="table-footer">
      {selectedRows.length} of {data.length} rows selected
    </div>
  )}
</div>
\`\`\`

---

## States & Behavior

### Table States
1. **Loading State**
   - Shows spinner overlay
   - Prevents user interaction
   - Maintains table structure

2. **Empty State**
   - Displays when \`data\` array is empty
   - Shows helpful message and icon
   - Maintains consistent layout

3. **Default State**
   - Displays data in tabular format
   - Interactive headers (if sortable)
   - Hover effects on rows

4. **Selected State**
   - Highlights selected rows
   - Shows selection count in footer
   - Updates selection indicators

### Row Selection Behavior
\`\`\`
No Selection → Single Row → Multiple Rows → All Rows
     ↑                                            ↓
     ←←←←←←←← Clear Selection ←←←←←←←←←←←←←←←←←←←←←←
\`\`\`

### Sorting Behavior
\`\`\`
Unsorted → Ascending → Descending → Unsorted
   ↑                                     ↓
   ←←←←←←←←←←←← Cycle ←←←←←←←←←←←←←←←←←←←
\`\`\`

---

## Interaction Patterns

### Sorting
- **Single Click**: Sort ascending
- **Second Click**: Sort descending  
- **Third Click**: Remove sorting
- **Visual Indicator**: Arrow shows sort direction
- **Keyboard**: Space/Enter on focused header

### Row Selection
- **Checkbox Click**: Toggle individual row
- **Header Checkbox**: Select/deselect all rows
- **Indeterminate State**: Some (not all) rows selected
- **Keyboard**: Space on focused checkbox

### Responsive Behavior
- **Desktop**: Full table with hover effects
- **Tablet**: Horizontal scroll when needed
- **Mobile**: Horizontal scroll with touch gestures

---

## Accessibility Features

### ARIA Support
- \`role="table"\`: Table landmark
- \`role="columnheader"\`: Column headers
- \`role="row"\`: Table rows
- \`role="cell"\`: Table cells
- \`aria-sort\`: Sort direction indication
- \`aria-label\`: Selection checkboxes
- \`aria-describedby\`: Row descriptions

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Space**: Activate checkboxes and sort headers
- **Enter**: Activate sort headers
- **Arrow Keys**: Navigate between cells (optional)

### Focus Management
- Clear focus indicators on all interactive elements
- Focus remains visible during interactions
- Logical tab order through table elements
- Focus restoration after sorting

### Screen Reader Support
- Table structure announced correctly
- Sort direction changes announced
- Selection changes announced
- Loading state communicated
- Column headers associated with cells

---

## Theming & Responsiveness

### Dark Mode Support
\`\`\`css
/* Light Theme */
.data-table {
  --table-bg: white;
  --table-border: #e5e7eb;
  --table-text: #111827;
  --table-header-bg: #f9fafb;
  --table-hover: #f3f4f6;
  --table-selected: #dbeafe;
}

/* Dark Theme */
.dark .data-table {
  --table-bg: #1f2937;
  --table-border: #374151;
  --table-text: #f9fafb;
  --table-header-bg: #111827;
  --table-hover: #374151;
  --table-selected: #1e40af;
}
\`\`\`

### Responsive Breakpoints
- **Mobile** (< 768px): Horizontal scroll, compact spacing
- **Tablet** (768px - 1024px): Balanced layout
- **Desktop** (> 1024px): Full features, optimal spacing

### Touch Optimization
- Minimum 44px touch targets
- Touch-friendly hover states
- Gesture support for scrolling
- Prevent text selection during interaction

---

## Real-World Use Cases

### 1. **User Management Dashboard**
\`\`\`jsx
const userColumns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { 
    key: 'status', 
    header: 'Status', 
    sortable: true,
    render: (status) => (
      <StatusBadge status={status} />
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (_, user) => (
      <ActionButtons user={user} />
    )
  }
];

<DataTable
  data={users}
  columns={userColumns}
  selectable
  onRowSelect={handleBulkActions}
/>
\`\`\`

### 2. **Product Catalog**
\`\`\`jsx
const productColumns = [
  {
    key: 'image',
    header: 'Product',
    render: (image, product) => (
      <div className="flex items-center gap-3">
        <img src={image} className="w-10 h-10" />
        <span>{product.name}</span>
      </div>
    )
  },
  { key: 'category', header: 'Category', sortable: true },
  { 
    key: 'price', 
    header: 'Price', 
    sortable: true,
    render: (price) => \`$\${price.toFixed(2)}\`
  },
  { key: 'stock', header: 'Stock', sortable: true }
];
\`\`\`

### 3. **Analytics Dashboard**
\`\`\`jsx
const metricsColumns = [
  { key: 'date', header: 'Date', sortable: true },
  { 
    key: 'visitors', 
    header: 'Visitors', 
    sortable: true,
    render: (count) => count.toLocaleString()
  },
  {
    key: 'conversion',
    header: 'Conversion Rate',
    sortable: true,
    render: (rate) => (
      <div className="flex items-center gap-2">
        <span>{(rate * 100).toFixed(1)}%</span>
        <TrendIndicator value={rate} />
      </div>
    )
  }
];
\`\`\`

### 4. **Order Management**
\`\`\`jsx
<DataTable
  data={orders}
  columns={orderColumns}
  loading={isLoading}
  selectable
  onRowSelect={(selected) => {
    setBulkActions(selected.length > 0);
    setSelectedOrders(selected);
  }}
/>
\`\`\`

---

## Best Practices

### Do's ✅

1. **Column Design**
   - Keep headers concise and descriptive
   - Use consistent data types per column
   - Implement logical sort orders
   - Group related columns together

2. **Custom Rendering**
   - Use custom renderers for complex data
   - Maintain consistent visual hierarchy
   - Include proper accessibility attributes
   - Handle null/undefined values gracefully

3. **Performance**
   - Implement virtual scrolling for large datasets (1000+ rows)
   - Use proper keys for row identification
   - Memoize expensive render functions
   - Consider pagination for very large datasets

4. **User Experience**
   - Provide clear loading states
   - Show helpful empty states
   - Give feedback for selection actions
   - Maintain sort state across data updates

### Don'ts ❌

1. **Design Mistakes**
   - Don't make every column sortable unnecessarily
   - Don't use tables for non-tabular data
   - Don't overcrowd columns on mobile
   - Don't ignore responsive design

2. **Accessibility Issues**
   - Don't skip proper ARIA labels
   - Don't rely solely on color for information
   - Don't break keyboard navigation
   - Don't ignore screen reader testing

3. **Performance Problems**
   - Don't render large datasets without optimization
   - Don't perform expensive operations in render functions
   - Don't ignore memory leaks from event listeners
   - Don't block the UI during data processing

4. **UX Anti-patterns**
   - Don't change row order unexpectedly
   - Don't clear selections without user action
   - Don't hide important actions behind multiple clicks
   - Don't use inconsistent interaction patterns

---

## Advanced Features

### Custom Cell Renderers
\`\`\`jsx
const columns = [
  {
    key: 'avatar',
    header: 'User',
    render: (avatar, user) => (
      <div className="flex items-center gap-2">
        <img src={avatar} className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    )
  }
];
\`\`\`

### Performance Optimization
\`\`\`jsx
// Memoize expensive calculations
const columns = useMemo(() => [
  {
    key: 'calculation',
    header: 'Complex Value',
    render: (value, row) => {
      return expensiveCalculation(value, row);
    }
  }
], [dependencyArray]);
\`\`\`

### Integration Patterns
\`\`\`jsx
// With state management
const handleSelection = useCallback((selected) => {
  dispatch(updateSelection(selected));
}, [dispatch]);

// With API integration
const { data, loading, error } = useQuery('users', fetchUsers);

if (error) return <ErrorState />;

return (
  <DataTable
    data={data || []}
    columns={columns}
    loading={loading}
    selectable
    onRowSelect={handleSelection}
  />
);
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in a loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows can be selected',
    },
    data: {
      control: 'object',
      description: 'Array of data objects to display',
    },
    columns: {
      control: 'object',
      description: 'Array of column definitions',
    },
    onRowSelect: { action: 'rowSelected' },
  },
  args: {
    onRowSelect: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with row selection enabled. Click checkboxes to select individual rows or use the header checkbox to select all.',
      },
    },
  },
};

export const WithCustomRendering: Story = {
  args: {
    data: sampleUsers,
    columns: enhancedColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with custom cell renderers for role and status columns, showing badges and status indicators.',
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
    loading: true,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table in loading state with spinner and loading message.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table empty state shown when no data is available.',
      },
    },
  },
};

// Advanced Examples
export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 30),
      role: ['Developer', 'Designer', 'Manager', 'QA'][i % 4],
      status: i % 3 === 0 ? 'Inactive' : 'Active',
      department: ['Engineering', 'Design', 'Marketing', 'Sales'][i % 4],
    })),
    columns: enhancedColumns,
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with a large dataset (50 rows) to demonstrate performance and scrolling behavior.',
      },
    },
  },
};

export const MinimalColumns: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with minimal columns, showing that not all columns need to be sortable.',
      },
    },
  },
};

export const ActionColumn: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: [
      ...basicColumns,
      {
        key: 'actions',
        header: 'Actions',
        sortable: false,
        render: (_, row) => (
          <div className="flex space-x-2">
            <button
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => alert(`Edit ${row.name}`)}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:text-red-800 text-sm font-medium"
              onClick={() => alert(`Delete ${row.name}`)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with an action column containing buttons for row-specific operations.',
      },
    },
  },
};

// Complex rendering examples
export const RichContent: Story = {
  args: {
    data: [
      {
        id: 1,
        user: { name: 'John Doe', avatar: '👤' },
        contact: { email: 'john@example.com', phone: '+1-555-0123' },
        metrics: { orders: 15, revenue: 2340 },
        tags: ['VIP', 'Enterprise'],
        lastActive: '2024-01-15',
      },
      {
        id: 2,
        user: { name: 'Jane Smith', avatar: '👩' },
        contact: { email: 'jane@example.com', phone: '+1-555-0124' },
        metrics: { orders: 8, revenue: 1200 },
        tags: ['New'],
        lastActive: '2024-01-14',
      },
    ],
    columns: [
      {
        key: 'user',
        header: 'User',
        sortable: false,
        render: (value) => (
          <div className="flex items-center space-x-2">
            <span className="text-lg">{value.avatar}</span>
            <span className="font-medium">{value.name}</span>
          </div>
        ),
      },
      {
        key: 'contact',
        header: 'Contact',
        sortable: false,
        render: (value) => (
          <div className="text-sm">
            <div>{value.email}</div>
            <div className="text-gray-500">{value.phone}</div>
          </div>
        ),
      },
      {
        key: 'metrics',
        header: 'Metrics',
        sortable: false,
        render: (value) => (
          <div className="text-sm">
            <div>{value.orders} orders</div>
            <div className="text-green-600 font-medium">${value.revenue}</div>
          </div>
        ),
      },
      {
        key: 'tags',
        header: 'Tags',
        sortable: false,
        render: (value) => (
          <div className="flex flex-wrap gap-1">
            {value.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        ),
      },
    ],
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with rich content including avatars, nested data, metrics, and tags.',
      },
    },
  },
};

// Responsive example
export const ResponsiveTable: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: 'id', header: 'ID', sortable: true },
      { key: 'name', header: 'Full Name', sortable: true },
      { key: 'email', header: 'Email Address', sortable: true },
      { key: 'age', header: 'Age', sortable: true },
      { key: 'role', header: 'Job Role', sortable: true },
      { key: 'department', header: 'Department', sortable: true },
      { 
        key: 'status', 
        header: 'Account Status', 
        sortable: true,
        render: (value: string) => (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
    ],
    selectable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with many columns to demonstrate responsive horizontal scrolling on smaller screens.',
      },
    },
  },
};

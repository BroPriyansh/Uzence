import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext.tsx';
import InputField from './InputField.tsx';
import DataTable from './DataTable.tsx';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 z-50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Manager' },
  { id: 4, name: 'Alice Wilson', email: 'alice@example.com', age: 28, role: 'Developer' },
];

const columns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
  { 
    key: 'role', 
    header: 'Role', 
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Developer' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
        value === 'Designer' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      }`}>
        {value}
      </span>
    )
  },
];

function AppContent() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState(sampleData);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleRowSelect = (rows) => {
    setSelectedRows(rows);
  };

  const simulateLoading = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowFormPopup(true);
  };

  const handleAddUser = () => {
    const newUser = {
      id: Math.max(...tableData.map(u => u.id)) + 1,
      name: `New User ${tableData.length + 1}`,
      email: `user${tableData.length + 1}@example.com`,
      age: Math.floor(Math.random() * 40) + 20,
      role: ['Developer', 'Designer', 'Manager'][Math.floor(Math.random() * 3)]
    };
    setTableData([...tableData, newUser]);
  };

  const handleDeleteUsers = () => {
    if (selectedRows.length === 0) {
      alert('Please select users to delete');
      return;
    }
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    const updatedData = tableData.filter(user => !selectedRows.includes(user));
    setTableData(updatedData);
    setSelectedRows([]);
    setShowDeletePopup(false);
  };

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              React Components Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showcasing InputField and DataTable components with TypeScript & TailwindCSS
            </p>
          </div>

          {/* InputField Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">InputField Component</h2>
          
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            {/* Basic Input */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Basic Input</h3>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This is a helper text"
              />
            </div>

            {/* Password Input */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Password Input</h3>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                showPasswordToggle
                showClearButton
              />
            </div>

            {/* Error State */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Error State</h3>
              <InputField
                label="Email Address"
                placeholder="Enter your email"
                invalid
                errorMessage="Please enter a valid email address"
              />
            </div>

            {/* Filled Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Filled Variant</h3>
              <InputField
                label="Company"
                variant="filled"
                placeholder="Company name"
                helperText="Optional field"
              />
            </div>

            {/* Ghost Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Ghost Variant</h3>
              <InputField
                label="Title"
                variant="ghost"
                placeholder="Enter title"
              />
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Disabled State</h3>
              <InputField
                label="Read-only Field"
                value="Cannot edit this"
                disabled
              />
            </div>

            {/* Small Size */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Small Size</h3>
              <InputField
                label="Small Input"
                size="sm"
                placeholder="Small input field"
              />
            </div>

            {/* Large Size */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Large Size</h3>
              <InputField
                label="Large Input"
                size="lg"
                placeholder="Large input field"
              />
            </div>

            {/* Loading State */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Loading State</h3>
              <InputField
                label="Processing..."
                placeholder="Please wait"
                loading
              />
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors duration-200 shadow-sm"
              >
                Submit Form
              </button>
            </div>
          </form>
        </section>

        {/* DataTable Demo */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">DataTable Component</h2>
            <div className="flex gap-3">
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>
              <button
                onClick={handleDeleteUsers}
                disabled={selectedRows.length === 0}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete ({selectedRows.length})
              </button>
              <button
                onClick={simulateLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Simulate Loading
              </button>
            </div>
          </div>

          <DataTable
            data={tableData}
            columns={columns}
            loading={tableLoading}
            selectable
            onRowSelect={handleRowSelect}
          />

          {selectedRows.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Selected Rows:</h3>
              <p className="text-blue-700 dark:text-blue-300">
                {selectedRows.map(row => row.name).join(', ')}
              </p>
            </div>
          )}
        </section>

        {/* Empty DataTable Demo */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Empty State Demo</h2>
          <DataTable
            data={[]}
            columns={columns}
            selectable
          />
        </section>
      </div>
    </div>

    {/* Form Submission Popup */}
    {showFormPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-mx-4 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Form Submitted Successfully!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Your form has been submitted with the following data:
              <br />
              <strong>Name:</strong> {inputValue || 'Not provided'}
              <br />
              <strong>Password:</strong> {'*'.repeat(passwordValue.length) || 'Not provided'}
            </p>
            <button
              onClick={() => setShowFormPopup(false)}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Delete Confirmation Popup */}
    {showDeletePopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-mx-4 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete {selectedRows.length} selected user(s)?
              <br />
              <strong>Users to delete:</strong> {selectedRows.map(row => row.name).join(', ')}
              <br />
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App

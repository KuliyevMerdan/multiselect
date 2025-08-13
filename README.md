# Multiselect Component Demo

A comprehensive React multiselect dropdown component built with React, TypeScript, and Tailwind CSS.

## Features

- **Multi-selection**: Select multiple options from a dropdown list
- **Search functionality**: Filter options with real-time search
- **Individual removal**: Remove specific selected options with X buttons
- **Bulk operations**: Clear all selected options at once
- **Keyboard navigation**: Full keyboard accessibility support
- **Responsive design**: Works seamlessly on all device sizes
- **Large list handling**: Scrollable dropdown for extensive option lists
- **TypeScript support**: Fully typed for better development experience
- **Accessibility**: ARIA attributes and screen reader support

## Component API

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `options` | `MultiselectOption[]` | Yes | Array of available options |
| `selectedOptions` | `string[]` | Yes | Currently selected values |
| `onSelectionChange` | `(values: string[]) => void` | Yes | Callback for selection changes |
| `placeholder` | `string` | No | Placeholder text (default: "Select options...") |
| `className` | `string` | No | Additional CSS classes |

### MultiselectOption Interface

```typescript
interface MultiselectOption {
  label: string  // Display text
  value: string  // Unique identifier
}
```

## Usage Example

```tsx
import { Multiselect } from '@/components/multiselect'

const options = [
  { label: 'New York', value: 'ny' },
  { label: 'London', value: 'london' },
  { label: 'Tokyo', value: 'tokyo' }
]

function MyComponent() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <Multiselect
      options={options}
      selectedOptions={selected}
      onSelectionChange={setSelected}
      placeholder="Choose locations..."
    />
  )
}
```

## Demo Application

The demo application showcases the component using real timezone data from the TimeAPI service:

- Fetches 400+ timezones from `https://timeapi.io/api/timezone/availabletimezones`
- Provides preset selections for common timezone groups
- Displays selected values in multiple formats
- Includes comprehensive documentation

## Running the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`

## Technical Implementation

### Architecture
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks (useState, useEffect, useRef)
- **TypeScript**: Full type safety throughout

### Key Features Implementation

#### Search Functionality
- Real-time filtering of options based on user input
- Case-insensitive search across option labels
- Automatic focus management when dropdown opens

#### Accessibility
- ARIA roles and attributes for screen readers
- Keyboard navigation support
- Proper focus management
- Semantic HTML structure

#### Performance Optimizations
- Efficient filtering algorithms
- Minimal re-renders through proper state management
- Click outside detection with cleanup
- Debounced search (can be added if needed)

#### Edge Case Handling
- Empty options array
- No search results
- Network errors (in demo app)
- Loading states

## Customization

The component is highly customizable through:

- **Tailwind classes**: Modify appearance via className prop
- **CSS variables**: Adjust colors through shadcn/ui theme system
- **Component structure**: Easy to extend with additional features
- **TypeScript interfaces**: Type-safe customization options

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Keyboard navigation support
- Screen reader compatibility

## Dependencies

- React 18+
- Tailwind CSS
- Lucide React (for icons)

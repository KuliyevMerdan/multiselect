import React, { useState, useRef, useEffect } from "react"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

export function Multiselect({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = "Select options...",
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Filter options based on search term
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  // Get selected option objects for display
  const selectedOptionObjects = options.filter((option) => selectedOptions.includes(option.value))

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleToggleOption = (value) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value]

    onSelectionChange(newSelectedOptions)
  }

  const handleRemoveOption = (value) => {
    const newSelectedOptions = selectedOptions.filter((v) => v !== value)
    onSelectionChange(newSelectedOptions)
  }

  const handleClearAll = () => {
    onSelectionChange([])
  }

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchTerm("")
    }
  }

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {/* Selected Options Display */}
      {selectedOptionObjects.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {selectedOptionObjects.map((option) => (
            <div
              key={option.value}
              className="inline-flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
            >
              <span>{option.label}</span>
              <button
                type="button"
                onClick={() => handleRemoveOption(option.value)}
                className="hover:bg-blue-700 rounded-sm p-0.5 transition-colors"
                aria-label={`Remove ${option.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedOptionObjects.length > 1 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1 bg-red-600 px-2 py-1 rounded-md text-sm hover:bg-red-700 transition-colors text-white"
            >
              Clear All
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Dropdown Trigger */}
      <div
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors",
          isOpen && "ring-2 ring-blue-500 ring-offset-2",
        )}
        onClick={handleToggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={cn(selectedOptions.length === 0 && "text-gray-500")}>
          {selectedOptions.length === 0
            ? placeholder
            : `${selectedOptions.length} option${selectedOptions.length === 1 ? "" : "s"} selected`}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                {searchTerm ? "No options found" : "No options available"}
              </div>
            ) : (
              <div role="listbox">
                {filteredOptions.map((option) => {
                  const isSelected = selectedOptions.includes(option.value)
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors",
                        isSelected && "bg-blue-50 text-blue-900",
                      )}
                      onClick={() => handleToggleOption(option.value)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 border border-blue-600 rounded-sm mr-2 flex items-center justify-center",
                          isSelected && "bg-blue-600",
                        )}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <span className="flex-1">{option.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 
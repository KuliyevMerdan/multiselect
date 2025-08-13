import React, { useState, useEffect } from "react"
import { Multiselect, type MultiselectOption } from "./components/Multiselect"

function App() {
  const [timezoneOptions, setTimezoneOptions] = useState<MultiselectOption[]>([])
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("https://timeapi.io/api/timezone/availabletimezones")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const timezones: string[] = await response.json()

        const options: MultiselectOption[] = timezones.map((timezone) => ({
          label: timezone.replace(/_/g, " "),
          value: timezone,
        }))

        options.sort((a, b) => a.label.localeCompare(b.label))
        setTimezoneOptions(options)
      } catch (err) {
        console.error("Failed to fetch timezones:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch timezones")
      } finally {
        setLoading(false)
      }
    }

    fetchTimezones()
  }, [])

  const handleSelectionChange = (selectedValues: string[]) => {
    setSelectedTimezones(selectedValues)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading timezones...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Timezones</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Multiselect Component</h1>
          <p className="text-gray-600">Select multiple timezones from {timezoneOptions.length} available options</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">Select Timezones:</label>
          <Multiselect
            options={timezoneOptions}
            selectedOptions={selectedTimezones}
            onSelectionChange={handleSelectionChange}
            placeholder="Search and select timezones..."
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Selected: {selectedTimezones.length}</h3>
          {selectedTimezones.length === 0 ? (
            <p className="text-gray-500 italic">No timezones selected</p>
          ) : (
            <div className="space-y-1">
              {selectedTimezones.map((timezone) => {
                const option = timezoneOptions.find((opt) => opt.value === timezone)
                return (
                  <div key={timezone} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                    <span>{option?.label || timezone}</span>
                    <code className="text-xs bg-white px-2 py-1 rounded">{timezone}</code>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

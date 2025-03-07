"use client"

import { useState, useEffect } from 'react'

export default function EnvDebug() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    // Collect all environment variables
    const vars: Record<string, string> = {}
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('NEXT_PUBLIC_')) {
        vars[key] = process.env[key] || ''
      }
    })
    setEnvVars(vars)
  }, [])

  return (
    <div className="bg-slate-800 p-4 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Environment Variables Debug</h2>
      {Object.keys(envVars).length === 0 ? (
        <p className="text-red-500">No NEXT_PUBLIC_ environment variables found</p>
      ) : (
        <pre className="bg-slate-900 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      )}
    </div>
  )
} 
"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}api`;

type Barcode = {
  _id: string
  barcodeString: string
  generationTime: string
  model: string
  unitNumber: string
}

export default function BarcodeList() {
  const [barcodes, setBarcodes] = useState<Barcode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBarcodes = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/barcodes`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setBarcodes(data)
    } catch (error) {
      console.error('Error fetching barcodes:', error)
      setError(`Failed to fetch barcodes: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBarcodes()
  }, [])

  const handleRetry = () => {
    fetchBarcodes()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Generated Barcodes</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={handleRetry}>Retry</Button>
          </div>
        ) : barcodes.length === 0 ? (
          <div className="text-center text-gray-500">No barcodes generated yet</div>
        ) : (
          <ul className="space-y-2">
            {barcodes.map((barcode) => (
              <li key={barcode._id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <div className="flex flex-col">
                  <span className="font-medium">{barcode.model} - {barcode.unitNumber}</span>
                  <span className="text-sm text-gray-500">{barcode.barcodeString}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(barcode.generationTime).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}


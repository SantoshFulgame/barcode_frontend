"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import Barcode from "react-barcode"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PDFDocument from "./PDFDocument"
import type { Specification } from "./ui/types"

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}api`
const SPECIFICATION_URL = `${process.env.NEXT_PUBLIC_BACKEND_API}specification`

export default function BarcodeGenerator() {
  const [barcodeData, setBarcodeData] = useState({
    date: "",
    model: "",
    phase: "1",
    mppt: "1",
    location: "01",
    unitNumber: "",
  })
  const [barcodeString, setBarcodeString] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [specification, setSpecification] = useState<Specification | null>(null)
  const [usedSerials, setUsedSerials] = useState<Record<string, Set<string>>>({})
  const [status, setStatus] = useState<"idle" | "success" | "error" | "warning">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const fetchSpecification = useCallback(async (model: string) => {
    try {
      const response = await fetch(`${SPECIFICATION_URL}/get-specification/${model}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || "Unknown error"}`)
      }
      const data = await response.json()
      if (!data || !data.data) {
        throw new Error("Invalid data structure received from the server")
      }
      if (data.data.model !== model) {
        throw new Error(`No specification found for model ${model}`)
      }
      setSpecification(data.data)
    } catch (error) {
      console.error("Error fetching specification:", error)
      setStatus("error")
      setErrorMessage(`Failed to fetch specification: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }, [])

  const fetchUsedSerials = useCallback(async (model: string) => {
    try {
      const response = await fetch(`${API_URL}/model/${model}`)
      if (response.ok) {
        const data = await response.json()
        setUsedSerials((prev) => ({
          ...prev,
          [model]: new Set(data),
        }))
      } else {
        throw new Error("Failed to fetch used serials")
      }
    } catch (error) {
      console.error("Error fetching used serials:", error)
      setErrorMessage("Failed to fetch used serials. Please try again.")
    }
  }, [])

  useEffect(() => {
    if (barcodeData.model) {
      fetchSpecification(barcodeData.model)
      fetchUsedSerials(barcodeData.model)
    }
  }, [barcodeData.model, fetchSpecification, fetchUsedSerials])

  const getNextUnitNumber = useCallback(() => {
    const allUsedNumbers = new Set<number>()
    Object.values(usedSerials).forEach((modelSerials) => {
      modelSerials.forEach((serial) => {
        allUsedNumbers.add(Number.parseInt(serial))
      })
    })
    if (allUsedNumbers.size === 0) {
      return "001"
    }
    let counter = 1
    while (allUsedNumbers.has(counter)) {
      counter++
    }
    return counter.toString().padStart(3, "0")
  }, [usedSerials])

  const handleSelectChange = (name: string) => (value: string) => {
    setBarcodeData((prev) => ({ ...prev, [name]: value, unitNumber: "" }))
    if (name === "model") {
      setBarcodeString("")
      setStatus("idle")
      setErrorMessage("")
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setSelectedDate(date)
    const formattedDate = date.replace(/-/g, "")
    setBarcodeData((prev) => ({ ...prev, date: formattedDate }))
  }

  const handleUnitNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value && usedSerials[barcodeData.model]?.has(value)) {
      setStatus("warning")
      setErrorMessage(
        `Unit number ${value} is already used for model ${barcodeData.model}. Please use a different number.`,
      )
      return
    }
    setStatus("idle")
    setErrorMessage("")
    setBarcodeData((prev) => ({ ...prev, unitNumber: value }))
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setBarcodeData((prev) => ({ ...prev, location: value }))
  }

  const generateBarcode = async () => {
    setErrorMessage("")
    if (!barcodeData.model || !barcodeData.date) {
      setStatus("error")
      setErrorMessage("Please fill in all required fields.")
      return
    }

    let currentUnitNumber = barcodeData.unitNumber
    if (!currentUnitNumber) {
      currentUnitNumber = getNextUnitNumber()
      setBarcodeData((prev) => ({ ...prev, unitNumber: currentUnitNumber }))
    }

    if (usedSerials[barcodeData.model]?.has(currentUnitNumber)) {
      setStatus("warning")
      setErrorMessage(
        `Unit number ${currentUnitNumber} is already used for model ${barcodeData.model}. Please use a different number.`,
      )
      return
    }

    try {
      const response = await fetch(`${API_URL}/barcodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...barcodeData, unitNumber: currentUnitNumber }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to save barcode: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      const modifiedBarcodeString = data.barcodeString.replace(/ - Alpha/g, "").replace(/ /g, "")
      setBarcodeString(modifiedBarcodeString)
      setStatus("success")

      setUsedSerials((prev) => {
        const currentSet = prev[barcodeData.model] || new Set<string>()
        return {
          ...prev,
          [barcodeData.model]: new Set([...Array.from(currentSet), currentUnitNumber]),
        }
      })
    } catch (error) {
      console.error("Error saving barcode:", error)
      setStatus("error")
      setErrorMessage("Failed to generate barcode. Please try again.")
    }
  }

  const StatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-500" />
      case "error":
        return <XCircle className="text-red-500" />
      case "warning":
        return <AlertCircle className="text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Barcode Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" value={selectedDate} onChange={handleDateChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select name="model" value={barcodeData.model} onValueChange={handleSelectChange("model")}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XH 3300 - Alpha">XH 3300 - Alpha</SelectItem>
                <SelectItem value="XH 5000 - Alpha">XH 5000 - Alpha</SelectItem>
                <SelectItem value="XH 6300 - Alpha">XH 6300 - Alpha</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phase">Phase</Label>
            <Select name="phase" value={barcodeData.phase} onValueChange={handleSelectChange("phase")} disabled>
              <SelectTrigger>
                <SelectValue placeholder="1 Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mppt">MPPT</Label>
            <Select name="mppt" value={barcodeData.mppt} onValueChange={handleSelectChange("mppt")} disabled>
              <SelectTrigger>
                <SelectValue placeholder="1 MPPT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 MPPT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={barcodeData.location}
              onChange={handleLocationChange}
              placeholder="01 for Pune"
              pattern="\d{2}"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitNumber">Unit Number</Label>
            <Input
              id="unitNumber"
              name="unitNumber"
              value={barcodeData.unitNumber || getNextUnitNumber()}
              onChange={handleUnitNumberChange}
              placeholder="3 digit number"
              pattern="\d{3}"
              maxLength={3}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button className="w-full mr-2" onClick={generateBarcode}>
            Generate Barcode
          </Button>
          <StatusIcon />
        </div>
        {errorMessage && (
          <p className={`mt-2 ${status === "error" ? "text-red-500" : "text-yellow-500"}`}>{errorMessage}</p>
        )}
        {status === "success" && <p className="text-green-500 mt-2">Barcode generated successfully!</p>}

        {barcodeString && specification && (
          <div className="mt-8 p-6 border rounded-lg space-y-4 text-sm">
            <h2 className="text-lg font-bold mb-4">Product Label</h2>
            <div>Product Name: Solar Inverter</div>
            <div>Model: {specification.model}</div>
            <div>Protection Degree: {specification.generalParameters.protectionDegree}</div>
            <div>Degree Class: Class I</div>
            <div>Rated Power: {specification.gridConnectedOperation.maxContinuousPower}</div>
            <div>
              AC Input: {specification.gridConnectedOperation.ratedOutputVoltage},{" "}
              {specification.gridConnectedOperation.ratedOutputFrequency},{" "}
              {specification.mixedOperation.maxContinuousCurrent}max
            </div>
            <div>
              GRID/AC Output: {specification.gridConnectedOperation.ratedOutputVoltage},{" "}
              {specification.gridConnectedOperation.ratedOutputFrequency},{" "}
              {specification.gridConnectedOperation.ratedOutputCurrent}
            </div>

            <div className="font-bold mt-4">Battery Parameter</div>
            <div>
              DC Input: {specification.dcinputbattery.ratedBatteryVoltage},{" "}
              {specification.dcinputbattery.maxContinuousCurrent}
            </div>
            <div>Max.AC Charging Current: {specification.dcinputbattery.maxAcChargingCurrent}</div>
            <div>Max.PV Charging Current: {specification.pvInput.maxOperatingPvInputCurrent}</div>
            <div>Max.Charging Current: {specification.dcinputbattery.maxContinuousCurrent}</div>

            <div className="font-bold mt-4">PV Input Parameter</div>
            <div>Max. PV Input Power: {specification.pvInput.maxPvInputPower}</div>
            <div>Max. PV Input Voltage(Voc): {specification.pvInput.maxPvInputVoltage}</div>
            <div>Max. PV Input Current: {specification.pvInput.maxOperatingPvInputCurrent}</div>
            <div>MPPT Tracking Range: {specification.pvInput.pvInputOperatingVoltageRange}</div>
            <div>Rated PV Input Voltage: {specification.pvInput.ratedVoltage}</div>

            <div>Number of MPPT: {specification.pvInput.mpptTrackingChannels}</div>

            <div className="mt-4">
              <Barcode value={barcodeString} />
              <div className="mt-2">S/N: {barcodeString}</div>
            </div>
          </div>
        )}

        {barcodeString && specification && (
          <div className="space-y-4">
            <PDFDownloadLink
              document={<PDFDocument specification={specification} barcodeString={barcodeString} />}
              fileName={`${barcodeData.model}_${barcodeData.unitNumber}.pdf`}
            >
              {({ loading }) => (
                <Button className="w-full" disabled={loading}>
                  {loading ? "Generating PDF..." : "Export Label as PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


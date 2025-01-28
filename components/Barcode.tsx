import React from "react"
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer"
import JsBarcode from "jsbarcode"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: "2mm",
    width: "100%",
  },
  barcode: {
    marginBottom: "1mm",
  },
  text: {
    fontSize: 4,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    width: "100%",
  },
})

interface PDFBarcodeProps {
  value: string
  width?: number
  height?: number
}

export const PDFBarcode: React.FC<PDFBarcodeProps> = ({ value, width = 50, height = 15 }) => {
  // Generate a data URL for the barcode
  const barcodeDataURL = React.useMemo(() => {
    if (typeof window === "undefined") return "" // Server-side rendering check
    const canvas = document.createElement("canvas")
    JsBarcode(canvas, value, {
      format: "CODE128",
      width: 1,
      height: height,
      displayValue: false,
      margin: 0,
      background: "#ffffff",
    })
    return canvas.toDataURL("image/png")
  }, [value, height])

  return (
    <View style={[styles.container, { width: `${width}mm` }]}>
      <Image
        style={[styles.barcode, { width: `${width}mm`, height: `${height}mm` }]}
        src={barcodeDataURL || "/placeholder.svg"}
        // @ts-ignore
        alt={`Barcode for serial number: ${value}`}
      />
      <Text style={styles.text}>S/N : {value}</Text>
    </View>
  )
}

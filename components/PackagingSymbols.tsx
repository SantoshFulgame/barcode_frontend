import React from "react"
import { View, Image, StyleSheet } from "@react-pdf/renderer"
import type { StaticImageData } from "next/image"

// Import images
import Caution from "../app/images/Caution.png"
import manualBooksImage from "../app/images/Manual Icon.png"
import warningImage from "../app/images/Warning.png"
import hotSurface from "../app/images/Hot_Surface.png"
import WEEE_symbol from "../app/images/WEEE_symbol_vectors (2).png"
import processing from "../app/images/10min.png"


const styles = StyleSheet.create({
  symbolsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1mm 1mm", // Reduced horizontal padding
    borderTop: 0.5,
    borderColor: "#000000",
    width: "100%",
  },
  symbol: {
    width: "7mm",
    height: "7mm",
    objectFit: "contain",
  },
  cautionSymbol: {
    width: "6.5mm", // Slightly smaller than other symbols
    height: "6mm",
    objectFit: "contain",
    marginTop: "1mm", // Adjust this value to move the symbol downward
  },  
  closelySpacedSymbol: {
    width: "5.5mm",
    height: "5.5mm",
    position: "absolute", // Overlapping effect
    left: "5.5mm", // Adjust overlap position to move right
    top: "1mm", // Move upward
    objectFit: "contain",
  },
  compactRow: {
    position: "relative", // Parent must have relative positioning
    width: "10mm", // Width to fit overlapping items
    height: "7mm", // Same as the symbol's height
    marginRight: "1mm", // Add spacing to the right
  },
});

const SymbolImage = ({ src, style = styles.symbol }: { src: StaticImageData; style?: any }) => (
  <View style={style}>
    <Image
      src={src.src || "/placeholder.svg"}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  </View>
);

export const PackagingSymbols = () => (
  <View style={styles.symbolsContainer}>
    <View style={styles.compactRow}>
        <SymbolImage src={Caution} style={styles.cautionSymbol} />
      <SymbolImage src={processing} style={styles.closelySpacedSymbol} />
    </View>
    <SymbolImage src={warningImage} />
    <SymbolImage src={Caution} style={styles.cautionSymbol} />
    <SymbolImage src={hotSurface} />
    <SymbolImage src={manualBooksImage} />
    <SymbolImage src={WEEE_symbol} />
  </View>
);

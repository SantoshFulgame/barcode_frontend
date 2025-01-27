import React from "react"
import { View, Image, StyleSheet } from "@react-pdf/renderer"
import type { StaticImageData } from "next/image"
import type { Style } from "@react-pdf/types"

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
    padding: "1mm 1mm",
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
    width: "6.5mm",
    height: "6mm",
    objectFit: "contain",
    marginTop: "1mm",
  },  
  closelySpacedSymbol: {
    width: "5.5mm",
    height: "5.5mm",
    position: "absolute",
    left: "5.5mm",
    top: "1mm",
    objectFit: "contain",
  },
  compactRow: {
    position: "relative",
    width: "10mm",
    height: "7mm",
    marginRight: "1mm",
  },
});

interface SymbolImageProps {
  src: StaticImageData;
  style?: Style;
  alt: string;
}

const SymbolImage: React.FC<SymbolImageProps> = ({ src, style = styles.symbol, alt }) => (
  <View style={style}>
    <Image
      src={src.src || "/placeholder.svg"}
      style={{
        width: "100%",
        height: "100%",
      }}
      alt={alt}
    />
  </View>
);

export const PackagingSymbols: React.FC = () => (
  <View style={styles.symbolsContainer}>
    <View style={styles.compactRow}>
      <SymbolImage src={Caution} style={styles.cautionSymbol} alt="Caution symbol" />
      <SymbolImage src={processing} style={styles.closelySpacedSymbol} alt="Processing time 10 minutes" />
    </View>
    <SymbolImage src={warningImage} alt="Warning symbol" />
    <SymbolImage src={Caution} style={styles.cautionSymbol} alt="Caution symbol" />
    <SymbolImage src={hotSurface} alt="Hot surface warning" />
    <SymbolImage src={manualBooksImage} alt="Manual books" />
    <SymbolImage src={WEEE_symbol} alt="WEEE recycling symbol" />
  </View>
);


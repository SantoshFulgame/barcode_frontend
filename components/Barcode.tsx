// // UIBarcode.tsx - For regular React UI
// import React, { useEffect, useRef } from 'react';
// import JsBarcode from 'jsbarcode';

// interface UIBarcodeProps {
//   value: string;
//   width?: number;
//   height?: number;
// }

// export const UIBarcode: React.FC<UIBarcodeProps> = ({
//   value,
//   width = 1.5,
//   height = 70
// }) => {
//   const barcodeRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (barcodeRef.current && value) {
//       try {
//         JsBarcode(barcodeRef.current, value, {
//           format: 'CODE128',
//           width,
//           height,
//           displayValue: true,
//           font: 'monospace',
//           fontSize: 14,
//           margin: 10,
//           background: '#ffffff'
//         });
//       } catch (error) {
//         console.error('Error generating barcode:', error);
//       }
//     }
//   }, [value, width, height]);

//   return <svg ref={barcodeRef} />;
// };

// // PDFBarcode.tsx - For React-PDF documents
// import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',        // Center contents horizontally
//     marginVertical: 10,
//     width: '100%',              // Take full width
//   },
//   barcode: {
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 5,
//     fontFamily: 'Helvetica-Bold',
//     textAlign: 'center',        // Center the text
//     width: '100%',              // Make text take full width
//   }
// });

// interface PDFBarcodeProps {
//   value: string;
//   width?: number;
//   height?: number;
// }

// export const PDFBarcode: React.FC<PDFBarcodeProps> = ({
//   value,
//   width = 200,
//   height = 50
// }) => {
//   // Generate a data URL for the barcode
//   const generateBarcodeDataURL = () => {
//     const canvas = document.createElement('canvas');
//     JsBarcode(canvas, value, {
//       format: 'CODE128',
//       width: 1,
//       height: height,
//       displayValue: false,
//       margin: 10,
//       background: '#ffffff'
//     });
//     return canvas.toDataURL('image/png');
//   };

//   return (
//     <View style={[styles.container, { width }]}>  {/* Set container width to match prop */}
//       <Image
//         style={[styles.barcode, { width, height }]}
//         src={generateBarcodeDataURL()}
//       />
//       <Text style={styles.text}>S/N : {value}</Text>
//     </View>
//   );
// };


import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: '2mm',
    width: '100%',
  },
  barcode: {
    marginBottom: '1mm',
  },
  text: {
    fontSize: 4,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    width: '100%',
  }
});

interface PDFBarcodeProps {
  value: string;
  width?: number;
  height?: number;
}

export const PDFBarcode: React.FC<PDFBarcodeProps> = ({
  value,
  width = 50,
  height = 15
}) => {
  // Generate a data URL for the barcode
  const generateBarcodeDataURL = () => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, value, {
      format: 'CODE128',
      width: 1,
      height: height,
      displayValue: false,
      margin: 0,
      background: '#ffffff'
    });
    return canvas.toDataURL('image/png');
  };

  return (
    <View style={[styles.container, { width: `${width}mm` }]}>
      <Image
        style={[styles.barcode, { width: `${width}mm`, height: `${height}mm` }]}
        src={generateBarcodeDataURL() || "/placeholder.svg"}
      />
      <Text style={styles.text}>S/N : {value}</Text>
    </View>
  );
};


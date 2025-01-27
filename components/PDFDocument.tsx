
import React from "react"
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import { PDFBarcode } from "./Barcode"
import { PackagingSymbols } from "./PackagingSymbols"
import type { Specification } from "./ui/types"

// Register font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#e5e5e5",
    padding: 0,
    fontFamily: "Roboto",
  },
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    border: 0.5,
    borderColor: "#000000",
    padding: 3, // Slightly reduced padding
    width: "100%",
    height: "100%",
  },
  header: {
    backgroundColor: "#333333",
    padding: 2,
    marginBottom: 3,
    height: "4%",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 4,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 4, // Reduced font size
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "#cccccc",
    padding: 1, // Adjusted padding for better compactness
    marginBottom: 2,
  },
  //   sectionTitle: { fontSize: 5, fontFamily: 'Roboto', fontWeight: 'bold', backgroundColor: '#cccccc', padding: 1, marginBottom: 1 },
  row: {
    flexDirection: "row",
    marginBottom: 1,
    borderBottom: 0.25,
    borderColor: "#cccccc",
    paddingVertical: 1, // Reduced padding
  },
  label: {
    fontSize: 3.5, // Reduced font size
    width: "60%",
    fontFamily: "Roboto",
  },
  value: {
    fontSize: 3.5, // Reduced font size
    width: "40%",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  barcode: {
    marginTop: 3,
    alignItems: "center",
    borderTop: 0.5,
    borderColor: "#000000",
    paddingTop: 2,
  },
  footer: {
    marginTop: 2,
    borderTop: 0.5,
    borderColor: "#000000",
    paddingTop: 2,
  },
  manufacturerInfoContainer: {
    marginTop: 2,
    marginBottom: 2,
    borderTop: 0.25,
    borderBottom: 0.25,
    borderColor: "#cccccc",
    padding: 1, // Reduced padding for a more compact layout
  },
  manufacturerInfo: {
    fontSize: 3.5, // Reduced font size
    fontFamily: "Roboto",
    textAlign: "left",
    lineHeight: 1.5,
  },
  companyName: {
    fontSize: 4, // Reduced font size
    fontWeight: "bold",
    marginBottom: 1,
  },
  contactInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
  },
  website: {
    textAlign: "left",
  },
  madeInIndia: {
    fontSize: 4, // Reduced font size
    fontFamily: "Roboto",
    textAlign: "right",
    marginTop: 2,
    fontWeight: "bold",
  },
})

const PDFDocument = ({
  specification,
  barcodeString,
}: { specification: Specification; barcodeString: string }) => (
  <Document>
    <Page size={[158, 280]} style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Product Name: Solar Inverter</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Specifications:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Model: </Text>
            <Text style={styles.value}>{specification.model}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Protective class:</Text>
            <Text style={styles.value}>Class I</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ingress protection (IP) rating per Part 1:</Text>
            <Text style={styles.value}>{specification.generalParameters.protectionDegree}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PV Input Ratings:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Vmax PV (absolute maximum):</Text>
            <Text style={styles.value}>{specification.pvInput.maxPvInputVoltage}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Isc PV (absolute maximum):</Text>
            <Text style={styles.value}>{specification.pvInput.iscPvAbsoluteMaximum}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>MPPT Voltage Range (Vdc):</Text>
            <Text style={styles.value}>{specification.pvInput.pvInputOperatingVoltageRange}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Max DC Input Power:</Text>
            <Text style={styles.value}>{specification.pvInput.maxPvInputPower}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A.C. Output Ratings:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Voltage (range):</Text>
            <Text style={styles.value}>{specification.gridConnectedOperation.gridVoltageRange},1Φ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Current (maximum continuous):</Text>
            <Text style={styles.value}>{specification.gridConnectedOperation.maxContinuousCurrent}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Frequency (nominal):</Text>
            <Text style={styles.value}>{specification.gridConnectedOperation.ratedOutputFrequency}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Power (maximum continuous):</Text>
            <Text style={styles.value}>{specification.gridConnectedOperation.maxContinuousPower}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Power factor range:</Text>
            <Text style={styles.value}>{specification.gridConnectedOperation.powerFactor}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A.C. Input Ratings:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Voltage (range):</Text>
            <Text style={styles.value}>{specification.mixedOperation.mainsInputVoltageRange},1Φ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Current (maximum continuous):</Text>
            <Text style={styles.value}>{specification.mixedOperation.maxContinuousCurrent}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Frequency (nominal):</Text>
            <Text style={styles.value}>{specification.mixedOperation.ratedInputFrequency}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Battery Ratings:</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Voltage (nominal):</Text>
            <Text style={styles.value}>{specification.dcinputbattery.ratedBatteryVoltage}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Current (maximum continuous):</Text>
            <Text style={styles.value}>{specification.dcinputbattery.maxContinuousCurrent}</Text>
          </View>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>D.C. Output Ratings</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Voltage (nominal or range):</Text>
            <Text style={styles.value}>Vdc </Text>
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>Current (maximum or continuous):</Text>
            <Text style={styles.value}>Adc </Text>
          </View>
        </View> */}

        <View style={styles.footer}>
          <View style={styles.barcode}>
            <PDFBarcode value={barcodeString} width={40} height={5} />
          </View>
          <PackagingSymbols />

          <View style={styles.manufacturerInfoContainer}>
            <Text style={[styles.manufacturerInfo, styles.companyName]}>Xenvolt Technologies Pvt. Ltd.</Text>

            <Text style={styles.manufacturerInfo}>3rd Floor, Aeromall, DOMESTIC Airport Rd, Pune</Text>
            <Text style={styles.manufacturerInfo}>International Airport Area, Lohegaon, Pune, Maharashtra 411032.</Text>
            <View style={styles.contactInfo}>
              {/* <Text style={styles.manufacturerInfo}>
                Tel: +91 xx xx xx xx xx
              </Text> */}
              <Text style={styles.manufacturerInfo}>Email: support@xenvolt.ai</Text>
            </View>
          </View>

          <Text style={styles.madeInIndia}>Made in India</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default PDFDocument



// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import { PDFBarcode } from './Barcode';
// import { PackagingSymbols } from './PackagingSymbols';

// // Register font
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 'normal' },
//     { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
//   ],
// });

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#e5e5e5',
//     padding: 0,
//     fontFamily: 'Roboto',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#e5e5e5',
//     border: 0.5,
//     borderColor: '#000000',
//     padding: 3, // Slightly reduced padding
//     width: '100%',
//     height: '100%',
//   },
//   header: {
//     backgroundColor: '#333333',
//     padding: 2,
//     marginBottom: 3,
//     height: '4%'
//   },
//   headerText: {
//     color: '#ffffff',
//     fontSize: 4, 
//     fontFamily: 'Roboto',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 3,
//   },
//   sectionTitle: {
//     fontSize: 4, // Reduced font size
//     fontFamily: 'Roboto',
//     fontWeight: 'bold',
//     backgroundColor: '#cccccc',
//     padding: 1, // Adjusted padding for better compactness
//     marginBottom: 2,
//   },
//   //   sectionTitle: { fontSize: 5, fontFamily: 'Roboto', fontWeight: 'bold', backgroundColor: '#cccccc', padding: 1, marginBottom: 1 },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 1,
//     borderBottom: 0.25,
//     borderColor: '#cccccc',
//     paddingVertical: 1, // Reduced padding
//   },
//   label: {
//     fontSize: 3.5, // Reduced font size
//     width: '60%',
//     fontFamily: 'Roboto',
//   },
//   value: {
//     fontSize: 3.5, // Reduced font size
//     width: '40%',
//     fontFamily: 'Roboto',
//     fontWeight: 'bold',
//   },
//   barcode: {
//     marginTop: 3,
//     alignItems: 'center',
//     borderTop: 0.5,
//     borderColor: '#000000',
//     paddingTop: 2,
//   },
//   footer: {
//     marginTop: 2,
//     borderTop: 0.5,
//     borderColor: '#000000',
//     paddingTop: 2,
//   },
//   manufacturerInfoContainer: {
//     marginTop: 2,
//     marginBottom: 2,
//     borderTop: 0.25,
//     borderBottom: 0.25,
//     borderColor: '#cccccc',
//     padding: 1, // Reduced padding for a more compact layout
//   },
//   manufacturerInfo: {
//     fontSize: 3.5, // Reduced font size
//     fontFamily: 'Roboto',
//     textAlign: 'left',
//     lineHeight: 1.5,
//   },
//   companyName: {
//     fontSize: 4, // Reduced font size
//     fontWeight: 'bold',
//     marginBottom: 1,
//   },
//   contactInfo: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 1,
//   },
//   website: {
//     textAlign: 'left',
//   },
//   madeInIndia: {
//     fontSize: 4, // Reduced font size
//     fontFamily: 'Roboto',
//     textAlign: 'right',
//     marginTop: 2,
//     fontWeight: 'bold',
//   },
// });


// const PDFDocument = ({ barcodeString }) => (
//   <Document>
//     <Page size={[158, 280]} style={styles.page}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Product Name: Solar Inverter</Text>
//         </View>

//         <View style={styles.section}>
//         <Text style={styles.sectionTitle}>General Specifications:</Text>
//           <View style={styles.row}>
//             <Text style={styles.label}>Model: </Text>
//             <Text style={styles.value}>XH 5000 - Alpha</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Protective class:</Text>
//             <Text style={styles.value}>Class I</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Ingress protection (IP) rating per Part 1:</Text>
//             <Text style={styles.value}>IP20</Text>
//           </View>
//         </View>
        

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>PV Input Ratings:</Text>
//           <View style={styles.row}>
//             <Text style={styles.label}>Vmax PV (absolute maximum):</Text>
//             <Text style={styles.value}>500Vdc</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Isc PV (absolute maximum):</Text>
//             <Text style={styles.value}>27Adc</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>MPPT Voltage Range (Vdc):</Text>
//             <Text style={styles.value}>80Vdc~450Vdc</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Max DC Input Power:</Text>
//             <Text style={styles.value}>7000W</Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>A.C. Output Ratings:</Text>
//           <View style={styles.row}>
//             <Text style={styles.label}>Voltage (range):</Text>
//             <Text style={styles.value}>187~264Vac,1Φ</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Current (maximum continuous):</Text>
//             <Text style={styles.value}>21.7Aac</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Frequency (nominal):</Text> 
//             <Text style={styles.value}>50Hz/60Hz</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Power (maximum continuous):</Text>
//             <Text style={styles.value}>5000VA</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Power factor range:</Text>
//             <Text style={styles.value}>{'>0.98'}</Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>A.C. Input Ratings:</Text>
//           <View style={styles.row}>
//             <Text style={styles.label}>Voltage (range):</Text>
//             <Text style={styles.value}>187~264Vac,1Φ</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Current (maximum continuous):</Text>
//             <Text style={styles.value}>41.2Aac</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Frequency (nominal):</Text>
//             <Text style={styles.value}>50Hz/60Hz</Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Battery Ratings:</Text>
//           <View style={styles.row}>
//             <Text style={styles.label}>Voltage (nominal):</Text>
//             <Text style={styles.value}>48Vdc</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Current (maximum continuous):</Text>
//             <Text style={styles.value}>120Adc</Text>
//           </View>
//         </View>

//         {/* <View style={styles.section}>
//           <Text style={styles.sectionTitle}>D.C. Output Ratings</Text>
//           <View style={styles.row}>
//             <Text style={styles.label}>Voltage (nominal or range):</Text>
//             <Text style={styles.value}>Vdc </Text>
//           </View>


//           <View style={styles.row}>
//             <Text style={styles.label}>Current (maximum or continuous):</Text>
//             <Text style={styles.value}>Adc </Text>
//           </View>
//         </View> */}

//         <View style={styles.footer}>
//           <View style={styles.barcode}>
//             <PDFBarcode value={barcodeString} width={40} height={5} />
//           </View>
//           <PackagingSymbols />

//           <View style={styles.manufacturerInfoContainer}>
//           <Text style={[styles.manufacturerInfo, styles.companyName]}>
//             Xenvolt Technologies Pvt. Ltd.
//           </Text>

//             <Text style={styles.manufacturerInfo}>
//               3rd Floor, Aeromall, DOMESTIC Airport Rd, Pune
//             </Text>
//             <Text style={styles.manufacturerInfo}>
//               International Airport Area, Lohegaon, Pune, Maharashtra 411032.
//             </Text>
//             <View style={styles.contactInfo}>
//               {/* <Text style={styles.manufacturerInfo}>
//                 Tel: +91 xx xx xx xx xx
//               </Text> */}
//               <Text style={styles.manufacturerInfo}>
//                 Email: support@xenvolt.ai
//               </Text>
//             </View>
//           </View>

//           <Text style={styles.madeInIndia}>Made in India</Text>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// export default PDFDocument;


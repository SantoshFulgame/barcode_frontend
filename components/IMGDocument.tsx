'use client'

import React, { useRef,useState } from 'react';
import html2canvas from 'html2canvas';
import Barcode from 'react-barcode';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PackagingSymbols } from './PackagingSymbols';

const LabelImageExport = ({ specification, barcodeData, barcodeString }) => {
  const labelRef = useRef(null);
  const [imageFormat, setImageFormat] = useState('png');

  const exportAsImage = async () => {
    if (!labelRef.current) return;

    try {
      const canvas = await html2canvas(labelRef.current, {
        scale: 3, // Higher scale for better resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: labelRef.current.offsetWidth,
        height: labelRef.current.offsetHeight
      });

      // Convert to blob
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${barcodeData.model}_${barcodeData.unitNumber}.${imageFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, `image/${imageFormat}`);
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Select value={imageFormat} onValueChange={setImageFormat}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={exportAsImage}>
          Export as Image
        </Button>
      </div>

      <div 
        ref={labelRef} 
        className="p-8 bg-white border rounded-lg space-y-4"
        style={{ width: '595px' }} // A5 width in pixels
      >
        <div className="text-xl font-bold text-center bg-gray-800 text-white p-2 rounded">
          Product Name: Solar Inverter
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-bold bg-gray-100 p-2">Model: {barcodeData.model}</div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>Protection Degree: {specification.generalParameters.protectionDegree}</div>
            <div>Degree Class: Class I</div>
            <div>Rated Power: {specification.gridConnectedOperation.ratedOutputPower}</div>
            <div>AC Input: 230VAC, 1Φ, 50Hz/60Hz, 41.2Amax</div>
            <div>GRID/AC Output: 230VAC, 1Φ, 50Hz/60Hz, 21.7A</div>
          </div>

          <div className="font-bold mt-4 bg-gray-100 p-2">Battery Parameter</div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>DC Input: 48VDC, 120A</div>
            <div>Max. AC Charging Current: 80A</div>
            <div>Max. PV Charging Current: 120A</div>
            <div>Max. Charging Current: 120A</div>
          </div>

          <div className="font-bold mt-4 bg-gray-100 p-2">PV Input Parameter</div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>Max. PV Input Power: 7000W</div>
            <div>Max. PV Input Voltage(Voc): 500VDC</div>
            <div>Max. PV Input Current: 27A</div>
            <div>MPPT Tracking Range: 80~450VDC</div>
            <div>Rated PV Input Voltage: 360VDC</div>
            <div>Number of MPPT: 1</div>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-2">
  {/* Barcode */}
  <div className="flex justify-center">
    <Barcode value={barcodeString} />
  </div>

  {/* Serial Number */}
  <div className="text-sm text-center w-full">
    S/N: {barcodeString}
  </div>
</div>


          <PackagingSymbols />
        </div>
      </div>
    </div>
  );
};

export default LabelImageExport;
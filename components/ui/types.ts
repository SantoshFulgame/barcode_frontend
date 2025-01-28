import type { PDFDownloadLinkProps as OriginalPDFDownloadLinkProps } from "@react-pdf/renderer"

export interface PDFDownloadLinkRenderProps {
  blob: Blob | null
  url: string | null
  loading: boolean
  error: Error | null
}

export type PDFDownloadLinkProps = Omit<OriginalPDFDownloadLinkProps, "children"> & {
  children: (props: PDFDownloadLinkRenderProps) => React.ReactNode
}

export type Specification = {
  model: string
  pvInput: {
    maxPvInputPower: string
    pvInputOperatingVoltageRange: string
    ratedVoltage: string
    maxPvInputVoltage: string
    maxOperatingPvInputCurrent: string
    iscPvAbsoluteMaximum: string
    mpptTrackingChannels: string
    maxInverterBackfeedToArray: string
  }
  dcinputbattery: {
    batteryType: string
    ratedBatteryVoltage: string
    batteryVoltageRange: string
    maxContinuousCurrent: string
    maxAcChargingCurrent: string
  }
  gridConnectedOperation: {
    maxContinuousPower: string
    ratedOutputVoltage: string
    gridVoltageRange: string
    ratedOutputFrequency: string
    frequencyRange: string
    ratedOutputCurrent: string
    maxContinuousCurrent: string
    inrushCurrent: string
    powerFactor: string
    maxOutputFaultCurrent: string
    maxOutputOvercurrentProtection: string
  }
  offGridOperation: {
    ratedInputVoltage: string
    mainsInputVoltageRange: string
    ratedInputFrequency: string
    inputFrequencyRange: string
    acOutput: {
      maxContinuousPower: string
      ratedOutputVoltage: string
      outputVoltageAccuracy: string
      ratedInputFrequency: string
      outputFrequencyAccuracy: string
      outputWave: string
    }
  }
  mixedOperation: {
    ratedInputVoltage: string
    mainsInputVoltageRange: string
    ratedInputFrequency: string
    inputFrequencyRange: string
    maxContinuousCurrent: string
    acOutput: {
      maxContinuousPower: string
      ratedVoltage: string
      maxOutputFaultCurrent: string
      maxOutputOvercurrentProtection: string
      outputCurrent: string
      maxContinuousCurrent: string
      inrushCurrent: string
    }
  }
  generalParameters: {
    maxConversionEfficiency: string
    mpptTrackingEfficiency: string
    transferTime: string
    display: string
    coolingMethod: string
    communication: string
    protectionDegree: string
    installation: string
  }
  protection: {
    batteryLowVoltageAlarm: string
    batteryLowVoltageProtection: string
    antiIslandingProtection: string
    overloadPowerProtection: string
    outputShortCircuitProtection: string
    temperatureProtection: string
  }
  environment: {
    operatingTemperature: string
    storageTemperature: string
    noiseLevel: string
    elevation: string
    humidity: string
  }
  dimensionsAndWeight: {
    productSize: string
    packageSize: string
    netWeight: string
    grossWeight: string
  }
}



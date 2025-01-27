import BarcodeGenerator from '../components/BarcodeGenerator'
import BarcodeList from '../components/BarcodeList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <BarcodeGenerator />
      <BarcodeList />
    </main>
  )
}


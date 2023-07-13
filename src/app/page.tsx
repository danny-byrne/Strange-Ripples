import Image from 'next/image'
import dynamic from 'next/dynamic'
import {useClient} from 'react-server-dom-webpack/plugin';




export default function Home() {
  useClient();
  const DocxReader = dynamic(() => import('./components/DocReader'), { ssr: false });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DocxReader />
    </main>
  )
}
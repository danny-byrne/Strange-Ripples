'use client'
import dynamic from 'next/dynamic'

export default function Home() {

  const DocxReader = dynamic(() => import('./components/DocReader'), { ssr: false });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DocxReader />
    </main>
  )
}
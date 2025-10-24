import { Toaster } from 'sonner'
import { GeneratorInterface } from '@/components/GeneratorInterface'

function App() {
  return (
    <>
      <GeneratorInterface />
      <Toaster position="top-right" />
    </>
  )
}

export default App
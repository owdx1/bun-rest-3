import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTotal = async () => {
      setLoading(true);
      const resp = await fetch("/api/expenses/total-expense")

      const body = await resp.json();
      setTotal(body.total)
      console.log(body)
      
    }

    fetchTotal();
  }, [])

  return (
    <div className="text-green-600">
      ananı götünden
      <Button variant="ghost" className="hover::bg-slate-300">ananı maından</Button>
      {total}
    </div>
  )
}

export default App

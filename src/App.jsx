import { useState, useEffect } from 'react'
import './App.css'
import FundingBarChart from './components/FundingBarChart'
import IndustryTrendChart from './components/IndustryTrendChart'

function App() {
  const [fundingData, setFundingData] = useState(null)

  useEffect(() => {
    fetch('/funding.json')
      .then((response) => response.json())
      .then((data) => setFundingData(data))
      .catch((error) => console.error('Error loading funding data:', error))
  }, [])

  return (
    <div>
      <h1>Funding Tracker</h1>
      <div>
        <h2>Funding Data:</h2>
        <pre>{fundingData ? JSON.stringify(fundingData, null, 2) : 'Loading...'}</pre>
      </div>
      {fundingData && <FundingBarChart fundingData={fundingData} />}
      {fundingData && <IndustryTrendChart fundingData={fundingData} />}
    </div>
  )
}

export default App

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
        {fundingData ? (
          <table className="funding-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Industry</th>
                <th>Funding</th>
              </tr>
            </thead>
            <tbody>
              {fundingData.map((item, index) => (
                <tr key={index}>
                  <td>{item.year}</td>
                  <td>{item.industry}</td>
                  <td>${item.funding.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {fundingData && (
        <div className="chart-container">
          <FundingBarChart fundingData={fundingData} />
        </div>
      )}
      {fundingData && (
        <div className="chart-container">
          <IndustryTrendChart fundingData={fundingData} />
        </div>
      )}
    </div>
  )
}

export default App

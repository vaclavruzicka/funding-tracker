import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function FundingBarChart({ fundingData }) {
  // Calculate total funding by year
  const fundingByYear = fundingData.reduce((acc, item) => {
    const year = item.year
    acc[year] = (acc[year] || 0) + item.funding
    return acc
  }, {})

  const years = Object.keys(fundingByYear)
  const totals = Object.values(fundingByYear)

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Total Funding',
        data: totals,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Funding by Year',
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default FundingBarChart
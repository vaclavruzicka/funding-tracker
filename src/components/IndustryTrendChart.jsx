import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function IndustryTrendChart({ fundingData }) {
  // Group data by industry and year
  const fundingByIndustry = fundingData.reduce((acc, item) => {
    const { industry, year, funding } = item
    if (!acc[industry]) acc[industry] = {}
    acc[industry][year] = (acc[industry][year] || 0) + funding
    return acc
  }, {})

  const years = [...new Set(fundingData.map((item) => item.year))].sort()
  const industries = Object.keys(fundingByIndustry)

  const datasets = industries.map((industry) => ({
    label: industry,
    data: years.map((year) => fundingByIndustry[industry][year] || 0),
    borderColor: getRandomColor(),
    backgroundColor: 'rgba(0, 0, 0, 0)',
    tension: 0.4,
  }))

  const data = {
    labels: years,
    datasets,
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Funding Trends by Industry',
      },
    },
  }

  return <Line data={data} options={options} />
}

// Helper function to generate random colors for each industry
function getRandomColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgba(${r}, ${g}, ${b}, 0.6)`
}

export default IndustryTrendChart
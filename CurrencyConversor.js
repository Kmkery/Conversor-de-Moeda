const getUrl = (selectedCurrency = 'USD') => {
  const APIKey = ''
  return `https://v6.exchangerate-api.com/v6/${APIKey}latest/${selectedCurrency}`
}

const getCurrencies = () => {
  let resultedCurrencies = {}
    
  return {
    setValue(value){
      resultedCurrencies = value
    },
    getValue(){
      return resultedCurrencies
    }
  }
}
  
const currencies = getCurrencies() 
  
const getAPIData = async selectedCurrency => {
  try {
    const response = await fetch(getUrl(selectedCurrency)) 
      
    if(!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }
    return response.json()
  } catch ( {name, message} ) {
    alert(`${name}: ${message}`)
  }
}
    
const setCurrenciesData = async selectedCurrency => {
  const { conversion_rates } = await getAPIData(selectedCurrency)
  currencies.setValue(conversion_rates)
}
  

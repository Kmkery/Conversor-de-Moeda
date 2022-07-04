const currencysObj = () => {
  const APIKey = '69762103e707c24047f0d55b'
  let resultedCurrencys = {}
    
  return {
    setValue(value){
      resultedCurrencys = value
    },
    getValue(){
      return resultedCurrencys
    },
    getUrl(selectedCurrency = 'USD'){
      return `https://v6.exchangerate-api.com/v6/${APIKey}latest/${selectedCurrency}`
    },
    fetchData(url){
      return fetch(url)
    }
  }
}
  
const currencys = currencysObj() 
  
const getAPIData = async selectedCurrency => {
  try {
    const response = await currencys.fetchData(currencys.getUrl(selectedCurrency)) 
      
    if(!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }
    return response.json()
  } catch ( {name, message} ) {
    alert(`${name}: ${message}`)
  }
}
    
const getCurrencysData = async selectedCurrency => {
  const { conversion_rates } = await getAPIData(selectedCurrency)
  currencys.setValue(conversion_rates)
}
  
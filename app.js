const currencysOptionsContainer = document.querySelector('[data-js="currencys-options-container"]')
const firstCurrency = document.querySelector('[data-js="currency-one"]')
const secondCurrency = document.querySelector('[data-js="currency-two"]')
const precisionInput = document.querySelector('[data-js="currency-one-times"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const conversionPrecision = document.querySelector('[data-js="conversion-precision"]')


const renderConvertedCurrencyValues = () => {
  const conversionResult = currencys.getValue()[secondCurrency.value] * precisionInput.value
  
  conversionPrecision.textContent = `1 ${firstCurrency.value} = ${currencys.getValue()[secondCurrency.value].toFixed(2)} ${secondCurrency.value}`

  convertedValue.textContent = `${conversionResult.toFixed(2)} ${secondCurrency.value}`
}

const setDefaultCurrencys = (defaultCurrency1, defaultCurrency2) => {
  firstCurrency.value = defaultCurrency1
  secondCurrency.value = defaultCurrency2
}

const createCurrencyOptions = async () => {
  await getCurrencysData()

  const currencySelectors = [firstCurrency, secondCurrency]
  const arrayOfCurrencys = Object.keys(currencys.getValue())
  
  currencySelectors.forEach(currencySelector => 
    arrayOfCurrencys.forEach(item => {
      let option = document.createElement('option')
      option.label = option.value = item
      
      currencySelector.append(option)
    })
  )

  setDefaultCurrencys('USD', 'BRL')
  renderConvertedCurrencyValues()
}

createCurrencyOptions()

currencysOptionsContainer.addEventListener('input', async ({ target }) => {
  if(target === firstCurrency) {
    await getCurrencysData(target.value)
  }
  if(target === precisionInput) {
    const inputValue = target.value
    const invalidEntry = inputValue <= 0 && inputValue !== ''

    if(invalidEntry) {
      precisionInput.value = 1 
      alert('Insira um valor válido')
    }
  }

  renderConvertedCurrencyValues()
})


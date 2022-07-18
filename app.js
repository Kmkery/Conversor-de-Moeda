const currenciesOptionsContainer = document.querySelector('[data-js="currencies-options-container"]')
const firstCurrency = document.querySelector('[data-js="currency-one"]')
const secondCurrency = document.querySelector('[data-js="currency-two"]')
const precisionInput = document.querySelector('[data-js="currency-one-times"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const conversionPrecision = document.querySelector('[data-js="conversion-precision"]')

const getOptionsFragment = () => {
  const arrayOfCurrencies = Object.keys(currencies.getValue())
  const fragment = document.createDocumentFragment()

  arrayOfCurrencies.forEach(currency => {
    let option = document.createElement('option')
    option.value = currency
    option.label = currency
    fragment.append(option)
  })
  return fragment
}

const renderConvertedCurrencyValues = () => {
  const originalValue = currencies.getValue()[secondCurrency.value]
  const conversionResult = originalValue * precisionInput.value
  
  conversionPrecision.textContent = `1 ${firstCurrency.value} = ${originalValue.toFixed(2)} ${secondCurrency.value}`
  convertedValue.textContent = `${conversionResult.toFixed(2)} ${secondCurrency.value}`
}

const setDefaultCurrencies = (defaultCurrency1, defaultCurrency2) => {
  firstCurrency.value = defaultCurrency1
  secondCurrency.value = defaultCurrency2
}

const createCurrencyOptions = async () => {
  await setCurrenciesData()

  const currencySelects = [firstCurrency, secondCurrency]

  currencySelects.forEach(select => {
    const options = getOptionsFragment()
    select.append(options)
  })

  setDefaultCurrencies('USD', 'BRL')
  renderConvertedCurrencyValues()
}

const handleInputChange = async ({ target }) => {
  const inputValue = target.value
  const invalidEntry = target === precisionInput && inputValue <= 0 && inputValue !==''

  if(target === firstCurrency) {
    await setCurrenciesData(inputValue)
  }
  if(invalidEntry) {    
    precisionInput.value = 1 
    alert('Insira um valor válido')
  }
  
  renderConvertedCurrencyValues()
}

currenciesOptionsContainer.addEventListener('input', handleInputChange)

createCurrencyOptions()


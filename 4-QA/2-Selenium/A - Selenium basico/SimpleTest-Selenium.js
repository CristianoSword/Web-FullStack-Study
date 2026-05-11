//pag
  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soma</title>
</head>
<body>
    <h1>Calculadora de Soma</h1>
    <input id="num1" type="number" placeholder="Número 1">
    <input id="num2" type="number" placeholder="Número 2">
    <button id="sumButton">Somar</button>
    <p id="result"></p>

    <script>
        document.getElementById('sumButton').addEventListener('click', function() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const sum = num1 + num2;
            document.getElementById('result').textContent = 'Resultado: ' + sum;
        });
    </script>
</body>
</html>


// sumFunction.test.js
const { Builder, By } = require('selenium-webdriver');
const path = require('path');

describe('Sum Functionality', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should correctly sum two numbers', async () => {
    const filePath = `file://${path.resolve(__dirname, 'index.html')}`;
    await driver.get(filePath);

    const num1Input = await driver.findElement(By.id('num1'));
    const num2Input = await driver.findElement(By.id('num2'));
    const sumButton = await driver.findElement(By.id('sumButton'));
    const resultText = await driver.findElement(By.id('result'));

    await num1Input.sendKeys('3');
    await num2Input.sendKeys('5');
    await sumButton.click();

    const result = await resultText.getText();
    expect(result).toBe('Resultado: 8');
  });
});


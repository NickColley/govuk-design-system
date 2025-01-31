
const { setupPage } = require('../lib/jest-utilities.js')
const configPaths = require('../lib/paths.js')
const PORT = configPaths.testPort

let page
const baseUrl = 'http://localhost:' + PORT

beforeAll(async () => {
  page = await setupPage()
})

afterAll(async () => {
  await page.close()
})

describe('Example page', () => {
  describe('that has a form', () => {
    it('does not submit the form / reload the page', async () => {
      const defaultExampleUrl = baseUrl + '/patterns/question-pages/default/'
      await page.goto(defaultExampleUrl, { waitUntil: 'load' })
      await page.waitForSelector('form[action="/form-handler"]')
      await page.click('.govuk-button')
      const url = await page.url()
      // url should stay the same as the form shouldn't submit
      expect(url).toBe(defaultExampleUrl)
    })
  })
})

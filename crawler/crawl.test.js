const { normalizeURL, getUrlsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

// #region normaliseURL
test('normalizeURL strip protocol https', () => {
  const input = "https://app.daily.dev"
  const actual = normalizeURL(input)
  const expected = "app.daily.dev"

  expect(actual).toBe(expected)
})

test('normalizeURL strip protocol http', () => {
  const input = "http://app.daily.dev"
  const actual = normalizeURL(input)
  const expected = "app.daily.dev"

  expect(actual).toBe(expected)
})

test('normalizeURL strip trailing path', () => {
  const input = "https://app.daily.dev/"
  const actual = normalizeURL(input)
  const expected = "app.daily.dev"

  expect(actual).toBe(expected)
})

test('normalizeURL strip uppercase', () => {
  const input = "https://APP.daily.dev/"
  const actual = normalizeURL(input)
  const expected = "app.daily.dev"

  expect(actual).toBe(expected)
})

// #endregion

// #region getUrlsFromHtml
test('getUrlsFromHtml', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="https://app.daily.dev">
          Hello World!
        </a>
    </html>
  `

  const inputBaseUrl = "https://app.daily.dev"
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = ['https://app.daily.dev']

  expect(actual).toStrictEqual(expected)
})

test('getUrlsFromHtml Realtive', () => {
  const inputHTMLBody = `
    <html>
      <body>
         <a href="/relative">
          Hello World!
        </a>
      </body>
    </html>
  `

  const inputBaseUrl = "https://app.daily.dev"
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = ['https://app.daily.dev/relative']

  expect(actual).toStrictEqual(expected)
})

test('getUrlsFromHtml Path', () => {
  const inputHTMLBody = `
    <html>
      <body>
         <a href="https://app.daily.dev/path">
          Hello World!
        </a>
      </body>
    </html>
  `

  const inputBaseUrl = "https://app.daily.dev"
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = ['https://app.daily.dev/path']

  expect(actual).toStrictEqual(expected)
})

// #endregion
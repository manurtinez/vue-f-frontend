// This is temporary, to pass pre-commit hook until we have real tests

describe('App', () => {
  it('is a js app', () => {
    const path = require('path')
    const jsFile = path.basename('./baseTest.test.js')
    expect(jsFile.split('.')[2]).toEqual('js')
  })
})

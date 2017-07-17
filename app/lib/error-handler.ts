
export function logAndFailTest(e) {
  console.log(e.response.error)
  expect(e.response.error).toBeNull()
}


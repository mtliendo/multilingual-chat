export const request = (ctx) => {
  console.log("request ctx", ctx)
  return {
    resourcePath: "/api/token",
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: {
        keyId: "km6j43699364-2fc2-11f0-82dd-da318c9f7563",
        keySecret: "U1QjdIxg0DUosMCifZXWmr11rL7aRIciLnULwMCS2joLnnpN",
      },
    },
  }
}

export const response = (ctx) => {
  console.log("response ctx", ctx)

  //{token: string}
  return JSON.parse(ctx.result.body)
}

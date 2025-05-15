export const request = (ctx) => {
  console.log("request ctx for invoke workflow", ctx)
  return {
    resourcePath: "/api/workflow/multi-lingual-chat",
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": ctx.prev.result.token,
      },
      body: {
        messageText: ctx.arguments.messageText,
        username: ctx.arguments.username,
        createdAt: ctx.arguments.createdAt,
      },
    },
  }
}

export const response = (ctx) => {
  console.log("response for invoke workflow", ctx.result.body)
  return {
    workflowId: ctx.result.body,
  }
}

const IS_BROWSER = typeof window !== 'undefined'

export const setupMocks = async () => {
  if (IS_BROWSER) {
    const { mswWorker } = await import('./mswWorker')
    console.log('browser worker start')
    mswWorker.start({
      waitUntilReady: true,
    })
  } else {
    const { mswServer } = await import('./mswServer')
    console.log('server worker start')
    mswServer.listen()
  }
}

export function catchQueryError() {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

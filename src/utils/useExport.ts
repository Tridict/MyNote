export const useExport = () => {
  const getDownloadLink = (txt: string) => {
    return 'data:text/paint; utf-8,' + encodeURIComponent(txt)
  }
  return { getDownloadLink }
}

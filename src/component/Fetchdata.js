
const FetchData = async (url) => {
    const response = await fetch(url)
    const result = await response.json()
    const data = await result.results
    return data
}
export { FetchData };











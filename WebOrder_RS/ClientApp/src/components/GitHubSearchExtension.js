
export default async function GitHubSearchExtension(query) {
    const response = await fetch("https://localhost:44363/api/Order/CustAllInfo", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    const prom = data;
    return prom.map(
        item => ({
            title: item.CustId,
            subtitle: item.Name
        }),
    );
}

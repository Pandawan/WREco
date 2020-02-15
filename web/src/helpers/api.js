export async function sendRequestToServer(data) {
  const response = await fetch("http://localhost:5000", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  });

  if(!response.ok) throw new Error(response.statusText);

  return await response.json();
}

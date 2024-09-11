// utils/api.ts
export async function fetchItems(category: string | null) {
    const query = category ? `?category=${category}` : '';
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJZYU1aRGFXT0UyWGNwblhZaE1QZzZrME0iLCJpYXQiOjE3MjYwNzE5OTgsImF1ZCI6ImZlZWRhcHBiYWNrZW5kZC00eWpwbjIybnktc3VtaXQtMTgwM3MtcHJvamVjdHMudmVyY2VsLmFwcCIsInVzZXJuYW1lIjoic3VtaXQtMTgwMyIsInN1YiI6InNzby1wcm90ZWN0aW9uIn0.FMh5J-WNajZwNW3Nf4vrJHhDKm_LFswOsFYbAPZ9iBw'; // Replace with your actual JWT

    const response = await fetch(`https://feedappbackendd-4yjpn22ny-sumit-1803s-projects.vercel.app/api/items${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`, // Include the JWT in the Authorization header
        },
        credentials: 'include', // Include cookies if needed
    });

    // Check the response status and content type
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { data };
    } else {
        throw new Error('Response is not JSON');
    }
}

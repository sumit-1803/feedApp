// utils/api.ts

export async function fetchItems(category: string | null) {
    // // Set the hardcoded cookie before making the request
    // document.cookie = "_vercel_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJZYU1aRGFXT0UyWGNwblhZaE1QZzZrME0iLCJpYXQiOjE3MjYwNzE5OTgsImF1ZCI6ImZlZWRhcHBiYWNrZW5kZC00eWpwbjIybnktc3VtaXQtMTgwM3MtcHJvamVjdHMudmVyY2VsLmFwcCIsInVzZXJuYW1lIjoic3VtaXQtMTgwMyIsInN1YiI6InNzby1wcm90ZWN0aW9uIn0.FMh5J-WNajZwNW3Nf4vrJHhDKm_LFswOsFYbAPZ9iBw; path=/; domain=feedappfrontend.com; secure; samesite=strict";
    
    const query = category ? `?category=${category}` : '';
    
    const response = await fetch(`https://feedappbackendd-4yjpn22ny-sumit-1803s-projects.vercel.app/api/items${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
  
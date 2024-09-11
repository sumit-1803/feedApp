// utils/api.ts
export async function fetchItems(category: string | null) {
    const query = category ? `?category=${category}` : '';
    const response = await fetch(`https://feedappbackendd-4yjpn22ny-sumit-1803s-projects.vercel.app/api/items${query}`);
    
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
  
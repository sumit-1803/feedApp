// utils/api.ts
export async function fetchItems(category: string | null) {
    const query = category ? `?category=${category}` : '';
    const response = await fetch(`http://localhost:5000/api/items${query}`);
    
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
  
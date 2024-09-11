export async function fetchItems(category: string | null) {
    const query = category ? `?category=${category}` : '';
    
    try {
      const response = await fetch(`https://feedappbackendd-o43cy6fdn-sumit-1803s-projects.vercel.app/api/items${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
        },
        credentials: 'include', // Include credentials if your backend needs them
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { data };
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
  
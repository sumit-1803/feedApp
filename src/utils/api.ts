export async function fetchItems(category: string | null) {
  const query = category ? `?category=${category}` : '';

  try {
    const response = await fetch(`/api/items${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

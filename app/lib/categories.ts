/** Raw category item from API GET /items/Categories */
export interface CategoryItemRaw {
  id: number;
  date_created: string | null;
  date_updated: string | null;
  Name: string;
  parent: number | null;
}

/** API response shape for GET /items/Categories */
export interface CategoriesApiResponse {
  data: CategoryItemRaw[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

/** Build Category[] tree from flat API data (parent: null = root, parent: id = child). */
export function transformCategoriesFromApi(
  response: CategoriesApiResponse,
): Category[] {
  const data = response.data ?? [];
  const byId = new Map<number, CategoryItemRaw>();
  data.forEach((item) => byId.set(item.id, item));

  const roots = data.filter((item) => item.parent === null);
  const result: Category[] = [];

  for (const root of roots) {
    const children = data.filter((item) => item.parent === root.id);
    result.push({
      id: String(root.id),
      name: root.Name,
      subCategories: children.map((c) => ({
        id: String(c.id),
        name: c.Name,
      })),
    });
  }

  return result;
}

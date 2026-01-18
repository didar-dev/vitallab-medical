import { getNotionClient } from "./notion";

// Data Source Configuration
const DATA_SOURCES = {
  CATEGORIES: "028c5a0e-edc4-45f9-97a8-42c2c86e9daa",
} as const;

const QUERY_PAGE_SIZE = 100;

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

// Main Export
export async function fetchCategoriesData(): Promise<Category[]> {
  const notion = getNotionClient();

  try {
    // Fetch categories
    const categoriesResponse = await notion.request({
      method: "post",
      path: `data_sources/${DATA_SOURCES.CATEGORIES}/query`,
      body: { page_size: QUERY_PAGE_SIZE },
    });

    const pages = (categoriesResponse as any).results || [];

    // Build a map of all categories by ID
    const categoryMap = new Map<
      string,
      {
        id: string;
        name: string;
        isMain: boolean;
        relatedCategoryIds: string[];
      }
    >();

    // First pass: collect all categories
    pages.forEach((page: any) => {
      const categoryName =
        page.properties?.["Category Name"]?.title?.[0]?.plain_text || "";
      const isMain = page.properties?.["Main"]?.checkbox || false;
      const relatedCategories =
        page.properties?.["Related Categories"]?.relation || [];

      categoryMap.set(page.id, {
        id: page.id,
        name: categoryName,
        isMain,
        relatedCategoryIds: relatedCategories.map((rel: any) => rel.id),
      });
    });

    // Filter main categories (where Main checkbox is true)
    const mainCategories: Category[] = [];

    categoryMap.forEach((category) => {
      // A main category is one where the Main property is true
      if (category.isMain && category.relatedCategoryIds.length > 0) {
        const subCategories: SubCategory[] = category.relatedCategoryIds
          .map((subId) => {
            const subCategory = categoryMap.get(subId);
            return subCategory
              ? { id: subCategory.id, name: subCategory.name }
              : null;
          })
          .filter((sub): sub is SubCategory => sub !== null);

        mainCategories.push({
          id: category.id,
          name: category.name,
          subCategories,
        });
      }
    });
    return mainCategories;
  } catch (error) {
    console.error("Error fetching categories data:", error);

    return [];
  }
}

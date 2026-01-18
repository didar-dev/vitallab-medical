import { Client } from "@notionhq/client";

// Notion API Key and Version
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2025-09-03";

let notionClient: Client | null = null;

export function getNotionClient(): Client {
  if (notionClient) {
    return notionClient;
  }

  notionClient = new Client({
    auth: NOTION_API_KEY,
    notionVersion: NOTION_VERSION,
  });

  return notionClient;
}

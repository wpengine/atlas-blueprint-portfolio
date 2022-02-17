/**
 * GQTY: You can safely modify this file and Query Fetcher based on your needs
 */

import type { QueryFetcher } from "gqty";
import { createClient } from "gqty";
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";
import { generatedSchema, scalarsEnumsHash } from "./schema.generated";

const queryFetcher: QueryFetcher = async function (query, variables) {
  // Modify "/api/graphql" if needed
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  });

  const json = await response.json();

  return json;
};

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
});

const { query, mutation, mutate, subscription, resolved, refetch, track } =
  client;

export { query, mutation, mutate, subscription, resolved, refetch, track };

export * from "./schema.generated";

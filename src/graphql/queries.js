// eslint-disable
// this is an auto generated file. This will be overwritten

export const getGarment = `query GetGarment($id: ID!) {
  getGarment(id: $id) {
    id
    name
    description
    type
  }
}
`;
export const listGarments = `query ListGarments(
  $filter: ModelGarmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listGarments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      type
    }
    nextToken
  }
}
`;
export const getOutfit = `query GetOutfit($id: ID!) {
  getOutfit(id: $id) {
    id
    name
    description
    garments {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
}
`;
export const listOutfits = `query ListOutfits(
  $filter: ModelOutfitFilterInput
  $limit: Int
  $nextToken: String
) {
  listOutfits(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      garments {
        items {
          id
          name
          description
        }
        nextToken
      }
    }
    nextToken
  }
}
`;

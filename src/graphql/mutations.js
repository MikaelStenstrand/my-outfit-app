// eslint-disable
// this is an auto generated file. This will be overwritten

export const createGarment = `mutation CreateGarment($input: CreateGarmentInput!) {
  createGarment(input: $input) {
    id
    name
    description
    type
  }
}
`;
export const updateGarment = `mutation UpdateGarment($input: UpdateGarmentInput!) {
  updateGarment(input: $input) {
    id
    name
    description
    type
  }
}
`;
export const deleteGarment = `mutation DeleteGarment($input: DeleteGarmentInput!) {
  deleteGarment(input: $input) {
    id
    name
    description
    type
  }
}
`;
export const createOutfit = `mutation CreateOutfit($input: CreateOutfitInput!) {
  createOutfit(input: $input) {
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
export const updateOutfit = `mutation UpdateOutfit($input: UpdateOutfitInput!) {
  updateOutfit(input: $input) {
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
export const deleteOutfit = `mutation DeleteOutfit($input: DeleteOutfitInput!) {
  deleteOutfit(input: $input) {
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

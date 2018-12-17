// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateGarment = `subscription OnCreateGarment {
  onCreateGarment {
    id
    name
    description
    type
  }
}
`;
export const onUpdateGarment = `subscription OnUpdateGarment {
  onUpdateGarment {
    id
    name
    description
    type
  }
}
`;
export const onDeleteGarment = `subscription OnDeleteGarment {
  onDeleteGarment {
    id
    name
    description
    type
  }
}
`;
export const onCreateOutfit = `subscription OnCreateOutfit {
  onCreateOutfit {
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
export const onUpdateOutfit = `subscription OnUpdateOutfit {
  onUpdateOutfit {
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
export const onDeleteOutfit = `subscription OnDeleteOutfit {
  onDeleteOutfit {
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

// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateGarment = `subscription OnCreateGarment {
  onCreateGarment {
    id
    name
    description
    type
    photoURI
  }
}
`;
export const onUpdateGarment = `subscription OnUpdateGarment {
  onUpdateGarment {
    id
    name
    description
    type
    photoURI
  }
}
`;
export const onDeleteGarment = `subscription OnDeleteGarment {
  onDeleteGarment {
    id
    name
    description
    type
    photoURI
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
        photoURI
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
        photoURI
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
        photoURI
      }
      nextToken
    }
  }
}
`;

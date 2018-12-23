
export const listGarmentsQuery = `query listGarments($filter: ModelGarmentFilterInput, $limit: Int) {
  listGarments(filter: $filter, limit: $limit) {
    items {
      id
      name
      description
      type
      photoURI
    }
    nextToken
  }
}`

export const createGarmentQuery = `mutation createGarment(
  $name:String!
  $description: String!
  $type: GarmentType!
  $photoURI: String!) {
  createGarment(input:{
    name:$name
    description:$description
    type:$type
    photoURI: $photoURI
  }){
    id
    name
    description
    type
    photoURI
  }
}`

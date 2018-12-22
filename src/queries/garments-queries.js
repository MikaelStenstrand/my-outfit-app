
export const listGarmentsQuery = `query listGarments($filter: ModelGarmentFilterInput, $limit: Int) {
  listGarments(filter: $filter, limit: $limit) {
    items {
      id
      name
      description
      type
    }
    nextToken
  }
}`

export const createGarmentQuery = `mutation createGarment($name:String! $description: String! $type: GarmentType!) {
  createGarment(input:{
    name:$name
    description:$description
    type:$type
  }){
    id
    name
    description
    type
  }
}`

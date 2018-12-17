
export const listGarmentsQuery = `query listGarments {
  listGarments{
    items{
      id
      name
      description
      type
    }
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

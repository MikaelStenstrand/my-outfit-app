# document for planning out the GraphQL data schema, not used in code

type Query {
  garment(id: ID!): Garment
  outfit(id: ID!): outfit
}
------

# type Outfit @model {
#   id: ID!
#   name: String!
#   description: String
#   garments: [Garment!]! @connection
# }
------

type Garment @model // @searchable 
{
  id: ID!
  name: String
  description: String
  type: Garment-type!
  season: Season
  occasion: Occasion
  photoURL: String
}

type Outfit @model // @searchable 
{
  id: ID!
  name: String!
  description: String
  occasion: Occasion
  garment: [Garment!]! @connection
}

enum Season 
{
  WINTER,
  SPRING,
  SUMMER,
  AUTUMN,
}

enum GarmentType 
{
  TROUSERS
  SHIRT
  SHOES
  SKIRT
  SWEATER
  GLOVES
  HAT
  SHORTS
  DRESS
  JACKET
  OTHER
}

enum Occasion 
{
  CASUAL
  WORKOUTFIT
  PARTY
  UNIFORM
  TRAINING
  OTHER
}

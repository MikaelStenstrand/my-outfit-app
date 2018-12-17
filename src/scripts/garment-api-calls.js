import { API, graphqlOperation } from 'aws-amplify';
import { listGarmentsQuery, createGarmentQuery } from '../queries/garments-queries.js';

export async function createGarmentAPI(garmentObj)  {
  if (!garmentObj) return;
  try {
    const response = await API.graphql(graphqlOperation(createGarmentQuery, garmentObj));
    console.log("createGarmentAPI: ", JSON.stringify(response));
    return response;
  } catch(err) {
    console.log(err);
    return;
  }
}

export async function listGarmentsAPI() {
  try {
    const response = await API.graphql(graphqlOperation(listGarmentsQuery));
    console.log("listGarmentsAPI: ", JSON.stringify(response));
    return response;
  } catch(err) {
    console.log(err);
    return;
  }
 
}

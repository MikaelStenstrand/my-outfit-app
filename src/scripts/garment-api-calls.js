import { API, graphqlOperation } from 'aws-amplify';
import { listGarmentsQuery, createGarmentQuery } from '../queries/garments-queries.js';

export async function createGarmentAPI(garmentObj)  {
  if (!garmentObj) return;
  try {
    const response = await API.graphql(graphqlOperation(createGarmentQuery, garmentObj));
    // console.log("createGarmentAPI: ", response);
    return response;
  } catch(err) {
    console.log(err);
    return;
  }
}

export async function listGarmentsAPI(options) {
  const listOptions = options || {};
  try {
    const response = await API.graphql(graphqlOperation(listGarmentsQuery, listOptions));
    // console.log("listGarmentsAPI: ", response);
    return response;
  } catch(err) {
    console.log(err);
    return;
  }
 
}

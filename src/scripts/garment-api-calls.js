import { API, graphqlOperation } from 'aws-amplify';
import { listGarmentsQuery, createGarmentQuery } from '../queries/garments-queries.js';
import { deleteGarment } from '../graphql/mutations.js';

export async function createGarmentAPI(garment)  {
  if (!garment) return;
  try {
    const response = await API.graphql(graphqlOperation(createGarmentQuery, garment));
    console.log("createGarmentAPI: ", response);
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

export async function deleteGarmentAPI(garment) {
  try {
    const response = await API.graphql(graphqlOperation(deleteGarment, {
      input: {
        id: garment.id,
      }
    }))
    return response;
  } catch(err)  {
    console.log(err);
    return;
  }
}

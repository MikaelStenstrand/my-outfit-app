import { API, graphqlOperation } from 'aws-amplify';
import { createGarment, updateGarment, deleteGarment } from '../graphql/mutations.js';
import { listGarments } from '../graphql/queries.js';
import { onUpdateGarment, onCreateGarment, onDeleteGarment } from '../graphql/subscriptions.js';

export async function createGarmentAPI(garment)  {
  if (!garment) return;
  try {
    const response = await API.graphql(graphqlOperation(createGarment, {
      input: {
        name: garment.name,
        description: garment.description,
        type: garment.type,
        photoURI: garment.photoURI,
      }
    }));
    console.log("createGarmentAPI: ", response);
    return response;
  } catch(err) {
    console.log(err);
    return;
  }
}

export async function updateGarmentAPI(garment)  {
  if (!garment) return;
  try {
    const response = await API.graphql(graphqlOperation(updateGarment, {
      input: {
        id: garment.id,
        name: garment.name,
        description: garment.description,
        type: garment.type,
        photoURI: garment.photoURI,
      }
    }));
    return response;
  } catch(err)  {
    console.log(err);
    return;
  }
}

export async function listGarmentsAPI(options) {
  const listOptions = options || {};
  try {
    const response = await API.graphql(graphqlOperation(listGarments, listOptions));
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

export async function subscribeToUpdateGarmentAPI(handleSubscriptionFunction) {
  const subscription = await API.graphql(graphqlOperation(onUpdateGarment))
    .subscribe({
      next: (data) => {
        handleSubscriptionFunction(data)
      },
      error: (err) => console.warn(err)
    });
  return subscription;
}

export async function subscribeToCreateGarmentAPI(handleSubscriptionFunction) {
  const subscription = await API.graphql(graphqlOperation(onCreateGarment))
    .subscribe({
      next: (data) => {
        handleSubscriptionFunction(data)
      },
      error: (err) => console.warn(err)
    });
  return subscription;
}

export async function subscribeToDeleteGarmentAPI(handleSubscriptionFunction) {
  const subscription = await API.graphql(graphqlOperation(onDeleteGarment))
    .subscribe({
      next: (data) => {
        handleSubscriptionFunction(data)
      },
      error: (err) => console.warn(err)
    });
  return subscription;
}
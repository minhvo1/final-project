import axios from 'axios'


export function getCompetitions (userComp, allComp) {
  let listComp = [];

  if(userComp.length = 0) {
    return null;
  }
  for (let indivComp of userComp) {
    listComp.push(indivComp.competition_id);
  }
  let res = allComp.filter(item => listComp.includes(item.id));

  return res;
}

export function checkArray (name, allArray) {

  for (let x = 0; x < allArray.length; x++) {
    if (allArray[x].name === name) {
      return x;
    }
  }
  return null;

}

export function checkObject (id, array) {

  for (let x = 0; x < array.length; x++) {
    if (array[x].id === id) {
      return x;
    }
  }
  return null; 
}

export function seeUserInComp (id) {
   Promise.all([axios.get(`http://localhost:3001/compUsers/${id}`)]).then ((ans) => {
    return ans[0]["data"].length;
  })
}

export function findCompetitionById (id, comps) {
  for (let comp of comps) {
    if (comp.id == id) {
      return comp;
    }
  }
}

export function findIndex (id, comps) {
  for (let i = 0; i < comps.length; i++) {
    if (comps[i].id == id) {
      return i;
    }
  }
}
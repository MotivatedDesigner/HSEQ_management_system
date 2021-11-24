export const url = 'http://localhost:4000/graphql'
export const loggingData = `
query{
  locations{ id, name },
  categories{ id, name, type },
  employees{ id, name, role{ id, name } }
  sources{ id, name }
}`
export const incidentsQuery = `
query{
  incidents{ 
    id, 
    title, 
    description, 
    location{ name }, 
    category{ name }, 
    state{ name }, 
    createdAt, 
    createdBy{ id, name } 
  }
}`
export const hazardsQuery = `
query{
  hazards{ 
    id, 
    title, 
    description, 
    location{ name }, 
    createdAt, 
    createdBy{ id, name }, 
    state{ name }, 
    source{ name }
  }
}`
export const postIncident = (title,description, categoryId, locationId,dateTime, employeeId) => {
  return `
  mutation{
    addIncident(
      title:"${title}", 
      description:"${description}", 
      categoryId:"${categoryId}",
      locationId:"${locationId}",
      createdAt:"${dateTime}",
      createdBy:"${employeeId}"
      )
      {
        id
      }
  }`
}
export const postHazard = (title,description, locationId, dateTime, employeeId, source) => {
  return `
  mutation{
    addHazard(
      title:"${title}", 
      description: "${description}", 
      locationId:"${locationId}",
      createdAt:"${dateTime}", 
      createdBy:"${employeeId}", 
      sourceId:"${source}"
      )
    {
      id
    }
  }`
}
export const postAction = (title,description, DueDate, assignedTo) => {
  console.log(title,description, DueDate, assignedTo)
  return `
  mutation{
    addAction(
      title:"${title}",
      description:"${description}",
      dueDate:"${DueDate}",
      assignedBy:"6138a1165a5edd09f813fcb0",
      assignedTo:"${assignedTo}"
    )
    {
      id
    }
  }`
}
export const postAlert = (title,description) => {
  return `
  mutation{
    addAlert(
      title:"${title}",
      description:"${description}",
    )
    {
      id
    }
  }`
}

export const employeesQuery = `
query{
  employees{
    id,
    name,
    avatar
  }
}`
export const supNamesQuery = `
query{
  employees(role:"Supervisor"){
    id,
    name,
    avatar
  }
}`
export const actionsQuery = `
query{
  Actions{
    id,
    title,
    createdAt,
    dueDate,
    assignedBy{
      name
    },
    assignedTo{
      name
    },
    state{
      name
    }  
  }
}`
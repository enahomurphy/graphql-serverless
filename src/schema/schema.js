import { makeExecutableSchema } from 'graphql-tools'

// graphql schema
import Activity from './query/activity'
import Category from './query/category'
import RootQuery from './query'

// firestore APIS
import { category, activity } from '../services'

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery,
    ...Category,
    ...Activity
  ],
  resolvers: {
    RootQuery: {
      category: (_, { id }) => category.get(id),
      activity: (_, { id }) => activity.get(id),
      activities: () => activity.list()
    },
    Category: {
      activities: (category, args) => activity.list(Object.assign({}, args, { categoryID: category.id }))
    }
  }
})

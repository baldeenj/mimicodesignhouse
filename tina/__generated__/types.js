export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ArticlePartsFragmentDoc = gql`
    fragment ArticleParts on Article {
  __typename
  title
  tag {
    ... on Category {
      __typename
      name
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  date
  heroImage
  summary
  body
}
    `;
export const CategoryPartsFragmentDoc = gql`
    fragment CategoryParts on Category {
  __typename
  name
}
    `;
export const VlogPartsFragmentDoc = gql`
    fragment VlogParts on Vlog {
  __typename
  title
  episode
  date
  videoUrl
  thumbnailUrl
  summary
  body
}
    `;
export const PortfolioPartsFragmentDoc = gql`
    fragment PortfolioParts on Portfolio {
  __typename
  client
  title
  description
  tags
  imageUrl
  featured
  body
}
    `;
export const ArticleDocument = gql`
    query article($relativePath: String!) {
  article(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ArticleParts
  }
}
    ${ArticlePartsFragmentDoc}`;
export const ArticleConnectionDocument = gql`
    query articleConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ArticleFilter) {
  articleConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ArticleParts
      }
    }
  }
}
    ${ArticlePartsFragmentDoc}`;
export const CategoryDocument = gql`
    query category($relativePath: String!) {
  category(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CategoryParts
  }
}
    ${CategoryPartsFragmentDoc}`;
export const CategoryConnectionDocument = gql`
    query categoryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CategoryFilter) {
  categoryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CategoryParts
      }
    }
  }
}
    ${CategoryPartsFragmentDoc}`;
export const VlogDocument = gql`
    query vlog($relativePath: String!) {
  vlog(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...VlogParts
  }
}
    ${VlogPartsFragmentDoc}`;
export const VlogConnectionDocument = gql`
    query vlogConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: VlogFilter) {
  vlogConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...VlogParts
      }
    }
  }
}
    ${VlogPartsFragmentDoc}`;
export const PortfolioDocument = gql`
    query portfolio($relativePath: String!) {
  portfolio(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PortfolioParts
  }
}
    ${PortfolioPartsFragmentDoc}`;
export const PortfolioConnectionDocument = gql`
    query portfolioConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PortfolioFilter) {
  portfolioConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PortfolioParts
      }
    }
  }
}
    ${PortfolioPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    article(variables, options) {
      return requester(ArticleDocument, variables, options);
    },
    articleConnection(variables, options) {
      return requester(ArticleConnectionDocument, variables, options);
    },
    category(variables, options) {
      return requester(CategoryDocument, variables, options);
    },
    categoryConnection(variables, options) {
      return requester(CategoryConnectionDocument, variables, options);
    },
    vlog(variables, options) {
      return requester(VlogDocument, variables, options);
    },
    vlogConnection(variables, options) {
      return requester(VlogConnectionDocument, variables, options);
    },
    portfolio(variables, options) {
      return requester(PortfolioDocument, variables, options);
    },
    portfolioConnection(variables, options) {
      return requester(PortfolioConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/4.1/content/3cbde2df-4144-4f25-9dc4-98ba8aeecf59/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};

export const githubClientID = process.env[`REACT_APP_GITHUB_${process.env.NODE_ENV==='production'?'':'TEST_'}CLIENT_ID`]

export const backendURL = process.env[`REACT_APP_BACKEND_${process.env.NODE_ENV==='production'?'':'TEST_'}URL`]
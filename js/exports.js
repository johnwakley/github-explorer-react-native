export type Repo = {
  id: number,
  name: string,
  description: string,
  url: string,
  homepageUrl: string,
  license: string,
  owner: {
    avatarUrl: string,
    login: string
  },
  stargazers: {
    totalCount: number
  },
  watchers: {
    totalCount: number
  }
}

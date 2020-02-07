import setting from "../setting.json";
import newLabel from "../new-label.json";
import axios, { Method } from "axios";
const githubApi = "https://api.github.com";

type LabelParams = {
  name: string;
  description: string;
  color: string;
};
type Repository = string;
// Setting type would be like:
// type Setting = {
//   owner: string;
//   repositories: Repository[];
// };
type OperationParams = {
  url: string;
  method: Method;
};
type LabelOperations = {
  list: OperationParams;
  create: OperationParams;
};

const githubApiUrlBase = `${githubApi}/repos/${setting.owner}`;

const githubApiLabelOperations = (repo: Repository): LabelOperations => {
  return {
    create: {
      url: `${githubApiUrlBase}/${repo}/labels`,
      method: "POST"
    },
    list: { url: `${githubApiUrlBase}/${repo}/labels`, method: "GET" }
  };
};

const request = async (
  repo: Repository,
  operation: keyof LabelOperations,
  label?: LabelParams
) => {
  const githubApiLabelOperation = githubApiLabelOperations(repo)[operation];
  return await axios.request({
    url: githubApiLabelOperation.url,
    method: githubApiLabelOperation.method,
    data: label,
    headers: { Authorization: `token ${process.env.AUTH_KEY}` }
  });
};

class Label {
  constructor(readonly repo: Repository, readonly label: LabelParams) {}

  async create() {
    await request(this.repo, "create", this.label);
  }

  static async list(repo: Repository) {
    const res = await request(repo, "list");
    return res.data;
  }
}

const executeAll = (func: Function) => {
  setting.repositories.forEach(async repository => {
    func(repository);
  });
};

const createLabel = async (repo: Repository) => {
  const label = new Label(repo, newLabel);
  await label.create();
  console.log({
    repository: repo,
    labels: (await Label.list(repo)).map((l: any) => l.name)
  });
};

const listLabels = async (repo: Repository) => {
  console.log({
    repository: repo,
    labels: (await Label.list(repo)).map((l: any) => l.name)
  });
};

const main = async () => {
  switch (process.env.OPERATION) {
    case "create":
      executeAll(createLabel);
      break;
    case "list":
      executeAll(listLabels);
      break;
    default:
      console.log("Enter an operation.");
  }
};

main();

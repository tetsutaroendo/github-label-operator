You can manipulate your GitHub label with this cli.

# Setting

Make a `setting.json` file at the root directory.

```json
{
  "owner": "something-organization",
  "repositories": ["repo-name1", "repo-name2", "repo-name3"]
}
```

The type is like:

```typescript
type Setting = {
  owner: string;
  repositories: string[];
};
```

# Manipulations

## Create

Make a `new-label.json` file at the root directory.

The type is like:

```typescript
type LabelParams = {
  name: string;
  description: string;
  color: string;
};
```

MANIPULATION environment variable is `create`.

## List

MANIPULATION environment variable is `list`.

# How to execute

If one of your repositories is in private, you have to give an AUTH_KEY environment variable.

You can controll your manipulation by MANIPULATION environment variable.

```
AUTH_KEY=fooooobarrrrrrrrrr MANIPULATION=list npm start
```

# How to contribute

## Create an Issue

Before you create a new Issue:

1. Please make sure there is no open issue yet.
2. If it is a bug report, include the steps to reproduce the issue.
3. If it is a feature request, please share the motivation for the new feature
   and how you would implement it.

## Tests

If you want to submit a bug fix or new feature, make sure that all tests are passing.

To see how to run the tests, please see [Project Setup](project-setup.md).

## Commit your changes

While creating commits please refer to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification).

You can use [commitizen](https://github.com/commitizen/cz-cli) to create commits.

```bash
nr commit
```

## Merging the Pull Request & releasing a new version

Releases are automated using semantic-release.
The following commit message conventions determine which version is released:

1. `fix: ...`. or `fix(scope name): ...`
   prefix in subject: bumps fix version, e.g. `1.2.3` → `1.2.4`
2. `feat: ...` or `feat(scope name):...`
   prefix in subject: bumps feature version, e.g. `1.2.3` → `1.3.0`
3. `BREAKING CHANGE:` in body: bumps breaking version, e.g. `1.2.3` → `2.0.0`

Only one version number is bumped at a time, the highest version change trumps
the others.Besides publishing a new version to npm,
semantic-release also creates a git tag and release on GitHub,
generates changelogs from the commit messages and puts them into the release notes.

If the pull request looks good but does not follow the commit conventions,
use the "Rebase & merge" button.

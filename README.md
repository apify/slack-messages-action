# Apify Slack Messenger

Wraps up messages sending from Apify GitHub workflows into Slack.

## Usage

```yaml
name: pre deploy message

on:
    workflow_dispatch:

jobs:    
    pre-deploy-message:
      runs-on: ubuntu-20.04
        needs:
          - tag
        steps:
          - name: clone pull-request-toolkit-action
            uses: actions/checkout@v2
            with:
              repository: apify/pull-request-toolkit-action
              ref: refs/tags/v1.0.0
              path: ./.github/actions/slack-messenger
    
          - name: pre deploy message
            uses: ./.github/actions/slack-messenger
            with:
              slack-bot-user-oauth-access-token: ${{ secrets.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN }}
              message-type: pre-deploy
              version-tag: v1.0.0
```

# TBD

- Tests
- GitHub action for publishing new version

## Contribution

1. Update code in `./src`
2. Run `npm i`
3. Run `npm run all`
4. Commit all changes including `./disc` folder with built code.
5. Publish a new version of action using new release (It needs to be done manually)


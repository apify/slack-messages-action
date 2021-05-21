import * as core from '@actions/core';
import { WebClient } from '@slack/web-api';
import { getMessage } from './messages';

async function run(): Promise<void> {
    try {
        const token: string = core.getInput('slack-bot-user-oauth-access-token');
        const slackChannel: string = core.getInput('slack-channel') || process.env.SLACK_CHANNEL || '';
        const messageType: string = core.getInput('message-type');
        const versionTag: string = core.getInput('version-tag');

        const slackClient = new WebClient(token);
        const message = getMessage({ type: messageType, versionTag, slackChannel });

        const res = await slackClient.chat.postMessage(message);

        core.setOutput('messageId', res.ts);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

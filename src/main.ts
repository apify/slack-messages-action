import * as core from '@actions/core';
import { WebClient } from '@slack/web-api';
import { getBaseMessage, getMessage } from './messages';

async function run(): Promise<void> {
    try {
        const token: string = core.getInput('slack-bot-user-oauth-access-token');
        const slackChannel: string = core.getInput('slack-channel') || process.env.SLACK_CHANNEL || '';
        const messageType: string = core.getInput('message-type');
        const message: string = core.getInput('message');
        const color: string = core.getInput('color');
        const versionTag: string = core.getInput('version-tag');

        const slackClient = new WebClient(token);
        let slackMessage;
        if (messageType) {
            slackMessage = getMessage({ type: messageType, versionTag, slackChannel });
        } else if (message) {
            slackMessage = getBaseMessage(slackChannel, versionTag, message, color);
        } else {
            throw new Error('Slack message or message type must be set.');
        }

        const res = await slackClient.chat.postMessage(slackMessage);

        core.setOutput('messageId', res.ts);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

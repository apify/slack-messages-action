import { ChatPostMessageArguments } from '@slack/web-api';

const { env } = process;

export const getBaseMessage = (slackChannel: string, versionTag: string, message = 'No message set', color = '#0066ff') => ({
    channel: slackChannel,
    text: message,
    attachments: [
        {
            color,
            blocks: [
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*Author:*\n${env.GITHUB_ACTOR}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Version tag:*\n${versionTag}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Details:*\nhttps://github.com/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Triggered:*\n${env.GITHUB_EVENT_NAME || ''}`,
                        },
                    ],
                },
            ],
        },
    ],
});

export const getMessage = ({
    type,
    versionTag,
    slackChannel,
}: { type: string, versionTag: string, slackChannel: string }): ChatPostMessageArguments => {
    let color;
    let message;
    switch (type) {
        case 'pre-deploy':
            color = '#0066ff';
            message = ':large_green_circle: *Deploy started*';
            break;
        case 'post-deploy':
            color = '#00cc00';
            message = ':white_check_mark: *Deploy finished*\n:arrow_forward: *Integration tests started*';
            break;
        case 'failure':
            color = '#ff0000';
            message = ':red_circle: *Deploy failed!*';
            break;
        case 'integration-tests-passed':
            color = '#00cc00';
            message = ':white_check_mark: *Integration tests passed*';
            break;
        case 'integration-tests-failed':
            color = '#ff0000';
            message = ':exclamation: *Integration tests failed!*';
            break;
        case 'cypress-tests-passed':
            color = '#00cc00';
            message = ':white_check_mark: *Cypress tests passed*';
            break;
        case 'cypress-tests-failed':
            color = '#ff0000';
            message = ':exclamation: *Cypress tests failed!*';
            break;
        default:
            throw new Error(`There is no message with ${type} type.`);
    }
    return getBaseMessage(slackChannel, versionTag, message, color);
};

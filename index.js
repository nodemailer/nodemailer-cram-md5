'use strict';

const crypto = require('crypto');

module.exports = async ctx => {
    let cmd;

    cmd = await ctx.sendCommand('AUTH CRAM-MD5');
    if (cmd.status !== 334) {
        throw new Error('Invalid login sequence while waiting for server challenge string');
    }

    let challenge = Buffer.from(cmd.text, 'base64').toString('ascii');
    let hmacMd5 = crypto.createHmac('md5', ctx.auth.credentials.pass);
    hmacMd5.update(challenge);

    cmd = await ctx.sendCommand(Buffer.from(ctx.auth.credentials.user + ' ' + hmacMd5.digest('hex').toLowerCase()).toString('base64'));
    if (cmd.status !== 235) {
        throw new Error('Invalid login sequence while waiting for "235"');
    }

    // authenticated!
    return true;
};

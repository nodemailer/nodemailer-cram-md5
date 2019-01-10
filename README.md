# CRAM-MD5 authentication for Nodemailer

Nodemailer 5+ allows to use custom authentication mechanisms. While there is no support in Nodemailer for CRAM-MD5 then it can be provided with an addon.

## Install

Requires Nodejs v8.0.0 or newer

```
npm install nodemailer-cram-md5
```

## Usage

```
const nodemailer = require('nodemailer');
const nodemailerCramMd5 = require('nodemailer-cram-md5');

let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true,
    auth: {
        type: 'custom',
        method: 'CRAM-MD5',
        user: 'username',
        pass: 'verysecret'
    },
    customAuth: {
        'CRAM-MD5': nodemailerCramMd5
    }
});

transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'hello world!',
    text: 'hello!'
}, console.log)
```

export type Turbin3Prereq = {
    "version": "0.1.0",
    "name": "turbin3_prereq",
    "address": "GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ",
    "metadata": {
        "name": "turbin3_prereq",
        "version": "0.1.0",
        "spec": "0.1.0"
    },
    "instructions": [
        {
            "name": "submit",
            "discriminator": [0, 0, 0, 0, 0, 0, 0, 0],
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "enrollment",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "github",
                    "type": "bytes"
                }
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidGithubAccount",
            "msg": "Invalid GitHub account"
        }
    ]
};

export const IDL: Turbin3Prereq = {
    "version": "0.1.0",
    "name": "turbin3_prereq",
    "address": "GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ",
    "metadata": {
        "name": "turbin3_prereq",
        "version": "0.1.0",
        "spec": "0.1.0"
    },
    "instructions": [
        {
            "name": "submit",
            "discriminator": [0, 0, 0, 0, 0, 0, 0, 0],
            "accounts": [
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "enrollment",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "github",
                    "type": "bytes",
                }
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidGithubAccount",
            "msg": "Invalid GitHub account"
        }
    ]
};
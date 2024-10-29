# csolver

A simple captcha solving service and official API wrapper for https://csolver.xyz

[![Version npm](https://img.shields.io/npm/v/csolver.svg?style=flat-square)](https://www.npmjs.com/package/csolver)
[![npm Downloads](https://img.shields.io/npm/dm/csolver.svg?style=flat-square)](https://npmcharts.com/compare/csolver?minimal=true)

[![NPM](https://nodei.co/npm/csolver.png?downloads=true&downloadRank=true)](https://nodei.co/npm/csolver/)

## Table of Contents
- [Installing](#installation)
- [Usage](#usage)
- [Documentation](#documentation-docs)

## Installation
```bash
npm install csolver@latest
```
```bash
pnpm install csolver@latest
```
```bash
yarn add csolver@latest
```

## Usage

``` js
const { CSolver } = require("csolver");

const csolver = new CSolver("Your Api-Key"); // Get your key in https://csolver.xyz/dash

async function main() {
    try { 
        const task = await csolver.createTask({ 
            task: "hCaptcha",
            payload: {
                siteKey: "hcaptcha key",
                siteUrl: "example.com",
                rqData: "", // optional 
                proxy: "user:pass@ip:port" // optional
            }
        });

        console.log(task); // { status: "", job_id: "" }

        const result = await csolver.getTaskResult(task.job_id);
        console.log(result); // solution your captcha.
    } catch (e) {
        console.log(e); // Identify possible errors.
    }
}

// Starting your code.
main();
```
---
## 
- Found any errors? Open a pull on the [repository](https://github.com/edudevvv/csolver/pulls).

#### Author: [Eduardo Silva] (@pyvd) 
#### Contributors: [AG597] (@csolver.py)
#### Support: [Discord]

[Eduardo Silva]: https://github.com/edudevvv
[AG597]: https://
[Discord]: https://discord.gg/csolver
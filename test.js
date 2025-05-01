#!/usr/bin/env node
let titleArr = [
    '9元',
    '19元',
    '199元',
    '1999元',
    '19999元',
    '9.99元',
    '19.99元',
    '199.99元',
    '1999.99元',
    '19999.99元',
];
titleArr = titleArr.concat(titleArr.map(title => `优${title}`))
const regexArr = [ /^[^0-9]?[0-9]{1,2}([.][0-9]{1,2})?\s?元/ ];
titleArr.forEach(title => {
    console.log(title, !regexArr[0].test(title));
});

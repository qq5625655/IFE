var TableTitle = [{
        label: "姓名",
        name: "name",
        sort: false
    },
    {
        label: "语文",
        name: "chinese",
        sort: true
    },
    {
        label: "数学",
        name: "math",
        sort: true
    },
    {
        label: "英语",
        name: "english",
        sort: true
    },
    {
        label: "总分",
        name: "sum",
        sort: true
    }
];
var TableData = {
    xiaoZhang: {
        name: "xiaoZhang",
        chinese: 90,
        math: 85,
        english: 90,
        sum: 260
    },
    xiaoMing: {
        name: "xiaoMing",
        chinese: 80,
        math: 90,
        english: 75,
        sum: 245
    },
    xiaoHong: {
        name: "xiaoHong",
        chinese: 75,
        math: 80,
        english: 95,
        sum: 250
    },
    xiaoLiang: {
        name: "xiaoLiang",
        chinese: 65,
        math: 75,
        english: 100,
        sum: 240
    },
    diandian1: {
        name: "diandian1",
        chinese: 60,
        math: 75,
        english: 80,
        sum: 215
    },
    diandian2: {
        name: "diandian2",
        chinese: 50,
        math: 60,
        english: 85,
        sum: 195
    },
    diandian3: {
        name: "diandian3",
        chinese: 90,
        math: 70,
        english: 60,
        sum: 220
    },
    xiaoLiang2: {
        name: "xiaoLiang2",
        chinese: 65,
        math: 75,
        english: 95,
        sum: 235
    },
    xiaoLiang3: {
        name: "xiaoLiang3",
        chinese: 65,
        math: 75,
        english: 90,
        sum: 230
    },
    xiaoMing2: {
        name: "xiaoMing2",
        chinese: 80,
        math: 85,
        english: 75,
        sum: 240
    },
    xiaoMing3: {
        name: "xiaoMing3",
        chinese: 80,
        math: 95,
        english: 75,
        sum: 250
    },
    xiaoZhang22: {
        name: "xiaoZhang22",
        chinese: 90,
        math: 85,
        english: 90,
        sum: 260
    },
    xiaoZhang33: {
        name: "xiaoZhang33",
        chinese: 90,
        math: 85,
        english: 90,
        sum: 260
    },
}
var CrateData1 = new CreateTable("#CreateTable1" ,TableTitle, TableData);
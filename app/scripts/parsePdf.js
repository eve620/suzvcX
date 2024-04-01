const fs = require("fs");
const pdf = require("pdf-parse");

const folderPath = './pdf'; // 文件夹路径
const resultPath = './courses'

const STARTSIGN = "中文 英文 K.K.音标";
const ENDSIGN = "中文 原形 第三人称单数 过去式 ing形式";

function main() {
    // 读取文件夹内容
    const files = fs.readdirSync(folderPath);
    // 遍历文件夹中的每个文件/文件夹
    files.forEach((file) => {
        const filePath = `${folderPath}/${file}`;
        const data = fs.readFileSync(filePath);
        pdf(data).then(function (data) {
            const result = parse(data.text)
            const resultFile = file.replace(".pdf", ".json")
            fs.writeFileSync(`${resultPath}/${resultFile}`, JSON.stringify(result))
        })
    });
    // let data = fs.readFileSync("./pdf/02.pdf")
    //
    // pdf(data).then(function (data) {
    //     const result = parse(data.text)
    //     fs.writeFileSync("./02.json", JSON.stringify(result))
    // })
}

function parse(text) {
    let textList = text.split("\n").map((t) => t.trim())
    const startIndex = textList.findIndex((t) => t === STARTSIGN)
    let endIndex = textList.findIndex((t) => t.startsWith(ENDSIGN));
    if (endIndex === -1) {
        endIndex = textList.length;
    }
    textList = textList.slice(startIndex + 1, endIndex)
    textList = textList.filter(Boolean).filter((i) => isNaN(i))
    for (let i = 0; i < textList.length; i++) {
        let removeCount = 0;
        let nextIndex = i + 1;
        let currentText = textList[i];

        if (isChinese(currentText)) {
            while (nextIndex < textList.length && isChinese(textList[nextIndex])) {
                currentText += '，' + textList[nextIndex];
                nextIndex++;
                removeCount++;
            }
        } else {
            while (nextIndex < textList.length && !isChinese(textList[nextIndex])) {
                currentText += ' ' + textList[nextIndex];
                nextIndex++;
                removeCount++;
            }
        }

        textList.splice(i + 1, removeCount);
        textList[i] = currentText;
    }
    let result = []
    textList.forEach((item, index) => {
        if (index % 2 === 1) {
            const obj = {
                chinese: textList[index - 1],
            };
            const sliceIndex = item.indexOf(" /")
            obj.english = item.slice(0, sliceIndex);
            obj.soundmark = item.slice(sliceIndex + 1).split(" ").filter(Boolean).join(" ");
            result.push(obj)
        }
    });
    return result
}

function isChinese(str) {
    let word = str.charCodeAt(0);
    return word >= 0x4e00 && word <= 0x9fff;
}

main()